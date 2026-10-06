# GitHub → Vercel publishing

The intended workflow is: complete a website change → review → production build → commit → push to GitHub `main` → Vercel deploys → verify the live website.

## One-time connection

1. Connect the intended GitHub repository as the local `origin` remote. Confirm its URL before changing a remote or pushing. This folder initially has an unborn `main` branch and no remote.
2. Review and commit the website, scripts, documentation and configuration. Keep the standalone source attachment, credentials, `node_modules/`, `output/`, `dist/` and `.vercel/` local. For an existing repository, integrate its history before the first push.
3. In Vercel, import that GitHub repository or connect it under the existing project's **Settings → Git**. Choose the appropriate account/team and permit repository access through the user's normal connection flow.
4. Set **Production Branch** to `main` and **Root Directory** to the project root. `vercel.json` supplies Framework Preset **Other**, Build Command `npm run build`, Output Directory `dist`, and Install Command `npm ci --ignore-scripts`.
5. Wait for the first deployment to become **Ready**. Open the production URL and check all four pages, assets, product dialogs, mobile navigation and contact links. Save the repository/project/production URL here once connected.

Vercel's native GitHub integration builds production on pushes to the production branch; other branches produce previews. There is no Vercel deployment token to put in GitHub Actions for this workflow. The GitHub action runs the same build checks independently, and Vercel runs those checks as part of its own build before publishing.

## Subsequent updates

The project's `AGENTS.md` records the user's standing preference to publish completed website changes. After making and reviewing a change:

```sh
git add -- path/to/changed-file path/to/another-file
npm run publish -- "Describe the completed website change"
```

The command requires `main` and a GitHub origin, runs the production build, fetches remote history, refuses to overwrite upstream changes, commits the staged update, and pushes `main`. The checked working tree must match the commit; handle unrelated files separately if they remain. An already committed clean update can be pushed using the same command without creating an empty commit.

Verify the matching GitHub commit's Vercel deployment reaches Ready and report its live URL. A deployment triggered by Git does not require a separate manual `vercel --prod` invocation.

## Local checks

```sh
npm ci --ignore-scripts
npm run build
npm run dev
```

The public output contains top-level HTML/CSS/JS and `assets/`, while source documentation, local screenshots, scripts and preview-server code remain outside the hosted output.

## Connected destinations

- GitHub repository: pending user-provided URL.
- Production branch: `main`.
- Vercel project / production URL: pending connection.
- Verified CLI accounts: GitHub `GaneshAlla12`; Vercel `molvexlabs-web` (active team `molvexlabs-web`). CLI login and repository integration are separate steps.

Official references: [Vercel GitHub deployments](https://vercel.com/docs/git/vercel-for-github), [Vercel project configuration](https://vercel.com/docs/project-configuration/vercel-json).
