export async function processImage(
  file: File,
  style: "vectorize" | "cartoonize" | "original" = "original",
): Promise<string> {
  try {
    // Convert file to data URL
    const dataUrl = await fileToDataUrl(file)

    if (style === "original") {
      return dataUrl
    }

    // Create an image element from the data URL
    const img = await createImageFromDataUrl(dataUrl)

    // Create a canvas element
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")!

    // Set canvas dimensions to match image
    canvas.width = img.width
    canvas.height = img.height

    // Draw the image on the canvas
    ctx.drawImage(img, 0, 0)

    // Apply effects based on style
    if (style === "vectorize") {
      applyVectorizeEffect(ctx, canvas.width, canvas.height)
    } else if (style === "cartoonize") {
      applyCartoonizeEffect(ctx, canvas.width, canvas.height)
    }

    // Convert canvas to data URL
    return canvas.toDataURL("image/png")
  } catch (error) {
    console.error(`Error processing image with style ${style}:`, error)
    throw error
  }
}

// Helper function to convert a File/Blob to a data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

// Helper function to create an Image from a data URL
export function createImageFromDataUrl(dataUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => resolve(img)
    img.onerror = reject
    img.src = dataUrl
    img.crossOrigin = "anonymous"
  })
}

// Apply a vectorize effect to the canvas
function applyVectorizeEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  // Convert to grayscale and apply threshold
  for (let i = 0; i < data.length; i += 4) {
    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3
    const value = avg > 128 ? 255 : 0
    data[i] = data[i + 1] = data[i + 2] = value
  }

  // Put the modified image data back on the canvas
  ctx.putImageData(imageData, 0, 0)
}

// Apply a cartoonize effect to the canvas
function applyCartoonizeEffect(ctx: CanvasRenderingContext2D, width: number, height: number) {
  // Get image data
  const imageData = ctx.getImageData(0, 0, width, height)
  const data = imageData.data

  // Apply a simple posterize effect
  for (let i = 0; i < data.length; i += 4) {
    data[i] = Math.floor(data[i] / 64) * 64 // Red
    data[i + 1] = Math.floor(data[i + 1] / 64) * 64 // Green
    data[i + 2] = Math.floor(data[i + 2] / 64) * 64 // Blue
  }

  // Put the modified image data back on the canvas
  ctx.putImageData(imageData, 0, 0)

  // Apply edge detection (simple implementation)
  ctx.drawImage(ctx.canvas, 0, 0)
}
