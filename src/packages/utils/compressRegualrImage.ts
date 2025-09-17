const minTargetSizeKb = 1024; // 1 MB
const maxTargetSizeKb = 4096; // 4 MB
const minCompressionQuality = 0.3;
const maxCompressionQuality = 0.85;

export function compressionQualityPlanner(origSizeKb: number): { shouldCompress: boolean; quality: number } {
  // If the file is already small enough, no need to compress
  if (origSizeKb <= minTargetSizeKb) {
    return {
      shouldCompress: false,
      quality: maxCompressionQuality,
    };
  }

  // Base quality calculation
  let quality: number;
  if (origSizeKb >= maxTargetSizeKb * 3) {
    quality = minCompressionQuality;
  } else {
    const ratio =
      Math.log(origSizeKb / minTargetSizeKb) /
      Math.log((maxTargetSizeKb * 3) / minTargetSizeKb);
    quality =
      maxCompressionQuality - ratio * (maxCompressionQuality - minCompressionQuality);
  }

  return {
    shouldCompress: true,
    quality: Math.max(minCompressionQuality, Math.min(maxCompressionQuality, quality)),
  };
}

export const compressImage = async (file: File): Promise<File> => {
  if (!file.type.includes("jpeg") && !file.type.includes("jpg")) {
    // Skip non-JPEG
    return file;
  }

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = reject;
      image.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

  const origSizeKb = file.size / 1024;

  const { shouldCompress, quality } = compressionQualityPlanner(origSizeKb);

  if (!shouldCompress) {
    return file;
  }

  // Keep original width and height
  const canvas = document.createElement("canvas");
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, img.width, img.height);

  const blob: Blob = await new Promise((resolve) =>
    canvas.toBlob((b) => resolve(b as Blob), "image/jpeg", quality)
  );

  return new File([blob], file.name, { type: "image/jpeg" });
};
