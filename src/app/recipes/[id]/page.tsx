import React, { Suspense } from 'react';
import RecipeDetailsComponent from './RecipeDetails';

export default async function RecipeDetails({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <div className='flex min-h-screen flex-col p-8'>
      <header className='flex w-full items-center justify-center'>
        <div className='flex items-center text-xl'>Recipe Details</div>
      </header>
      <main className='flex w-full flex-1 flex-col flex-wrap justify-center'>
        <Suspense
          fallback={
            <div className='align-center justify-items-center text-center'>
              Loading...
            </div>
          }
        >
          <RecipeDetailsComponent id={id} />
        </Suspense>
      </main>
    </div>
  );
}
