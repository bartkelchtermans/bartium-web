# Deploy — bartium.io on the Pi swarm

`https://bartium.io` + `www` — the Bartium landing page, running on the three-Pi Docker Swarm,
deployed by Arcane Git Sync from what `master` says, reachable through its own Cloudflare Tunnel.
`deploy/swarm/compose.yaml` is the single writer. This replaces GitHub Pages, which served the
same files from this branch.

|                 |                                                                                 |
| --------------- | ------------------------------------------------------------------------------- |
| Swarm stack     | `bartium`                                                                        |
| Services        | `bartium_web` ×2 (nginx), `bartium_cloudflared` ×2                               |
| Images          | `ghcr.io/bartkelchtermans/bartium-web:sha-<commit>`, `cloudflare/cloudflared:latest`   |
| Source of truth | `deploy/swarm/compose.yaml` on `master`, deployed by Arcane Git Sync              |
| Ingress         | Cloudflare Tunnel `bartium` — `bartium.io` + `www.bartium.io`, no published ports |

## How a change ships

1. Push to `master`.
2. `.github/workflows/build.yml` builds `Dockerfile` for `linux/amd64,linux/arm64`, pushes
   `ghcr.io/bartkelchtermans/bartium-web:sha-<commit>` to GHCR, then rewrites the `image:` line
   in `deploy/swarm/compose.yaml` to that tag and commits it (`chore(deploy): swarm → sha-…
   [skip ci]`).
3. Arcane's Git Sync stack `bartium` polls `master` and redeploys on its next sync (5 min).
   There is no manual deploy command and no direct-deploy script.

Rollback is `git revert` of the pin commit — nothing else. The tag pinned in git is the deploy
state, so git history is both the audit log and the rollback mechanism.

**Arcane Git Sync is the only writer to this stack.** Running `docker stack deploy` by hand
against `bartium` is a break-glass fallback only: two writers cause drift that stays invisible
until a deploy silently reverts someone's change.

The image is nginx + the repo — `gulpfile.js` is a developer convenience, not a build step; the
CSS and JS the page loads are committed under `css/`, `js/` and `lib/`. `deploy/swarm/nginx.conf`
is the server block: security headers, this site's Content-Security-Policy (Google Fonts + one
cdnjs script, nothing else), `expires`-based cache policy, `absolute_redirect off`, and
`try_files $uri $uri.html` — the page's own links are extensionless (`/getting-started`,
`/legal`, `/privacy`), which GitHub Pages resolved for free and stock nginx does not. Cloudflare
owns TLS; nginx only ever speaks plain HTTP on the overlay.

## One-time setup

### 1. Cloudflare Tunnel `bartium`

Two public hostnames, both → `HTTP` → **`web:80`** — the Swarm service VIP, the *short* service
name, never a node IP and never the stack-namespaced `bartium_web`:

- `bartium.io`
- `www.bartium.io`

Delete the existing proxied DNS records for both first — they point at GitHub Pages and
Cloudflare will not clobber them when the tunnel creates its CNAME.

### 2. Swarm secret

```sh
printf '%s' "$CF_TUNNEL_TOKEN" | ssh swarm01 'docker secret create bartium_cloudflared -'
```

`printf`, not `echo` — cloudflared reads the file raw and a trailing newline invalidates the
token. Swarm secrets are immutable; to rotate, create a new name (`bartium_cloudflared_v2`) and
change the reference in `deploy/swarm/compose.yaml`.

### 3. Arcane credentials

- **git**: a credential row for this repository URL. The repo is public, so `authType: "none"`
  works and no token is needed.
- **registry**: the GHCR package this workflow creates inherits the repository's access, so it
  is readable by anyone with read on the repo. If Arcane's pull fails with
  `no basic auth credentials`, add a `ghcr.io` credential row (Arcane ≥ v2.10.0 forwards it on
  the Git Sync swarm path) or have the repo admin flip the package to public.

### 4. Arcane Git Sync stack `bartium`

Swarm mode, `deploy/swarm/compose.yaml` on `master`, `autoSync` with a 5-minute interval, and
**`redeployAfterSync: true`** — without it a synced compose change only updates the stored
definition and never rolls the service. `projectName` must be exactly `bartium`: adoption of a
running stack happens on an exact name match, and a near-miss deploys a second complete copy.

Create it only after the first CI run has pinned a real sha — the compose ships on
`sha-unpinned`, which does not exist on purpose.

### 5. Verify, then retire GitHub Pages

```sh
docker service ls --filter name=bartium            # bartium_web 2/2, bartium_cloudflared 2/2
curl -sI https://bartium.io/                       # 200
curl -sI https://bartium.io/getting-started        # 200 — extensionless link resolves
curl -sI https://www.bartium.io/                   # 200
```

Only then disable GitHub Pages in the repository settings (needs repo admin).
