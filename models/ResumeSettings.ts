import mongoose from "mongoose"

const CustomSectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
})

const ResumeSettingsSchema = new mongoose.Schema({
  paperSize: { type: String, enum: ["A4", "Letter", "Legal"], default: "A4" },
  margins: { type: Number, default: 40 },
  fontFamily: { type: String, default: "Helvetica, Arial, sans-serif" },
  fontSize: { type: Number, default: 11 },
  lineHeight: { type: Number, default: 1.5 },
  includePhoto: { type: Boolean, default: false },
  includeSocialLinks: { type: Boolean, default: false },
  customSummary: { type: String, default: "" },
  customSkills: { type: String, default: "" },
  customSections: [CustomSectionSchema],
})

export default mongoose.models.ResumeSettings || mongoose.model("ResumeSettings", ResumeSettingsSchema)
