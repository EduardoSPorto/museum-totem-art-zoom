/**
 * Gesture Recognition & Math Heuristics
 * Scale-normalized pinch detection, landmark distances, palm centering, and screen mapping.
 */
const Gestures = (() => {
  const PINCH_THRESHOLD = 0.58;
  const PINCH_RELEASE_THRESHOLD = 0.82;
  const PINCH_CONFIRMATION_MS = 100;
  const MIN_MOLECULE_HAND_SCALE = 0.08;
  const MOLECULE_ROTATION_DEGREES_PER_PALM_WIDTH = 180;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function getLandmarkDistance(a, b) {
    if (!a || !b) return null;
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    const dz = (a.z || 0) - (b.z || 0);
    return Math.hypot(dx, dy, dz);
  }

  function getPalmCenter(landmarks) {
    if (!landmarks || landmarks.length < 18) return null;

    const palmLandmarks = [landmarks[0], landmarks[5], landmarks[9], landmarks[13], landmarks[17]].filter(Boolean);
    if (palmLandmarks.length === 0) return null;

    const palmCenter = palmLandmarks.reduce((acc, landmark) => {
      acc.x += landmark.x;
      acc.y += landmark.y;
      acc.z += landmark.z || 0;
      return acc;
    }, { x: 0, y: 0, z: 0 });

    return {
      x: palmCenter.x / palmLandmarks.length,
      y: palmCenter.y / palmLandmarks.length,
      z: palmCenter.z / palmLandmarks.length
    };
  }

  function getPinchMetrics(landmarks) {
    if (!landmarks || landmarks.length < 18) return null;

    const thumbTip = landmarks[4];
    const indexTip = landmarks[8];
    const indexMcp = landmarks[5];
    const pinkyMcp = landmarks[17];
    const middleMcp = landmarks[9];

    const pinchDistance = getLandmarkDistance(thumbTip, indexTip);
    const palmWidth = getLandmarkDistance(indexMcp, pinkyMcp);
    const palmLength = getLandmarkDistance(landmarks[0], middleMcp);

    if (!Number.isFinite(pinchDistance) || !Number.isFinite(palmWidth) || !Number.isFinite(palmLength)) {
      return null;
    }

    const handScale = Math.max((palmWidth + palmLength) / 2, 0.001);

    return {
      pinchDistance,
      handScale,
      pinchRatio: pinchDistance / handScale
    };
  }

  function mapHandPointToScreen(rawX, rawY, region, screenWidth, screenHeight) {
    const mirroredX = 1 - rawX;
    const left = region.centerX - region.widthRatio / 2;
    const top = region.centerY - region.heightRatio / 2;

    let normalizedX = (mirroredX - left) / region.widthRatio;
    let normalizedY = (rawY - top) / region.heightRatio;

    if (region.clampToRegion) {
      normalizedX = clamp(normalizedX, 0, 1);
      normalizedY = clamp(normalizedY, 0, 1);
    }

    return {
      x: normalizedX * screenWidth,
      y: normalizedY * screenHeight,
      normalizedX,
      normalizedY
    };
  }

  return {
    clamp,
    getLandmarkDistance,
    getPalmCenter,
    getPinchMetrics,
    mapHandPointToScreen,
    PINCH_THRESHOLD,
    PINCH_RELEASE_THRESHOLD,
    PINCH_CONFIRMATION_MS,
    MIN_MOLECULE_HAND_SCALE,
    MOLECULE_ROTATION_DEGREES_PER_PALM_WIDTH
  };
})();

window.Gestures = Gestures;
