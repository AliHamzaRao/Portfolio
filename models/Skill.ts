import mongoose from "mongoose"

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
  category: { type: String, required: true },
  order: { type: Number, default: 0 },
})

export default mongoose.models.Skill || mongoose.model("Skill", SkillSchema)

