# Evidence Loom

Threaded evidence synthesis with validator assessment.

Evidence Loom is a Next.js evidence board. Threads are written, sourced and assessed through GenLayer so the public page shows both the claim and the review trail.

## Review Links

| Surface | Link |
| --- | --- |
| Live app | https://assmore22-evidence-loom.vercel.app |
| GitHub | https://github.com/assmore22/evidence-loom |
| Contract | https://explorer-studio.genlayer.com/contracts/0xD490c1cE340B6F705F3D5F89d95355b3cA2f2aee |

## Chain Record

- Network: GenLayer Studionet
- Chain ID: 61999
- Contract: `0xD490c1cE340B6F705F3D5F89d95355b3cA2f2aee`
- Deploy transaction: [0xb2ba4c8b...dbe090](https://explorer-studio.genlayer.com/tx/0xb2ba4c8b84793e3ba5b38c037539ce296b7261a23975bd2777410951efdbe090)
- Deployed: `2026-06-24T16:38:45.028Z`
- Source: `contracts/weave_v2.py` (28,985 bytes)

## Protocol Path

1. Create an evidence thread.
2. Attach the source.
3. Assess through validators.
4. Show rationale and status.
5. Open thread detail pages.

The frontend reads thread records, source links, weaver addresses and assessment status. Contract state is public; write actions still require a connected wallet on GenLayer Studionet.

## Finalized Smoke

| Action | Transaction |
| --- | --- |
| `configure_protocol` | [0x874abcab...e3f97a](https://explorer-studio.genlayer.com/tx/0x874abcab56e2b73e57e663739e8d5257c68bd43549b59958997e9a78c9e3f97a) |
| `create_case` | [0x99bd817c...c547e9](https://explorer-studio.genlayer.com/tx/0x99bd817c000c37765fd45050b0ca06626c0d9b352fc45f6d17cd296869c547e9) |
| `add_evidence_web` | [0x1342d5a3...0e0f74](https://explorer-studio.genlayer.com/tx/0x1342d5a3c550b6abace41de986f7c7c5a585aa1cf738b318929d1930990e0f74) |
| `add_evidence_security` | [0x3693e5a9...0ddc76](https://explorer-studio.genlayer.com/tx/0x3693e5a9c3f0fcf16ee08dfcf3a07f600412e9cf889c09b859cc2efd700ddc76) |
| `add_evidence_whitepaper` | [0xba21c557...3b5a18](https://explorer-studio.genlayer.com/tx/0xba21c5575197f098e0446def0dc6e30dbde62944298507d4a9aedf79d13b5a18) |
| `review` | [0x88d9d5f9...7630f0](https://explorer-studio.genlayer.com/tx/0x88d9d5f917c2ab62959bb8bf689caab8c2103f91dee01785cc4c842e567630f0) |

## Local Run

```bash
npm install
npm run dev
```

Open the localhost URL printed by Next.js.

## Release Hygiene

The production build runs on Next.js 15.5.19. The local production dependency audit passes with `npm audit --omit=dev` returning zero vulnerabilities after the `ws` and `postcss` overrides.

Keep wallet private keys, vault exports, `.env` files, Vercel project state and dashboard data out of Git. This repository is for public source, UI, tests and deployment receipts only.
