import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  shortDescription: { type: String, required: true },
  fullDescription: { type: String, required: true },
  technologies: { type: [String], required: true },
  images: { type: [String], required: true },
  order: { type: Number, default: 0 },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)

