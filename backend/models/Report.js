const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaFile" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    reportType: { type: String, enum: ["incorrect detection", "abuse", "fake"] },
    description: String,
    submittedAt: Date,
    status: { type: String, enum: ["pending", "reviewed", "resolved"] },
    moderatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Report", reportSchema);
