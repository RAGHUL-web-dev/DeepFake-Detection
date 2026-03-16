const mongoose = require("mongoose");

const aiModelSchema = new mongoose.Schema(
  {
    modelName: String,
    version: String,
    accuracy: Number,
    status: { type: String, enum: ["active", "deprecated"] },
    modelPath: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("AIModel", aiModelSchema);
