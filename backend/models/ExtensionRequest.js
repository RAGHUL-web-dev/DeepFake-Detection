const mongoose = require("mongoose");

const extensionRequestSchema = new mongoose.Schema(
  {
    mediaHash: String,
    result: { type: String, enum: ["authentic", "fake", "unknown"] },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaFile" },
    pageUrl: String,
    browserType: { type: String, enum: ["Chrome", "Edge", "Firefox"] },
    queriedAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ExtensionRequest", extensionRequestSchema);
