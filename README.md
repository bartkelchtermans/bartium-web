# Bartium landing page

The landing page of Bartium, the desktop client of everything.
This repository includes the index page, privacy and legal information as well as documentation and testpages.

## bartium.io

## Deployment

Pushing to `master` deploys the site. It runs on a Docker Swarm cluster behind a
Cloudflare Tunnel, not on GitHub Pages: CI builds an nginx image, pins its tag into
`deploy/swarm/compose.yaml`, and Arcane picks that commit up and redeploys.

Full procedure, one-time setup and rollback: **[`deploy/README.md`](deploy/README.md)**.

`gulpfile.js` is a developer convenience, not a build step — the CSS and JS the page
loads are committed under `css/`, `js/` and `lib/`, and that is what ships.
