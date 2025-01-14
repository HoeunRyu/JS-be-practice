import mongoose from "mongoose";

const MissionSchema = new mongoose.Schema(
  {
    missionTitle: {
      type: String,
      required: true,
    },
    missionPoint: {
      type: Number,
      min: 10,
    },
    isComplete: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: String,
      default: Date.now,
    },
    updatedAt: {
      type: String,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Mission = mongoose.model("Mission", MissionSchema);
export default Mission;
