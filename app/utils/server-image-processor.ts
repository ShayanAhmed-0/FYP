import sharp from "sharp"

/**
 * Creates a vectorized version of the image
 * Uses Sharp to create a high-contrast, edge-detected image
 */
export async function vectorizeImage(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
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
  } catch (error) {
    console.error("Error vectorizing image:", error)
    // Return original buffer if processing fails
    return buffer
  }
}

/**
 * Creates a cartoon-style version of the image
 * Uses Sharp to apply cartoon-like effects
 */
export async function cartoonizeImage(buffer: Buffer): Promise<Buffer> {
  try {
    return await sharp(buffer)
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
  } catch (error) {
    console.error("Error cartoonizing image:", error)
    // Return original buffer if processing fails
    return buffer
  }
}
