/**
 * Vendor Script Lazy Loader
 * Dynamically loads heavy 3D rendering libraries (Three.js and 3Dmol.js) only when needed.
 */
const VendorLoader = (() => {
  const loadedScripts = new Set();
  const pendingLoads = new Map();

  function loadScript(src) {
    if (loadedScripts.has(src)) return Promise.resolve();
    if (pendingLoads.has(src)) return pendingLoads.get(src);

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = src;
      script.async = true;
      script.onload = () => {
        loadedScripts.add(src);
        pendingLoads.delete(src);
        resolve();
      };
      script.onerror = (err) => {
        pendingLoads.delete(src);
        reject(new Error(`Failed to load script: ${src}`));
      };
      document.head.appendChild(script);
    });

    pendingLoads.set(src, promise);
    return promise;
  }

  async function loadMoleculeLibraries() {
    if (window.Telemetry) window.Telemetry.mark("vendor-3d-load-start");
    
    // Load Three.js then 3Dmol.js sequentially to satisfy any dependencies
    await loadScript("assets/vendor/three.min.js");
    await loadScript("assets/vendor/3Dmol-min.js");

    if (window.Telemetry) {
      window.Telemetry.mark("vendor-3d-load-end");
      window.Telemetry.measure("vendor-3d-load-time", "vendor-3d-load-start", "vendor-3d-load-end");
    }
  }

  function areMoleculeLibrariesLoaded() {
    return Boolean(window.$3Dmol);
  }

  return {
    loadMoleculeLibraries,
    areMoleculeLibrariesLoaded
  };
})();

window.VendorLoader = VendorLoader;
