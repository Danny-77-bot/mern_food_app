import mongoose from "mongoose";

const ProfileScema= mongoose.Schema({
    imageUrl: {
        type: String,
        required: true,
      },
  name: {
    type: String,
    required: true,
  },

  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const ProfileModel = mongoose.model("profiles", ProfileScema);
