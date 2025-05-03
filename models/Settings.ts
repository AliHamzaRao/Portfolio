import mongoose from "mongoose"

const SettingsSchema = new mongoose.Schema({
  primaryColor: { type: String, default: "#0ea5e9" },
  secondaryColor: { type: String, default: "#1e293b" },
  accentColor: { type: String, default: "#7c3aed" },
  nameFont: { type: String, default: "Pacifico, cursive" },
  titleFont: { type: String, default: "Poppins, sans-serif" },
  bodyFont: { type: String, default: "Inter, sans-serif" },
  enableCustomCursor: { type: Boolean, default: true },
  cursorSize: { type: Number, default: 20 },
  cursorColor: { type: String, default: "#0ea5e9" },
  enableLightEffects: { type: Boolean, default: true },
  enableDarkEffects: { type: Boolean, default: true },
})

export default mongoose.models.Settings || mongoose.model("Settings", SettingsSchema)
