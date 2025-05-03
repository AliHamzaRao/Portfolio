import mongoose from "mongoose"

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  technologies: {
    type: [String],
    default: [],
  },
  images: {
    type: [String],
    default: [],
  },
  githubUrl: {
    type: String,
  },
  liveUrl: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema)
