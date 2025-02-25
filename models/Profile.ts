import mongoose from "mongoose"

const SocialLinkSchema = new mongoose.Schema({
  platform: { type: String, required: true },
  url: { type: String, required: true },
  icon: { type: String, required: true },
})

const ProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  location: { type: String },
  image: { type: String },
  socialLinks: {
    type: [SocialLinkSchema],
    default: [], // Ensure it's always an array
  },
})

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema)

