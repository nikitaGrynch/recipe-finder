import { redirect } from 'next/navigation';
import React, { Suspense } from 'react';
import RecipesListComponent from './RecipesList';

export default async function Recipes({
  searchParams,
}: {
  searchParams: Promise<{
    searchQuery: string;
    cuisine: string;
    preparationTime: string;
  }>;
}) {
  const { searchQuery, cuisine, preparationTime } = await searchParams;
  if (!searchQuery && !cuisine && !preparationTime) {
    redirect('/');
  }
  return (
    <div className='flex min-h-screen flex-col p-8'>
      <header className='flex w-full items-center justify-center'>
        <div className='flex items-center text-xl'>Recipes</div>
      </header>
      <main className='flex w-full flex-1 flex-col flex-wrap justify-center'>
        <Suspense
          fallback={
            <div className='align-center justify-items-center text-center'>
              Loading...
            </div>
          }
        >
          <RecipesListComponent
            searchQuery={searchQuery}
            cuisine={cuisine}
            preparationTime={preparationTime}
          />
        </Suspense>
      </main>
    </div>
  );
}
