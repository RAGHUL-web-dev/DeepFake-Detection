const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, enum: ["login", "upload", "verify", "report"] },
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaFile" },
    ipAddress: String,
    userAgent: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activityLogSchema);
