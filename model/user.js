import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userInfo: [
      {
        username: { type: String },
        address: { type: String },
        phone: { type: String },
        role: { type: Number, default: 0 }, //0 for general user and 1 for admin
      },
    ],
  },
  { timestamps: true }
);

//check previour model with the same name

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
