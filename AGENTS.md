# NUTECH website workflow

## Standing user preference

The user requests that completed website changes be committed and pushed to this project's GitHub repository and made live through its connected Vercel project. This is authorization for publishing completed, requested website work once the intended repository and Vercel project have been connected. Honor later instructions such as local-only work, drafts, or holding a release.

## After each website change

1. Read the current repository state and preserve unrelated user changes. Implement the requested change and review the affected desktop/mobile behavior where relevant.
2. Run `npm run build`. This runs JavaScript syntax checks, validates static page/asset/section references and creates the Vercel production output in `dist/`.
3. Stage only files belonging to the completed task. Keep local credentials, `.vercel/`, generated `dist/`, original attachments and `output/` out of Git. Do not use a blanket add to include unrelated files.
4. Once origin is the intended GitHub repository, publish on `main` with a descriptive commit using `npm run publish -- "Commit description"`, or equivalent explicit git commands after the same checks. Main is the production branch. If a branch/PR is required by repository rules, use the repository's workflow and do not bypass protections.
5. Vercel's GitHub integration owns deployment. Verify the deployment associated with the pushed commit reaches Ready and review the affected live URL before reporting the update live. Report failure or pending status accurately; a successful push alone is not a completed deployment.

## Connection and implementation

- Do not invent or change the destination repository/project. Ask for the missing GitHub URL or Vercel project identifier when needed.
- Do not force push or rewrite published history. Integrate upstream changes carefully and keep the website functioning.
- Add new top-level HTML/CSS/JS pages normally; the build discovers them. Website assets belong under `assets/`.
- Use `server.mjs` for local preview only. Vercel serves the static `dist/` output, configured in `vercel.json`.
- Preserve NUTECH branding, company attribution and the user-requested static applications section. The enquiry form remains a local file download unless the user asks to implement a real delivery service.
