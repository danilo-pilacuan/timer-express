const path = require("path");
const { promisify } = require("util");
const getPixels = promisify(require("get-pixels"));
const fs = require("fs");

const { GIFEncoder, quantize, applyPalette } = require("gifenc");

encode();

async function encode() {
  // Load width/height + RGBA uint8 array data
  const { data, width, height } = await readImage(
    path.resolve(__dirname, "getTimerCanvas.png")
  );

  // Choose a pixel format: rgba4444, rgb444, rgb565
  const format = "rgb444";

  // If necessary, quantize your colors to a reduced palette
  const palette = quantize(data, 256, { format });
  const gif = GIFEncoder();

  // Apply palette to RGBA data to get an indexed bitmap
  console.time("timeToFrame")
  const index = applyPalette(data, palette, format);

  // Now let's encode it into a GIF

  // Write a single frame into the encoder
  gif.writeFrame(index, width, height, { palette });
  console.timeEnd("timeToFrame")  
  // Finish encoding (write end-of-file character)
  gif.finish();

  // Get a uint8array buffer with our bytes
  const bytes = gif.bytes();

  // Write the uint8 array data to file
  fs.writeFileSync(
    path.resolve(__dirname, "testGTC.gif"),
    Buffer.from(bytes)
  );
}

async function readImage(file) {
  const { data, shape } = await getPixels(file);
  let width, height;
  if (shape.length === 3) {
    // PNG,JPG,etc...
    width = shape[0];
    height = shape[1];
  } else if (shape.length === 4) {
    // still GIFs might appear in frames, so [N,w,h]
    width = shape[1];
    height = shape[2];
  } else {
    throw new Error("Invalid shape " + shape.join(", "));
  }
  return { data, width, height };
}