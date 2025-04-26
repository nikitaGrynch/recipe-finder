import { fetchRecipes } from '@/lib/recipesApi';
import { RecipeMainInfo } from '@/types/recipeTypes';
import Link from 'next/link';
import React, { use } from 'react';

export default function RecipesListComponent({
  searchQuery,
  cuisine,
  preparationTime,
}: {
  searchQuery?: string;
  cuisine?: string;
  preparationTime?: string;
}) {
  const data = use(
    fetchRecipes({
      searchQuery,
      cuisine,
      preparationTime: preparationTime,
    }),
  );
  if ('error' in data) {
    return (
      <div className='align-center justify-items-center text-center'>
        {data.error}
      </div>
    );
  }
  const recipes = Array.isArray(data) ? (data as RecipeMainInfo[]) : [];
  if (!recipes.length) {
    return (
      <div className='align-center justify-items-center text-center'>
        No recipes found
      </div>
    );
  }
  return (
    <div className='flex flex-wrap justify-center gap-10'>
      {recipes.map((recipe: RecipeMainInfo) => (
        <Link
          href={`/recipes/${recipe.id}`}
          key={recipe.id}
          className='mt-5 mb-5 flex w-60 max-w-sm flex-col items-center justify-center rounded-lg border border-gray-200 bg-white p-4 shadow-md'
        >
          <img
            src={recipe.imageUrl}
            alt={recipe.title}
            className='mb-2 h-32 w-60 rounded-lg object-contain'
          />
          <h2 className='text-lg font-semibold'>{recipe.title}</h2>
        </Link>
      ))}
    </div>
  );
}
