const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        fileName: {
            type: String,
            required: [true, "Please provide the original file name"],
            trim: true
        },
        fileType: {
            type: String,
            required: [true, "Please provide the file type (Image, Video, Audio, Document)"],
            enum: ["Image", "Video", "Audio", "Document"]
        },
        fileSize: {
            type: Number, // In bytes
            required: true
        },
        url: {
            type: String,
            required: [true, "Please provide the location URL or path of the media"]
        },
        
        // Verification Result Configuration
        verdict: {
            type: String,
            enum: ["Authentic", "Fake", "Uncertain", "Processing", "Failed"],
            default: "Processing"
        },
        confidenceScore: {
            type: Number,
            min: 0,
            max: 100
        },
        findings: [
            {
                type: String
            }
        ],

        // Administrative configurations
        status: {
            type: String,
            enum: ["active", "flagged", "deleted"],
            default: "active",
            index: true
        },
        flaggedReason: {
            type: String
        },
        
        // Metrics
        createdAt: {
            type: Date,
            default: Date.now,
            index: true
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
);

// Update timestamps on save
mediaSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
});

module.exports = mongoose.model("Media", mediaSchema);
