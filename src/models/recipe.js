import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true, index: true },
    description: { type: String, trim: true },
    ingredients: [{ type: String, trim: true }],
    tags: [{ type: String, index: true }],
    isFavorite: { type: Boolean, default: false, index: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  },
  { timestamps: true }
);

// Опціонально: текстовий індекс для пошуку
recipeSchema.index({ title: "text", description: "text" });

export const Recipe = mongoose.model("Recipe", recipeSchema);