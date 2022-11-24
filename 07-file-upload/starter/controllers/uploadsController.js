import path from "path";
import { StatusCodes } from "http-status-codes";
import { CustomAPIError } from "../errors/index.js";
import * as Cloudinary from "cloudinary";
import fs from "fs";
const __dirname = path.resolve();

// TO SAVE IMAGES LOCALLY/INSIDE YOUR PROJECT
const uploadProductImageLocal = async (req, res) => {
  if (!req.files) {
    throw new CustomAPIError("Image not provided!");
  }

  // get access to get "req.files"
  let productImage = req.files.image;

  if (!productImage.mimetype.startsWith("image")) {
    throw new CustomAPIError("Please upload image!");
  }

  const maxSize = 1024 * 1024;
  if (productImage.size > maxSize) {
    throw new CustomAPIError("Please upload image smaller than 1MB");
  }

  // make image path
  const imagePath = path.join(
    __dirname,
    `./public/uploads/${productImage.name}`
  );

  // move image to the path
  await productImage.mv(imagePath);

  res
    .status(StatusCodes.OK)
    .json({ success: true, image: { src: `/uploads/${productImage.name}` } });
};

// TO SAVE IN CLOUDINARY
const uploadProductImage = async (req, res) => {
  const result = await Cloudinary.v2.uploader.upload(
    req.files.image.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );

  // delete image from "tmp" file, in orde not to keep them there
  fs.unlinkSync(req.files.image.tempFilePath);

  res
    .status(StatusCodes.OK)
    .json({ success: true, image: { src: result.secure_url } });
};

export { uploadProductImage };
