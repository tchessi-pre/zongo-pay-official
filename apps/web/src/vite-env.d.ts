/// <reference types="vite/client" />

interface DetectedBarcode {
  rawValue?: string;
}

declare class BarcodeDetector {
  constructor(options?: { formats?: string[] });
  detect(source: CanvasImageSource | Blob | ImageBitmap | ImageData | HTMLVideoElement): Promise<DetectedBarcode[]>;
}

declare global {
  interface Window {
    BarcodeDetector?: typeof BarcodeDetector;
  }
}

export { };
