const mongoose = require("mongoose");

const deepfakeResultSchema = new mongoose.Schema(
  {
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaFile" },
    result: { type: String, enum: ["authentic", "fake", "uncertain"] },
    confidence: Number,
    detectionModel: String,
    tamperedRegions: Array,
    heatmapPath: String,
    frameLevelResults: Array,
    methodPredicted: String,
    processingTime: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("DeepfakeResult", deepfakeResultSchema);
