# Web quality review

Use for browser-based review of a web application's accessibility, technical SEO, browser behavior and page performance. Lighthouse supplies automated evidence; the audit also needs page selection, result interpretation and targeted manual checks. No particular frontend framework is required.

## Select pages and states

Record the intended audience, device support, public/private boundary and any documented requirements. Select representative templates and critical flows, not just the homepage: for example a landing page, detail page, search results and a form or dashboard when present. Include relevant roles, locales, loading or error states and dialogs within the agreed scope.

For each target, record a safe URL or route identifier, expected and observed page state, environment, build mode, source commit, viewport and authentication role. Verify the final page after redirects and rendering. A successful scan of a login page does not cover the intended dashboard. State what was sampled, omitted or inaccessible and why.

## Safe and reproducible execution

Prefer a local production build or isolated preview. Review scripts and isolate databases, analytics and external services before running them; a temporary copy alone does not prevent live effects. Do not run production tests or complete live transactions without separate authorization. Use non-sensitive fixtures and test accounts.

Keep builds, browser profiles, screenshots, traces and raw Lighthouse reports in a disposable workspace outside the audited repository. Write only the Markdown report inside `docs/audits/`. Put essential redacted evidence, commands and configuration in that report so findings do not depend solely on temporary files. Do not upload private URLs or reports to public viewers or scanning services. Never include cookies, access tokens or sensitive screenshots in committed reports.

Use available tooling; do not install browser dependencies or modify project configuration just to obtain a score. If browser access or Lighthouse is unavailable, record the missing checks as `Not verified`. A manual check may still be completed with another available browser tool; identify its actual scope.

Before running, choose a bounded page/profile matrix, repeat count and timeout or total time budget. Stop at that budget or when errors invalidate the run. Record Lighthouse and browser versions, execution method, build mode, resolved device emulation and CPU/network throttling, locale, cache/storage state and any custom configuration. Keep these comparable to the baseline and record differences.

### Lighthouse CLI example

If Lighthouse and Chrome are already available, inspect `lighthouse --help` for the installed version. The example below assumes an already running, isolated local site. Run from a temporary directory to keep incidental output outside the audited repository:

```bash
web_audit_dir="$(mktemp -d)"
cd "$web_audit_dir"
lighthouse 'http://127.0.0.1:4173/' \
  --only-categories=performance,accessibility,best-practices,seo \
  --output=json --output=html \
  --output-path="$web_audit_dir/home-default-1"
```

Use a distinct output path for every page, profile and repeat. For a desktop run, use the installed version's desktop preset (`--preset=desktop` where supported). Record the resolved settings from the report rather than assuming defaults are stable. Select categories that apply; technical SEO may be inapplicable to private application pages.

For authenticated pages, use a supported authenticated browser workflow and confirm the actual role and final page. Do not put credentials into shell history or report examples. Record if browser storage resets or session expiry prevent access, rather than reporting the resulting login page as the intended target.

## Interpret automated results

- Keep category scores with each run, but prioritize the underlying failed audit, page state and user consequence. A score alone is not a finding or a release gate unless the project has an explicit relevant budget.
- For performance, prefer at least three comparable bounded runs per selected page/profile when feasible. Report individual results or a representative aggregate with range and count; never select only the fastest run. If fewer runs are possible, state the limitation. Compare actual metrics under comparable conditions, and distinguish browser lab results from field measurements.
- Reuse `performance-measurement.md` for workload and baseline interpretation. Cross-reference an existing `PERF-` finding for the same root cause rather than creating an independent `WEB-` copy. A web report can contain the measurements while the performance report explains a deeper bottleneck.
- Automated accessibility checks cover only part of accessibility. Record applicable manual checks independently of the score. Do not claim full WCAG conformance from Lighthouse or from a small manual sample.
- SEO failures require context: an authenticated page, private application or preview may intentionally block indexing. Do not recommend removing those protections. A local canonical URL or robots setting must be interpreted against the intended deployment configuration; inability to verify production indexing is `Not verified`.
- Treat browser errors, failed loads, absent scores and skipped categories as limitations or evidence requiring investigation, never as passing checks. Best-practices results do not substitute for a security audit.

## Targeted manual checks

Select checks based on the page and the tools actually available:

- Keyboard navigation, focus visibility and order, menus and dialogs, focus return and ability to leave interactive elements.
- Accessible names, labels, validation feedback, heading structure and meaningful alternative text. Use available assistive technology for relevant flows; otherwise mark that part unverified.
- Text zoom, responsive reflow, clipped content and usable controls on the selected viewports. Verify suspected contrast or layout problems rather than relying on a screenshot alone.
- For pages intended to be public: response status and redirects, titles and descriptions, canonical and indexing directives, crawlable links and rendered important content. Assess structured data only if present and relevant; do not infer search visibility from local checks.
- Console and network failures, blocked resources and browser-specific behavior that affects a selected journey. Keep live side effects out of manual testing unless separately authorized.

## Finding evidence

Identify the page/state/profile, Lighthouse audit identifier or manual reproduction steps, relevant DOM element and source location when traceable. If code is unavailable, use the exact route and element or configuration artifact with the reason no source line is available. Include redacted evidence, actual impact, contrary evidence considered, a focused remediation and verification under the same conditions.

Background: [Lighthouse CLI documentation](https://github.com/GoogleChrome/lighthouse#using-the-node-cli), [Lighthouse performance scoring](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring), [Lighthouse accessibility scoring](https://developer.chrome.com/docs/lighthouse/accessibility/scoring), and [W3C guidance on accessibility evaluation tools](https://www.w3.org/WAI/test-evaluate/tools/selecting/).
