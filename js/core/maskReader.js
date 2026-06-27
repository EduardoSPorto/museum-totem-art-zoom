const MaskReader = (() => {
  let paintingCanvas = null;
  let maskCanvas = null;
  let paintingCtx = null;
  let maskCtx = null;
  let paintingImage = null;
  let maskImage = null;

  function init(paintingCanvasElement, maskCanvasElement) {
    paintingCanvas = paintingCanvasElement;
    maskCanvas = maskCanvasElement;
    paintingCtx = paintingCanvas.getContext("2d");
    maskCtx = maskCanvas.getContext("2d");
  }

  function loadImages() {
    createPlaceholderPainting();
    createPlaceholderMask();

    console.log("✓ Placeholder images loaded (user will add real images)");
  }

  function createPlaceholderPainting() {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 800;
    tempCanvas.height = 600;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = "#fff";
    tempCtx.fillRect(0, 0, 800, 600);

    tempCtx.fillStyle = "#C41E3A";
    tempCtx.beginPath();
    tempCtx.arc(400, 300, 150, 0, Math.PI * 2);
    tempCtx.fill();

    paintingImage = tempCanvas;
    drawPainting();
  }

  function createPlaceholderMask() {
    const tempCanvas = document.createElement("canvas");
    tempCanvas.width = 800;
    tempCanvas.height = 600;
    const tempCtx = tempCanvas.getContext("2d");

    tempCtx.fillStyle = "#FFFFFF";
    tempCtx.fillRect(0, 0, 800, 600);

    tempCtx.fillStyle = "#FF0000";
    tempCtx.beginPath();
    tempCtx.arc(400, 300, 150, 0, Math.PI * 2);
    tempCtx.fill();

    maskImage = tempCanvas;
    drawMask();
  }

  function drawPainting() {
    if (!paintingImage || !paintingCanvas || !paintingCtx) return;
    paintingCtx.clearRect(0, 0, paintingCanvas.width, paintingCanvas.height);
    paintingCtx.drawImage(paintingImage, 0, 0, paintingCanvas.width, paintingCanvas.height);
  }

  function drawMask() {
    if (!maskImage || !maskCanvas || !maskCtx) return;
    maskCtx.clearRect(0, 0, maskCanvas.width, maskCanvas.height);
    maskCtx.drawImage(maskImage, 0, 0, maskCanvas.width, maskCanvas.height);
  }

  function resizeCanvases(paintingCanvasElement, maskCanvasElement) {
    if (!paintingCanvasElement || !maskCanvasElement) return;

    const container = paintingCanvasElement.parentElement;
    const rect = container.getBoundingClientRect();

    paintingCanvasElement.width = rect.width;
    paintingCanvasElement.height = rect.height;
    maskCanvasElement.width = rect.width;
    maskCanvasElement.height = rect.height;

    drawPainting();
    drawMask();
  }

  function getCanvasCoordinates(event) {
    if (!paintingCanvas || !maskCanvas) return { x: 0, y: 0 };

    const rect = paintingCanvas.getBoundingClientRect();
    const scaleX = maskCanvas.width / rect.width;
    const scaleY = maskCanvas.height / rect.height;

    const x = (event.clientX - rect.left) * scaleX;
    const y = (event.clientY - rect.top) * scaleY;

    return { x: Math.round(x), y: Math.round(y) };
  }

  function sampleMaskColor(x, y) {
    if (!maskImage || !maskCtx) return null;

    const imageData = maskCtx.getImageData(x, y, 1, 1);
    const [r, g, b, a] = imageData.data;

    return { r, g, b, a, hex: rgbToHex(r, g, b) };
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((value) => {
      const hex = value.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("").toUpperCase();
  }

  return {
    init,
    loadImages,
    resizeCanvases,
    getCanvasCoordinates,
    sampleMaskColor,
    drawPainting,
    drawMask
  };
})();
