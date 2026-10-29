# Frontend profile

Use for client-side UI, server-side rendering, and rendering layers as appropriate to the actual architecture.

- Trace user input into the DOM, templates, URLs, and external content; verify escaping and safe handling of HTML.
- Review protection of sensitive data in client bundles, browser storage, caches, and logs.
- Check whether permissions are merely hidden in the UI while the server fails to enforce them.
- Where relevant, inspect CSP, cross-origin behavior and CORS configuration, and cookie attributes; verify these at the layer that actually controls them.
- For correctness, review loading, error, and empty states, navigation, and important user flows.
- For production readiness, consider accessibility, metadata, caching, and rendering failures when relevant to the project.

## Performance checks

- Trace critical journeys for excessive JavaScript, image or font transfers, blocking resources and request waterfalls. Inspect the actual bundles and loading behavior before recommending changes.
- Use rendering profiles to identify long tasks, repeated rendering or expensive client computation. For web pages, consider LCP, INP and CLS with the device, network and lab or field context recorded.
- Check repeated fetching and browser or CDN caching against expected reuse, data freshness and authorization boundaries.

## Architecture checks

- Trace ownership of business rules, UI state and server state across critical flows. Identify duplicated policy or conflicting ownership with a concrete change or correctness consequence.
- Review boundaries between presentation, application logic and external API contracts. Assess whether changes can be localized and tested under the actual framework conventions; avoid requiring layers without a demonstrated need.

## Web quality checks

- Review representative rendered pages and states with available Lighthouse and browser tools. Record device, authentication and environment context; verify that scans reached the intended content.
- Combine applicable automated checks with targeted keyboard, focus, form, responsive layout and accessibility checks. Record manual coverage and limitations independently of category scores.
- Evaluate technical SEO only against intended indexing behavior. Private pages and previews may deliberately use `noindex`; cross-reference performance or security findings for shared root causes.

## Scalability and cost checks

- Trace page views, polling, assets and cache misses to actual origin work, transfer and provider-billed operations; distinguish client traffic from the billable units it generates.
- Assess safe reductions in repeated fetching or asset delivery against current usage and growth assumptions. Preserve authorization and freshness, and do not add delivery infrastructure without a demonstrated benefit.
