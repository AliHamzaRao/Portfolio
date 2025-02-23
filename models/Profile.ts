import mongoose from "mongoose"

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },
})

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema)

