# Code cleanup review

Review the code in the context of supported releases and expected changes. For each candidate, document where it lives, what currently depends on it, what would become easier to maintain and how the project would verify the change. Include style issues only when an established project standard or concrete maintenance impact makes them actionable.

## Establish reachability before recommending removal

- Start from entry points and manifests. Follow routes, commands, package exports, workspace consumers, job definitions, migrations, generators, CI and deployment configuration. Search string-based references, framework discovery, plugin registration, reflection, glob imports, side-effect imports and files consumed by external tools.
- Check supported flags, platforms, locales and build modes. A path may be dormant under one configuration and required under another. Check published APIs and external consumers before recommending removal or a deprecation path. Keep migration history, generated artifacts and compatibility code governed by their actual lifecycle. Their absence from normal calls provides limited evidence.
- Record the scope and limits of any analyzer, including scanned entry points and ignored files. Zero matches or missing test coverage may leave reachability unresolved. Name the exact evidence that would establish it, such as deployment settings or an owner-confirmed consumer inventory. For verified candidates, propose removal in small batches with relevant build, startup, route or consumer checks.

## Compare duplication and comments against intent

Trace all relevant copies of a candidate rule or pattern. Look for inconsistent fixes, diverging edge cases or documented changes that must be repeated. Consolidate only when there is a stable shared contract and a suitable owner. Compare a small shared helper or existing primitive with continuing to keep the implementations local. Account for independently changing modules, test readability and the cost of adding indirection.

Check comments and TODOs against the current code, tests and decisions. Preserve rationale, external constraints, accessibility notes, workarounds, invariants, generated-file markers, tool directives and required notices. Flag stale explanations, redundant narration and completed TODOs with evidence. If a comment is the only record of an important constraint, retain it or propose documenting the constraint where maintainers will find it.

## Prefer clearer supported language features

Use the project's toolchain, runtime and deploy/build targets to assess language features. For JavaScript and TypeScript, candidates include block-scoped bindings where scope and initialization remain safe, or simplification of explicit nullish handling where `?.` or `??` express the existing contract. Check falsy values, default evaluation, short-circuit behavior, evaluation order, binding and mutation as relevant. For example, changing `||` to `??` changes how `0`, `false` and empty strings are handled. Recommend a modernization when the code becomes easier to follow and the relevant behavior can be verified. Apply the same principle to other languages using their supported idioms.

## Identify UI patterns worth sharing

Inspect the existing components, theme and token definitions. Compare concrete instances such as tables, focusable scroll regions, form fields or spacing values. Identify what should change together, where the current implementations drift and which variants have their own requirements. For a table, the frame, cell styling and scroll affordance may be shared while sorting, data and mobile layouts remain owned by each view.

Choose the smallest fit: adopt an existing primitive, share a semantic token, extract a focused component or keep the current local pattern. A repeated literal is evidence of a token candidate only when its uses express the same design intent. A shared component needs a stable role and a manageable set of variants. Estimate adoption cost and coupling. Specify representative verification for semantics, keyboard/focus behavior, responsive states, theming and visual parity or intentional visual changes. Record deferred candidates with the evidence that would justify revisiting them. Propose a broader design system only when the maintenance problem extends beyond individual patterns and there is a realistic owner and adoption path.
