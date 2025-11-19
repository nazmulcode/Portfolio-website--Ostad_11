import File from "../models/file.model.js";

const uploadFile = async (req, res) => {
  console.log("Upload result:", req.file);

  try {
    const fileUrl = req.file.path; // Cloudinary URL
    console.log(fileUrl);

    const data = await File.create({ filename: fileUrl });
    res.status(201).json({
      success: true,
      message: "File upload successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "File upload failed",
      Error: error.message,
    });
  }
};

const fileController = { uploadFile };
export default fileController;
