---
name: turbopack-log
description: Run the DevEvent Next.js dev server with Turbopack logging and diagnose errors from its Windows temp log.
---

# Read Turbopack Logs

Use this skill to run and inspect Turbopack output for this repository's Next.js app.

## Run the dev server and capture the log

From the repository root, run the dev server and append its output, including
Turbopack errors, to the log file used by this skill:

```powershell
.\dev-with-logs.ps1
```

Stop the server with Ctrl+C when finished. Read the recent log output with:

```powershell
$log = Join-Path $env:TEMP 'events-nextapp-turbopack.log'
if (Test-Path $log) {
    Get-Content $log -Tail 200
} else {
    Write-Error "Turbopack log not found: $log"
}
```

If the tail contains repeated or truncated errors, search for the latest compile failure and inspect a bounded range around it. Distinguish the root error from repeated browser/overlay copies and ordinary `NativeCommandError` wrappers around stderr. Do not treat a running dev server or a loaded error overlay as a successful page build.

## Diagnose missing imports

For `Can't resolve '<specifier>'` or `Cannot find module '<specifier>'`:

1. Identify the source file and import trace in the error.
2. Check the import, root `package.json`, project aliases, and whether the referenced module exists.
3. If the specifier is a package subpath, verify that the intended npm package actually exports that subpath before installing it. Do not infer the package name from the import string alone.
4. If the package and subpath are confirmed and the dependency is absent, install it from the repository root using the existing package manager, preserving existing manifest and lockfile changes.
5. Re-read the log after the server recompiles and confirm the error is gone; report any new first/root error rather than assuming success.

Keep log excerpts bounded and avoid repeating credentials or other sensitive values if present.
