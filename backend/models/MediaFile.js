const mongoose = require("mongoose");

const mediaFileSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    fileName: String,
    fileType: { type: String, enum: ["image", "video"] },
    fileSize: Number,
    resolution: String,
    duration: Number,
    metadata: Object,
    fileHash: String,
    uploadPath: String,
    uploadDate: Date,
    verificationScore: Number,
    provenanceStatus: { type: String, enum: ["Authentic", "Fake", "Modified"] },
    blockchainTxId: String,
    verifiedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("MediaFile", mediaFileSchema);
