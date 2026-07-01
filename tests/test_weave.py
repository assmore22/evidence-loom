"""Direct tests for WEAVE. AI assess verified live via seed."""
from pathlib import Path
CONTRACT = str(Path(__file__).resolve().parents[1] / "contracts" / "weave.py")
PENDING = 0; UPHELD = 1; FRAYED = 2


def _w(w, vm, who, claim="Water is hydrogen and oxygen.", u="https://example.com"):
    vm.sender = who
    return w.weave_thread(claim, u)


def test_weave(deploy, direct_vm, direct_alice):
    w = deploy(CONTRACT)
    assert _w(w, direct_vm, direct_alice) == 0
    assert w.get_thread(0)["status"] == PENDING


def test_requires_claim(deploy, direct_vm, direct_alice):
    w = deploy(CONTRACT)
    direct_vm.sender = direct_alice
    with direct_vm.expect_revert("a claim is required"):
        w.weave_thread("  ", "https://x.com")


def test_claim_max(deploy, direct_vm, direct_alice):
    w = deploy(CONTRACT)
    direct_vm.sender = direct_alice
    with direct_vm.expect_revert("claim exceeds 240"):
        w.weave_thread("x" * 241, "https://x.com")


def test_non_http(deploy, direct_vm, direct_alice):
    w = deploy(CONTRACT)
    direct_vm.sender = direct_alice
    with direct_vm.expect_revert("must be http"):
        w.weave_thread("c", "ftp://x")


def test_owner_archive(deploy, direct_vm):
    w = deploy(CONTRACT)
    w.weave_thread("c", "https://x.com")
    w.archive_thread(0)
    assert w.get_thread(0)["archived"] == 1
    assert w.get_stats()["total"] == 0


def test_unauthorized_archive(deploy, direct_vm, direct_alice, direct_bob):
    w = deploy(CONTRACT)
    owner = w.get_owner()
    non = direct_bob if str(direct_alice).lower() == str(owner).lower() else direct_alice
    direct_vm.sender = non
    with direct_vm.expect_revert("only the owner can archive"):
        w.archive_thread(0)


def test_stats(deploy, direct_vm, direct_alice):
    w = deploy(CONTRACT)
    _w(w, direct_vm, direct_alice, claim="A")
    _w(w, direct_vm, direct_alice, claim="B")
    assert w.get_thread_count() == 2 and w.get_stats()["pending"] == 2
