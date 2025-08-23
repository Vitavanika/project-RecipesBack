import { RecipesCollection } from "../models/recipe.js";
import { IngredientsCollection } from "../models/ingredient.js";
import { CategoriesCollection } from "../models/category.js";

export const createRecipe = async (payload) => {
    const allIngredients = await IngredientsCollection.find({});

    const ingredientsWithIds = await Promise.all(
        payload.ingredients.map(async (ing) => {
            const normalizedInput = ing.name.trim().toLowerCase();
            const ingredientDoc = allIngredients.find(
                ingDoc => ingDoc.name.trim().toLowerCase() === normalizedInput
            );

            if (!ingredientDoc) throw new Error(`Ingredient "${ing.name}" not found`);
            return { ingredientId: ingredientDoc._id, quantity: ing.quantity };
        })
    );

    const allCategories = await CategoriesCollection.find();
    const normalizedCategoryName = payload.category?.trim().toLowerCase();
    const categoryDoc = allCategories.find(
        cat => cat.name.trim().toLowerCase() === normalizedCategoryName
    );
    if (!categoryDoc) throw new Error(`Category "${payload.category}" not found`);

  const recipe = await RecipesCollection.create({
    ...payload,
    ingredients: ingredientsWithIds,
    categoryId: categoryDoc._id,
    cookingTime: Number(payload.cookingTime),
  });

  return recipe;
};