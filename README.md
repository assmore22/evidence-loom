# Evidence Loom

Threaded evidence synthesis with validator assessment.

Evidence Loom is a Next.js evidence board. Threads are written, sourced and assessed through GenLayer so the public page shows both the claim and the review trail.

## Review Links

| Surface | Link |
| --- | --- |
| Live app | https://assmore22-evidence-loom.vercel.app |
| GitHub | https://github.com/assmore22/evidence-loom |
| Contract | https://explorer-bradbury.genlayer.com/address/0x4432929424994780e69C9e99Fb59f16c1A5Ec03a |

## Chain Record

- Network: GenLayer Bradbury
- Chain ID: 4221
- Contract: `0x4432929424994780e69C9e99Fb59f16c1A5Ec03a`
- Deploy transaction: [0xd3b4e661...dcd50c](https://explorer-bradbury.genlayer.com/tx/0xd3b4e661ab3138c7a3dd0ca9ef204fd0a79df57bf4377d4bc7ad655544dcd50c)
- Deployed: `2026-07-01T15:47:06.997Z`
- Source: `contracts/weave_v2.py` (28,985 bytes)

## Protocol Path

1. Create an evidence thread.
2. Attach the source.
3. Assess through validators.
4. Show rationale and status.
5. Open thread detail pages.

The frontend reads thread records, source links, weaver addresses and assessment status. Contract state is public; write actions still require a connected wallet on GenLayer Bradbury.

## Bradbury Smoke

| Action | Transaction |
| --- | --- |
| `weave_thread/create_case leaderOnly + configure_protocol` | [0x7d0a6a7d...b8d769](https://explorer-bradbury.genlayer.com/tx/0x7d0a6a7d1d53a29efdd682f0a1ccd19f194d1f143eb421729e0d1e47fcb8d769) |
| `secondary write` | [0x0c8115cc...6bc86e](https://explorer-bradbury.genlayer.com/tx/0x0c8115cc860fdcb7d54df688ecca2e79f8523948255c216c44aa02f4056bc86e) |

Read verification passed on Bradbury after deploy. The public app points at this contract address and reads accepted state.

## Local Run

```bash
npm install
npm run dev
```

Open the localhost URL printed by Next.js.

## Release Hygiene

The production build runs on Next.js 15.5.19. The local production dependency audit passes with `npm audit --omit=dev` returning zero vulnerabilities after the `ws` and `postcss` overrides.

Keep wallet private keys, vault exports, `.env` files, Vercel project state and dashboard data out of Git. This repository is for public source, UI, tests and deployment receipts only.
