/**
 * Telemetry & Performance Measurement Utility
 * Lightweight, zero-dependency performance instrumentation for Museum Totem Art Zoom.
 */
const Telemetry = (() => {
  const isBenchMode = new URLSearchParams(window.location.search).has("bench") ||
                      new URLSearchParams(window.location.search).has("perf");
  
  const frameDurations = [];
  let droppedFramesCount = 0;
  let processedFramesCount = 0;

  function mark(name) {
    try {
      performance.mark(name);
    } catch (e) {}
  }

  function measure(name, startMark, endMark) {
    try {
      performance.measure(name, startMark, endMark);
      const entries = performance.getEntriesByName(name, "measure");
      const latest = entries[entries.length - 1];
      if (isBenchMode && latest) {
        console.log(`⏱️ [PERF] ${name}: ${latest.duration.toFixed(2)}ms`);
      }
      return latest ? latest.duration : 0;
    } catch (e) {
      return 0;
    }
  }

  function recordInferenceTime(durationMs) {
    frameDurations.push(durationMs);
    if (frameDurations.length > 100) frameDurations.shift();
    processedFramesCount++;
  }

  function recordDroppedFrame() {
    droppedFramesCount++;
  }

  function getStats() {
    const avgDuration = frameDurations.length > 0
      ? (frameDurations.reduce((a, b) => a + b, 0) / frameDurations.length).toFixed(2)
      : 0;
    
    return {
      avgInferenceMs: avgDuration,
      processedFrames: processedFramesCount,
      droppedFrames: droppedFramesCount,
      isBenchMode
    };
  }

  if (isBenchMode) {
    window.addEventListener("DOMContentLoaded", () => {
      const hud = document.createElement("div");
      hud.id = "perfHud";
      hud.style.cssText = `
        position: fixed;
        top: 12px;
        right: 12px;
        background: rgba(18, 18, 22, 0.88);
        color: #00ffcc;
        font-family: monospace;
        font-size: 11px;
        padding: 8px 12px;
        border-radius: 6px;
        border: 1px solid rgba(0, 255, 204, 0.3);
        z-index: 99999;
        pointer-events: none;
        line-height: 1.4;
      `;
      document.body.appendChild(hud);

      let lastHudUpdate = 0;
      function updateHud(now) {
        if (now - lastHudUpdate > 300) {
          lastHudUpdate = now;
          const stats = getStats();
          hud.innerHTML = `
            <strong>PERF BENCH HUD</strong><br/>
            Inference: ${stats.avgInferenceMs}ms<br/>
            Processed: ${stats.processedFrames}<br/>
            Dropped: ${stats.droppedFrames}
          `;
        }
        requestAnimationFrame(updateHud);
      }
      requestAnimationFrame(updateHud);
    });
  }

  return {
    mark,
    measure,
    recordInferenceTime,
    recordDroppedFrame,
    getStats,
    isBenchMode
  };
})();

window.Telemetry = Telemetry;
