export type RecipeMainInfo = {
  id: string;
  title: string;
  imageUrl: string;
}

export type RecipeDetails = {
    id: string;
    title: string;
    imageUrl: string;
    ingredients: string[];
    summary: string;
    readyInMinutes: number;
}
