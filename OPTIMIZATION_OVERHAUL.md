# Optimization Overhaul

## Executive opinion

The project is functional, but its main performance risk is architectural rather than a single slow function: the page loads the complete interaction stack, camera pipeline, painting UI, molecule renderer, and data logic through one 2,211-line entrypoint. The best overhaul is incremental. Preserve the offline/no-build-tool experience while making work lazy, measurable, and isolated.

## Findings

- `painting-pigment-explorer.html` contains the application shell and most runtime logic. This makes startup, debugging, and regression testing difficult.
- MediaPipe, Three.js, and 3Dmol.js are loaded before the user needs Level 3. The hand model is about 5.3 MB, the two MediaPipe WASM binaries are about 6 MB each, and the vendor renderers are about 0.5-0.6 MB each.
- `assets/artwork/visible_anjo_adonay.png` is about 13 MB and is a likely first-load cost. Other material/highlight images add avoidable transfer and decode work.
- The camera loop calls `handDetector.send()` for every camera frame. Tracking, cursor smoothing, magnifier animation, canvas drawing, and DOM updates share the same page lifecycle.
- The mask reader uses canvas pixel reads. This is appropriate for exact selection, but it should be cached once per image/size and sampled only when the pointer or pinch position changes.
- Level 3 creates and renders a fresh 3Dmol viewer after asynchronous loading. This is correct for stale-scene prevention, but it should remain lazy and have explicit cancellation/disposal boundaries.
- Repeated `innerHTML` updates and frequent debug/status updates can trigger unnecessary DOM work, especially while tracking.
- There is no visible performance budget, automated startup measurement, or regression benchmark in the repository.

## Prioritized approach

### P0: Measure before changing behavior

Add a lightweight performance mode using `performance.mark()` and `performance.measure()` for:

- first paint and page interactive time;
- image decode and mask-cache time;
- MediaPipe library/model readiness;
- average hand-processing duration and effective tracking FPS;
- Level 3 file fetch, viewer creation, and first render;
- long tasks and memory snapshots when available.

Record baseline results at 1920x1080 and 2560x1440, with camera permission granted and denied. Keep a short manual benchmark page or checklist in the repository.

### P1: Reduce startup work without changing the experience

1. Load only the painting, mask, state, and launcher-critical code initially.
2. Dynamically import or inject MediaPipe scripts only when hand mode is actually needed.
3. Load Three.js/3Dmol.js only when entering Level 3. The browser should not pay the Level 3 cost on the selection screen.
4. Preload the visible painting with an optimized WebP/AVIF derivative, while retaining the original as a source asset if needed.
5. Load highlight and material images on demand after an item is selected.
6. Add explicit image dimensions and `decoding="async"` where appropriate to reduce layout and decode surprises.

The no-build-tool constraint can remain: a small `js/app/loader.js` can dynamically add local scripts and modules. A later Vite/rollup migration is optional, not the first move.

### P2: Separate runtime ownership

Split the monolith into small files with narrow responsibilities:

- `app/bootstrap.js`: startup and feature detection;
- `app/state.js`: state transitions and cancellation tokens;
- `interaction/handTracking.js`: camera and MediaPipe;
- `interaction/cursor.js`: cursor/magnifier animation;
- `selection/maskReader.js`: image cache and pixel lookup;
- `views/selectionView.js`, `views/detailView.js`, `views/moleculeView.js`;
- `rendering/moleculeRenderer.js`: 3Dmol/CIF/MOL handling;
- `data/*`: item and structure data.

Keep DOM references inside the owning view instead of relying on many globals. This will make stale asynchronous work, such as an old molecule load completing after navigation, easier to cancel and test.

### P3: Make the camera loop cooperative

- Process at a capped rate, for example 15-24 analysis frames per second, instead of blindly processing every camera frame.
- Drop a pending frame when MediaPipe is still processing the previous one.
- Keep visual cursor interpolation on `requestAnimationFrame`, independent of camera inference.
- Update status/debug DOM only when displayed values materially change or on a lower-rate timer.
- Avoid canvas redraws when the camera frame or landmarks have not changed.
- Test `modelComplexity: 0` as an installation option for lower-powered totems; keep complexity 1 only if accuracy measurements justify it.

### P4: Reduce rendering and memory cost

- Dispose the active 3Dmol viewer and clear references on every Level 3 exit.
- Cache normalized molecule text and parsed CIF data separately from viewer instances.
- Avoid rebuilding periodic geometry if the same structure is revisited; cache immutable geometry, not WebGL viewer state.
- Render at the actual viewport size, not a larger backing size than the display requires.
- Use one shared element-color table and one legend renderer instead of recreating constants in multiple paths.

### P5: Asset and delivery cleanup

- Generate responsive derivatives for the painting and material images.
- Prefer WebP/AVIF for photographic assets and keep PNG only where pixel-exact masks/transparency are required.
- Confirm that the MediaPipe package contains only the model/WASM files used by this version.
- Add cache-friendly local serving headers when using a production kiosk server.
- Keep filenames and loading paths stable so the offline launcher remains reliable.

## Suggested execution order

1. Add measurements and capture the two viewport baselines.
2. Lazy-load Level 3 libraries and renderer.
3. Optimize the painting asset and defer noncritical images.
4. Cap and instrument the hand-processing loop.
5. Extract modules around state, hand tracking, views, and molecule rendering.
6. Add focused tests for mask sampling, state transitions, stale molecule loads, and CIF conversion.
7. Re-run the same benchmark and set budgets for startup, tracking latency, and Level 3 transition.

## Proposed budgets

These are starting targets, not guarantees:

- First meaningful painting view: under 1.5 s on the kiosk machine after local server startup.
- Hand tracking ready: under 3 s after camera permission, without blocking the painting view.
- Effective inference rate: 15-24 FPS with no unbounded queue.
- Cursor visual latency: under 100 ms after a result arrives.
- Level 3 first render: under 1.5 s when the structure is cached.
- No repeated Level 3 scene visible during a transition.
- No unnecessary scrollbar/layout shift caused by content measurement.

## What not to do first

- Do not rewrite the whole project into a framework before measuring.
- Do not replace exact mask sampling with approximate color matching as a performance shortcut.
- Do not optimize molecule geometry blindly; first determine whether startup, camera inference, image decode, or WebGL rendering dominates on the target kiosk.
- Do not remove the offline asset strategy until the deployment environment and network assumptions are explicit.
