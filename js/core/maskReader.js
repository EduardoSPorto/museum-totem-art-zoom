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
      resizeCanvases(paintingCanvas, maskCanvas);
      drawPainting();
    });

    loadImage("assets/artwork/color_anjo_adonay.png", (image) => {
      maskImage = image;
      resizeCanvases(paintingCanvas, maskCanvas);
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

    const sourceWidth = paintingImage?.naturalWidth || maskImage?.naturalWidth || 2657;
    const sourceHeight = paintingImage?.naturalHeight || maskImage?.naturalHeight || 3717;
    const sourceAspect = sourceWidth / sourceHeight;
    const containerAspect = rect.width / rect.height;

    let canvasWidth = rect.width;
    let canvasHeight = rect.height;
    if (containerAspect > sourceAspect) {
      canvasHeight = rect.height;
      canvasWidth = canvasHeight * sourceAspect;
    } else {
      canvasWidth = rect.width;
      canvasHeight = canvasWidth / sourceAspect;
    }

    paintingCanvasElement.width = Math.round(canvasWidth);
    paintingCanvasElement.height = Math.round(canvasHeight);
    paintingCanvasElement.style.width = `${canvasWidth}px`;
    paintingCanvasElement.style.height = `${canvasHeight}px`;

    maskCanvasElement.width = Math.round(canvasWidth);
    maskCanvasElement.height = Math.round(canvasHeight);
    maskCanvasElement.style.width = `${canvasWidth}px`;
    maskCanvasElement.style.height = `${canvasHeight}px`;

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
