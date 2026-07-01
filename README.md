# Evidence Loom

This repo is centered on evidence operations: collecting sources, comparing claims, producing review outputs and keeping the audit trail public.

A woven evidence workspace for source trails, citations and synthesized GenLayer decisions.

## Evidence Loom Brief

This repo is organized for review: the app can be opened locally, the contract source is present, and the deployed Studionet address is pinned in `deployment.json`.

- Folder: `projects/34-evidence-loom`
- Frontend shape: Next/Vite-style app folder
- Contract source: `contracts/weave_v2.py`
- Build status: Schema-valid strong V2 contract; deploy finalized; 13 smoke writes finalized including GenLayer review/challenge/appeal; read tests passed.
- Logo asset: Existing project assets

## Evidence Mechanics

Weave V2 (# v0.2.16), schema-valid strong lifecycle contract with JSON-backed cases/evidence/reviews/challenges/appeals/audits/profiles, GenLayer web render + prompt-comparative reasoning, legacy frontend wrappers and reputation scoring.

- Primary source: `contracts/weave_v2.py` (28,985 bytes)
- Public write/action methods: 15
- Read methods: 20
- GenLayer features: live web rendering, LLM adjudication, validator-comparative consensus, indexed storage, append-only collections

Typical flow: `create_case` -> `open_challenge_window` -> `submit_challenge` -> `review_with_genlayer` -> `resolve_challenge_with_genlayer` -> `submit_appeal` -> `archive_case`

Useful reads: `get_case_count`, `get_case`, `get_case_record`, `get_evidence`, `get_reviews`, `get_challenges`, `get_appeals`, `get_audit_log`

## Evidence Loom Chain Links

- Network: studionet (61999)
- Contract: [0xD490c1cE340B6F705F3D5F89d95355b3cA2f2aee](https://explorer-studio.genlayer.com/contracts/0xD490c1cE340B6F705F3D5F89d95355b3cA2f2aee)
- Deploy tx: [0xb2ba4c8b...dbe090](https://explorer-studio.genlayer.com/tx/0xb2ba4c8b84793e3ba5b38c037539ce296b7261a23975bd2777410951efdbe090)
- Deployed at: 2026-06-24T16:38:45.028Z
- Smoke writes recorded: 13

Smoke coverage:

- configure_protocol: [0x874abcab...e3f97a](https://explorer-studio.genlayer.com/tx/0x874abcab56e2b73e57e663739e8d5257c68bd43549b59958997e9a78c9e3f97a)
- create_case: [0x99bd817c...c547e9](https://explorer-studio.genlayer.com/tx/0x99bd817c000c37765fd45050b0ca06626c0d9b352fc45f6d17cd296869c547e9)
- add_evidence_web: [0x1342d5a3...0e0f74](https://explorer-studio.genlayer.com/tx/0x1342d5a3c550b6abace41de986f7c7c5a585aa1cf738b318929d1930990e0f74)
- add_evidence_security: [0x3693e5a9...0ddc76](https://explorer-studio.genlayer.com/tx/0x3693e5a9c3f0fcf16ee08dfcf3a07f600412e9cf889c09b859cc2efd700ddc76)
- add_evidence_whitepaper: [0xba21c557...3b5a18](https://explorer-studio.genlayer.com/tx/0xba21c5575197f098e0446def0dc6e30dbde62944298507d4a9aedf79d13b5a18)
- review: [0x88d9d5f9...7630f0](https://explorer-studio.genlayer.com/tx/0x88d9d5f917c2ab62959bb8bf689caab8c2103f91dee01785cc4c842e567630f0)

## Local Review Path

```powershell
cd <this-repository-folder>
npm install
npm run dev
```

Open the dev server URL printed by npm.

## GitHub And Vercel

```powershell
cd <private-workspace-root>
npm run publish:project -- -Project 34-evidence-loom -Repo https://github.com/aspro45/<repo-name>.git
```

## Secret Handling

The repo is designed for public GitHub/Vercel release. Keep `.env`, `.vercel/`, wallet vaults, private keys and local dashboard state out of git. The publisher script enforces these ignore rules before it pushes.
