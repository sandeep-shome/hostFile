import mongoose from "mongoose";
const fileSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    ref: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const fileModel = mongoose.model("files", fileSchema);
export default fileModel;
