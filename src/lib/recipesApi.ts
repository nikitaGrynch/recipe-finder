import { RecipeDetails, RecipeMainInfo } from '@/types/recipeTypes';

export const fetchRecipes = async ({
  searchQuery,
  cuisine,
  preparationTime,
}: {
  searchQuery?: string;
  cuisine?: string;
  preparationTime?: string;
}): Promise<RecipeMainInfo | { error: string }> => {
  if (!searchQuery && !cuisine && !preparationTime) {
    throw new Error('At least one search parameter is required');
  }
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.SPOONACULAR_API_KEY}${searchQuery ? '&query=' + searchQuery : ''}${cuisine ? '&cuisine=' + cuisine : ''}${preparationTime ? '&maxReadyTime=' + preparationTime : ''}`,
    );
    if (!res.ok) {
      return { error: 'Failed to fetch recipes' };
    }
    const data = await res.json();

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const recipes = data.results.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      imageUrl: recipe.image,
    }));
    return recipes;
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { error: 'Failed to fetch recipes' };
  }
};

export const fetchRecipeDetails = async (
  recipeId: string,
): Promise<RecipeDetails | { error: string }> => {
  try {
    const res = await fetch(
      `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=${process.env.SPOONACULAR_API_KEY}`,
    );
    if (!res.ok) {
      return { error: 'Failed to fetch recipe details' };
    }
    const recipeDetails = await res.json();
    return {
      id: recipeDetails.id,
      title: recipeDetails.title,
      imageUrl: recipeDetails.image,
      ingredients: recipeDetails.extendedIngredients.map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (ingredient: any) => ingredient.original,
      ),
      summary: recipeDetails.summary,
      readyInMinutes: recipeDetails.readyInMinutes,
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return { error: 'Failed to fetch recipe details' };
  }
};
