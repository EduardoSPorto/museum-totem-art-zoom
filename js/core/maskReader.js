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
    loadImage("assets/artwork/visible_anjo_adonay.png", (image) => {
      paintingImage = image;
      drawPainting();
    });

    loadImage("assets/artwork/color_anjo_adonay.png", (image) => {
      maskImage = image;
      drawMask();
    });

    console.log("✓ Artwork and mask images loading");
  }

  function loadImage(src, onLoad) {
    const image = new Image();
    image.onload = () => onLoad(image);
    image.onerror = () => console.error(`✗ Failed to load image: ${src}`);
    image.src = src;
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
