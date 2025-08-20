import { Schema, model } from 'mongoose';

const recipeSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    name: { type: String, required: true },
    photo: { type: String },
    description: { type: String, required: true },
    ingredients: {
      type: [
        {
          // Note: we expect an ingredient name in the request, that we match to id from ingredients db later on recipe doc creation
          // Remember to do it in service layer!
          name: {
            type: Schema.Types.ObjectId,
            ref: 'ingredients',
          },
          quantity: { type: String },
        },
      ],
      required: true,
    },
    instructions: { type: String, required: true },
    // Note: same deal as with ingredient: request passes a string instead of id
    // Remember to match with id in the service layer!
    category: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    cookingTime: { type: Number, required: true },
    foodEnergy: { type: Number },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

recipeSchema.index({ userId: 1 });

export const RecipesCollection = model('recipes', recipeSchema);
