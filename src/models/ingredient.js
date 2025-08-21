import { Schema, model } from 'mongoose';

const ingredientsSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

export const IngredientsCollection = model('ingredients', ingredientsSchema);
