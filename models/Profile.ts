import mongoose from "mongoose"

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please provide a name"],
    maxlength: [60, "Name cannot be more than 60 characters"],
  },
  title: {
    type: String,
    required: [true, "Please provide a title"],
    maxlength: [100, "Title cannot be more than 100 characters"],
  },
  description: {
    type: String,
    required: [true, "Please provide a description"],
  },
  aboutMe: {
    type: String,
    required: [true, "Please provide an about me section"],
  },
  image: {
    type: String,
  },
  // Hero "Architect" fields
  availabilityStatus: {
    type: String,
    maxlength: [60, "Status cannot be more than 60 characters"],
    default: "",
  },
  metrics: [
    {
      label: {
        type: String,
        required: [true, "Please provide a metric label"],
      },
      value: {
        type: String,
        required: [true, "Please provide a metric value"],
      },
    },
  ],
  socialLinks: [
    {
      platform: {
        type: String,
        required: [true, "Please provide a platform name"],
      },
      url: {
        type: String,
        required: [true, "Please provide a URL"],
      },
    },
  ],
  // New resume fields
  resumeUrl: {
    type: String,
  },
  resumeName: {
    type: String,
  },
  resumeSize: {
    type: Number,
  },
  resumeType: {
    type: String,
  },
  // Theme settings
  themeSettings: {
    primaryColor: {
      type: String,
      default: "#0ea5e9", // sky-500
    },
    secondaryColor: {
      type: String,
      default: "#1e293b", // slate-800
    },
    accentColor: {
      type: String,
      default: "#7c3aed", // violet-600
    },
    nameFont: {
      type: String,
      default: "Pacifico, cursive",
    },
    titleFont: {
      type: String,
      default: "Poppins, sans-serif",
    },
    bodyFont: {
      type: String,
      default: "Inter, sans-serif",
    },
    enableCustomCursor: {
      type: Boolean,
      default: true,
    },
    cursorSize: {
      type: Number,
      default: 20,
    },
    cursorColor: {
      type: String,
      default: "#0ea5e9",
    },
    enableLightEffects: {
      type: Boolean,
      default: true,
    },
    enableDarkEffects: {
      type: Boolean,
      default: true,
    },
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

export default mongoose.models.Profile || mongoose.model("Profile", ProfileSchema)
