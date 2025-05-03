import mongoose from "mongoose"

const TestimonialSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  company: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String },
  rating: { type: Number, min: 1, max: 5, default: 5 },
  order: { type: Number, default: 0 },
})

export default mongoose.models.Testimonial || mongoose.model("Testimonial", TestimonialSchema)
