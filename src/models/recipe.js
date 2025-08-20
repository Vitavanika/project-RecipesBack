import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true, 
        trim: true 
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", 
      required: true,
    },
    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: true 
    },
    area: { 
        type: String, 
        trim: true 
    },
    instructions: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        trim: true 
    },
    thumb: { 
        type: String 
    },
    time: { 
        type: Number, 
        required: true,
        default: 10 
    }, 
    ingredients: [
      {
        ingredient: { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: "Ingredient", 
            required: true 
        },
        measure: { 
            type: String, 
            required: true 
        }, 
      },
    ],
    calories: { 
        type: Number, 
        default: null 
    },
  },
  { timestamps: true }
);

export const RecipeCollection = mongoose.model('Recipe', recipeSchema);