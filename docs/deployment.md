# GitHub Actions and Hetzner deployment

The workflow in `.github/workflows/ci.yml` checks branch pushes and pull
requests using `npm run check`: Biome formatting/lint, TypeScript, Vitest tests,
the static production build, and Chromium browser tests. Failed browser tests
retain diagnostics as a GitHub artifact.
The workflow is skipped, deployment included, when a change touches only
Markdown files, `img/` or `.github/dependabot.yml`; any other changed file runs
it in full, including Dependabot's dependency and action updates.
CI installs `lftp` to regression-test its password parser; that test is skipped
locally when `lftp` is not installed.

Only successful **pushes to `main`** deploy. The deployment job downloads the
exact tested `out/` artifact, including `.htaccess`; it does not rebuild.
PR jobs have no deployment credentials. Production uploads are serialized,
are not canceled halfway through, and skip commits already superseded on `main`.

Actions use explicit version tags for the latest stable releases verified on
3 October 2026: checkout 7.0.1, setup-node 7.0.0, upload-artifact 7.0.1 and
download-artifact 8.0.1. Dependabot checks for action updates weekly.

## 1. Confirm the destination and make a backup

Log into konsoleH, select this hosting account, and find **Access details →
FTP & SFTP**. The FTP server is `www414.your-server.de`; use the FTP username
and password, **not** the konsoleH or Hetzner customer-account login.

Connect with FileZilla using FTP, **Require explicit FTP over TLS**, port **21**.
Confirm the domain's document root in konsoleH and locate the matching directory
through FTP. For a main FTP user it is commonly `public_html`, but check whether
`tadelakt.at` uses a subdirectory instead. The destination must already exist
and be dedicated to this site. Download a backup of the current directory,
including hidden files such as `.htaccess`, before the first deployment.

`FTP_REMOTE_DIR` is the path visible to this FTP login, not a guessed Linux home
directory. Example: `public_html` or `public_html/tadelakt`. Paths containing
spaces are deliberately unsupported by the deployment script. Bare `/`, `.`,
and parent traversal are rejected. Use an account that can address the website
directory explicitly, rather than one jailed directly into that directory.

## 2. Configure GitHub

Create a GitHub environment named **`production`** under **Settings →
Environments**. Restrict its deployment branches to **`main`**. You can optionally
require manual approval for the first deployment; required reviewers make later
deployments wait for approval too. Available protection rules depend on your
GitHub plan and repository visibility.

Under that environment, add these **secrets**:

| Secret | Value |
| --- | --- |
| `FTP_USERNAME` | Your Hetzner FTP login name |
| `FTP_PASSWORD` | Its FTP password |

Add these environment **variables** (not secrets):

| Variable | Value |
| --- | --- |
| `FTP_SERVER` | `www414.your-server.de` |
| `FTP_REMOTE_DIR` | The confirmed website directory from step 1 |

Repository-level Actions secrets/variables with the same names also work, but
environment-level credentials are preferable. No Hetzner API token, konsoleH
password, SSH key, or personal GitHub token is needed. GitHub supplies the
read-only `GITHUB_TOKEN` automatically.

Ensure Actions are enabled. Protect `main` with the required status check
**Lint, types, tests and build** so failed PRs cannot be merged. A PR that
changes only skipped paths never reports that check and stays blocked until an
administrator bypasses the rule. Push this
configuration to a branch and open a PR to verify CI before merging to `main`.
Missing FTP settings cause deployment to fail without uploading anything.

## Deployment behavior and recovery

Uploads use explicit FTPS with mandatory TLS for login and data transfer and
certificate verification enabled. Do not disable certificate checking to fix
connection errors; verify the server hostname and hosting configuration instead.
The runner installs `lftp` from Ubuntu's package repository; no third-party
deployment action receives your credentials.

Hashed `_next/` assets upload before pages.
All exported files are transferred, even when remote size/timestamps match, so
an older file with different contents cannot silently survive a deployment.
After both upload passes succeed, a final recursive mirror **deletes every file
and directory in `FTP_REMOTE_DIR` that is absent from the tested export**,
including hidden files, removed pages, original-site files and older `_next/`
assets. Cleanup is skipped if either upload pass fails; cleanup failures fail
the deployment. Uploaded files with matching names, including `.htaccess`, are
replaced. The destination must contain only this site's exported files: keep
backups and unrelated hosting files outside it. Visitors with older pages open
may need to refresh after their assets are removed.

FTP uploads are not atomic: visitors may see mixed versions during upload, and
a failed upload can leave a partial deployment. Retry a failed deployment only
if its commit is still the current `main` tip. For a rollback, revert the change
on `main` and let CI build and deploy that new commit, or restore your FTP backup.
After the first deployment, check the homepage, a gallery, `/kontakt`, and a
missing URL on the live site to confirm Apache routes and errors behave correctly.

Hetzner reference: [FTP & SFTP](https://docs.hetzner.com/managed/administration-on-konsoleh/access-details/ftp-sftp/).
