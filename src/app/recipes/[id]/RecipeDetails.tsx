import { fetchRecipeDetails } from '@/lib/recipesApi';
import { RecipeDetails } from '@/types/recipeTypes';
import React, { use } from 'react';

export default function RecipeDetailsComponent({ id }: { id: string }) {
  const data = use(fetchRecipeDetails(id));
  if ('error' in data) {
    return (
      <div className='align-center justify-items-center text-center'>
        {data.error}
      </div>
    );
  }
  const recipe = data as RecipeDetails;
  return (
    <div className='flex flex-col items-center justify-center p-8'>
      <h1 className='text-2xl font-bold'>{recipe.title}</h1>
      <img
        src={recipe.imageUrl}
        alt={recipe.title}
        className='mt-4 w-60 rounded-lg'
      />
      <p className='mt-4 text-lg'>{recipe.summary}</p>
      {/* <div className='mt-4'>
        <h2 className='text-xl font-semibold'>Ingredients:</h2>
        <ul className='list-disc pl-5'>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
      </div> */}
    </div>
  );
}
