import sharp from "sharp"

// Helper function to convert a File/Blob to a Buffer
export async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer())
}

// Helper function to convert a Buffer to a data URL
export async function bufferToDataUrl(buffer: Buffer, mimeType: string): Promise<string> {
  const base64 = buffer.toString("base64")
  return `data:${mimeType};base64,${base64}`
}

/**
 * Process an image based on the selected style
 */
export async function processImage(
  file: File,
  style: "vectorize" | "cartoonize" | "original" = "original",
): Promise<string> {
  try {
    // Convert file to buffer
    const buffer = await fileToBuffer(file)

    if (style === "original") {
      // Return original image as data URL
      return await bufferToDataUrl(buffer, file.type)
    } else if (style === "vectorize") {
      return await vectorizeImage(buffer, file.type)
    } else if (style === "cartoonize") {
      return await cartoonizeImage(buffer, file.type)
    }

    // Default fallback
    return await bufferToDataUrl(buffer, file.type)
  } catch (error) {
    console.error(`Error processing image with style ${style}:`, error)
    throw error
  }
}

/**
 * Creates a vectorized version of the image
 * Uses Sharp to create a high-contrast, edge-detected image
 */
export async function vectorizeImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    // Create a high contrast, edge-detected image that looks like a vector graphic
    const processedBuffer = await sharp(buffer)
      // Convert to grayscale
      .grayscale()
      // Increase contrast
      .linear(1.5, -0.3)
      // Apply threshold to create stark black and white
      .threshold(128)
      // Sharpen edges
      .sharpen({ sigma: 1.5 })
      // Output as PNG for better quality
      .png()
      .toBuffer()

    return await bufferToDataUrl(processedBuffer, "image/png")
  } catch (error) {
    console.error("Error vectorizing image:", error)
    // Fallback to original image
    return await bufferToDataUrl(buffer, mimeType)
  }
}

/**
 * Creates a cartoon-style version of the image
 * Uses Sharp to apply cartoon-like effects
 */
export async function cartoonizeImage(buffer: Buffer, mimeType: string): Promise<string> {
  try {
    // Create a cartoon-like effect
    const processedBuffer = await sharp(buffer)
      // Reduce colors for cartoon effect
      .median(5)
      // Increase saturation
      .modulate({ saturation: 1.5 })
      // Increase contrast
      .linear(1.2, -0.2)
      // Sharpen edges
      .sharpen({ sigma: 1.2 })
      // Output as PNG for better quality
      .png()
      .toBuffer()

    return await bufferToDataUrl(processedBuffer, "image/png")
  } catch (error) {
    console.error("Error cartoonizing image:", error)
    // Fallback to original image
    return await bufferToDataUrl(buffer, mimeType)
  }
}

// Server-side implementations for API routes
export async function vectorizeImageServer(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer).grayscale().linear(1.5, -0.3).threshold(128).sharpen({ sigma: 1.5 }).png().toBuffer()
}

export async function cartoonizeImageServer(buffer: Buffer): Promise<Buffer> {
  return await sharp(buffer)
    .median(5)
    .modulate({ saturation: 1.5 })
    .linear(1.2, -0.2)
    .sharpen({ sigma: 1.2 })
    .png()
    .toBuffer()
}
