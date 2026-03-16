const mongoose = require("mongoose");

const blockchainRecordSchema = new mongoose.Schema(
  {
    mediaId: { type: mongoose.Schema.Types.ObjectId, ref: "MediaFile" },
    fileHash: String,
    txHash: String,
    blockNumber: Number,
    network: String,
    contractAddress: String,
    timestamp: Date,
    status: { type: String, enum: ["success", "failed"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BlockchainRecord", blockchainRecordSchema);
