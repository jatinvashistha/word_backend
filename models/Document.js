import mongoose, { Mongoose } from "mongoose";

export const schema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

// const DocumentModal = mongoose.model("Document", DocumentSchema);
// module.exports = DocumentModal;
export const Document = mongoose.model("Document", schema);