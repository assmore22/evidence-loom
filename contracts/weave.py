# { "Depends": "py-genlayer:1jb45aa8ynh2a9c9xn3b7qqh8sm5q93hwfp7jqmwsfhh8jpz09h6" }
"""
WEAVE - Evidence Threads, Assessed by Consensus
===============================================
Each thread is a claim woven to a public source. To assess it, the contract reads
the source and a validator set decides (Equivalence Principle) whether the source
upholds the claim. Upheld threads hold the weave together; frayed ones are marked.

Status: PENDING(0) -> UPHELD(1) | FRAYED(2)
"""
from genlayer import *
from dataclasses import dataclass
import json
import typing

PENDING = 0
UPHELD = 1
FRAYED = 2
MAX_C = 240


@allow_storage
@dataclass
class Thread:
    weaver: Address
    claim: str
    source_url: str
    status: u8
    rationale: str
    archived: u8


class Weave(gl.Contract):
    owner: Address
    threads: DynArray[Thread]

    def __init__(self) -> None:
        self.owner = gl.message.sender_address

    @gl.public.write
    def weave_thread(self, claim: str, source_url: str) -> int:
        c = claim.strip()
        u = source_url.strip()
        if len(c) == 0:
            raise gl.vm.UserError("a claim is required")
        if len(c) > MAX_C:
            raise gl.vm.UserError("claim exceeds 240 characters")
        if len(u) == 0:
            raise gl.vm.UserError("a source URL is required")
        if not (u.startswith("http://") or u.startswith("https://")):
            raise gl.vm.UserError("source URL must be http(s)")
        t = self.threads.append_new_get()
        t.weaver = gl.message.sender_address
        t.claim = c
        t.source_url = u
        t.status = u8(PENDING)
        t.rationale = ""
        t.archived = u8(0)
        return len(self.threads) - 1

    @gl.public.write
    def assess_thread(self, thread_id: int) -> None:
        t = self._get(thread_id)
        if t.status != PENDING:
            raise gl.vm.UserError("this thread is already assessed")
        if t.archived != 0:
            raise gl.vm.UserError("this thread is archived")
        claim = t.claim
        url = t.source_url

        def leader_fn() -> str:
            page = ""
            try:
                page = gl.nondet.web.get(url).body.decode("utf-8")[:6000]
            except Exception:
                page = ""
            if len(page.strip()) == 0:
                return json.dumps({"upheld": False, "reason": "The source could not be read."})
            prompt = (
                f"An evidence thread weaves a claim to a source.\nClaim: {claim}\n\n"
                f"Cited source:\n{page}\n\n"
                "Based strictly on the source, does it UPHOLD the claim? Reply with "
                'ONLY JSON: {"upheld": true} or {"upheld": false}, plus a short "reason".'
            )
            return gl.nondet.exec_prompt(prompt)

        def validator_fn(leader_res) -> bool:
            if not isinstance(leader_res, gl.vm.Return):
                return False
            return self._decision_of(leader_res.calldata)[0] == self._decision_of(leader_fn())[0]

        result = gl.vm.run_nondet_unsafe(leader_fn, validator_fn)
        ok, reason = self._decision_of(result)
        t.rationale = reason[:300]
        t.status = u8(UPHELD) if ok else u8(FRAYED)

    @gl.public.write
    def archive_thread(self, thread_id: int) -> None:
        if gl.message.sender_address != self.owner:
            raise gl.vm.UserError("only the owner can archive")
        self._get(thread_id).archived = u8(1)

    @gl.public.view
    def get_owner(self) -> str:
        return self.owner.as_hex

    @gl.public.view
    def get_thread_count(self) -> int:
        return len(self.threads)

    @gl.public.view
    def get_stats(self) -> dict:
        up = 0
        fr = 0
        pe = 0
        for t in self.threads:
            if t.archived != 0:
                continue
            if t.status == UPHELD:
                up += 1
            elif t.status == FRAYED:
                fr += 1
            else:
                pe += 1
        return {"total": up + fr + pe, "upheld": up, "frayed": fr, "pending": pe}

    @gl.public.view
    def get_thread(self, thread_id: int) -> dict:
        t = self._get(thread_id)
        return {
            "weaver": t.weaver.as_hex,
            "claim": t.claim,
            "source_url": t.source_url,
            "status": int(t.status),
            "rationale": t.rationale,
            "archived": int(t.archived),
        }

    def _get(self, thread_id: int) -> Thread:
        if thread_id < 0 or thread_id >= len(self.threads):
            raise gl.vm.UserError("no such thread")
        return self.threads[thread_id]

    def _decision_of(self, result: typing.Any) -> tuple:
        data = result
        if isinstance(data, str):
            data = self._extract_json(data)
        if not isinstance(data, dict):
            return (False, "")
        raw = data.get("upheld", None)
        reason = str(data.get("reason", ""))
        if isinstance(raw, bool):
            return (raw, reason)
        if isinstance(raw, str):
            return (raw.strip().lower() == "true", reason)
        return (False, reason)

    def _extract_json(self, text: str) -> typing.Any:
        try:
            return json.loads(text)
        except (ValueError, TypeError):
            pass
        start = text.find("{")
        end = text.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(text[start:end + 1])
            except (ValueError, TypeError):
                return None
        return None
