// This file uploads your image to Irys and gives you its URI
// Read the image as bytes
// Wrap it as a Umi file
// Upload it
// Log the image URI

import { umi } from "../umi";
import { createGenericFile } from "@metaplex-foundation/umi";

// The raw image data saved as Uint8Array
const bytes = await Bun.file("assets/Julo.png").bytes();

// The bytes wrapped as a Umi GenericFile, with a name and content type
const file = createGenericFile(bytes, "Julo.png", { contentType: "image/png"});

// Upload the file to Irys, which returns an array of URIs; take the first one
const [imageUri] = await umi.uploader.upload([file]);

console.log("Image URI:", imageUri);

