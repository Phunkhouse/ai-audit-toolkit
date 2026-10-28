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
