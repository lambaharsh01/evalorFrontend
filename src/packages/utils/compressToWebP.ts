export const getAdaptiveCompressionParams = (
  width: number,
  height: number
): { maxDim: number; quality: number } => {
  
  const pixels = width * height;

  if (pixels > 20_000_000) { // Ultra-large (DSLR, >20MP)
    return { maxDim: 2000, quality: 0.65 };
  } else if (pixels > 12_000_000) { // Very large (~12–20MP)
    return { maxDim: 1800, quality: 0.7 };
  } else if (pixels > 8_000_000) { // Large smartphone photos (~8–12MP)
    return { maxDim: 1600, quality: 0.75 };
  } else if (pixels > 5_000_000) { // Mid-high (~5–8MP)
    return { maxDim: 1400, quality: 0.8 };
  } else if (pixels > 3_000_000) { // Mid (~3–5MP)
    return { maxDim: 1200, quality: 0.85 };
  } else if (pixels > 1_000_000) { // Small (~1–3MP)
    return { maxDim: 1000, quality: 0.9 };
  } else { // Very small (<1MP) → keep it nearly original
    return { maxDim: Math.max(width, height), quality: 0.95 };
  }
};

export const compressToWebP = async (file: File): Promise<File> => {
  if (
    !file.type.includes("jpeg") &&
    !file.type.includes("jpg") &&
    !file.type.includes("png")
  ) {
    return file; // Return as-is if not supported
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

  // 🔹 Pick adaptive parameters
  const { maxDim, quality } = getAdaptiveCompressionParams(
    img.width,
    img.height
  );

  // 🔹 Calculate new dimensions (preserve aspect ratio)
  let newWidth = img.width;
  let newHeight = img.height;

  if (img.width > maxDim || img.height > maxDim) {
    if (img.width > img.height) {
      newWidth = maxDim;
      newHeight = Math.round((img.height * maxDim) / img.width);
    } else {
      newHeight = maxDim;
      newWidth = Math.round((img.width * maxDim) / img.height);
    }
  }

  // 🔹 Resize on canvas
  const canvas = document.createElement("canvas");
  canvas.width = newWidth;
  canvas.height = newHeight;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas not supported");

  ctx.drawImage(img, 0, 0, newWidth, newHeight);

  // 🔹 Encode as WebP
  const blob = await new Promise<Blob | null>((resolve) =>
    canvas.toBlob(resolve, "image/webp", quality)
  );

  if (!blob) throw new Error("Failed to compress image");

  return new File(
    [blob],
    file.name.replace(/\.(jpg|jpeg|png)$/i, ".webp"),
    { type: "image/webp" }
  );
};
