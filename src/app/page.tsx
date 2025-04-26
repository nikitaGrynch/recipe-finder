'use client';
import Link from 'next/link';
import { useState } from 'react';

const CUISINES = [
  'Asian',
  'American',
  'British',
  'French',
  'European',
  'German',
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined);
  const [cuisine, setCuisine] = useState<string | undefined>(undefined);
  const [preparationTime, setPreparationTime] = useState<string | undefined>(
    undefined,
  );
  const [showCuisinesDropdown, setShowCuisinesDropdown] = useState(false);
  return (
    <div className='flex min-h-screen flex-col p-8'>
      <header className='flex w-full items-center justify-between'>
        <div className='flex items-center text-xl'>Recipe Finder</div>
      </header>
      <main className='flex flex-1 flex-col items-center justify-center gap-10'>
        <div className='flex w-3/4 max-w-xl flex-col items-center gap-7 sm:w-2/3'>
          <div className='flex w-full items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600'>
            <input
              onChange={(e) => setSearchQuery(e.target.value)}
              value={searchQuery || ''}
              type='text'
              name='searchQuery'
              id='searchQuery'
              className='block min-w-0 grow py-1.5 pr-3 pl-3 text-center text-lg text-gray-900 placeholder:text-gray-400 focus:outline-none'
              placeholder='Search for a recipe...'
            />
          </div>
          <div className='flex w-full items-end justify-around'>
            <div className='relative inline-block text-left'>
              <div>
                <button
                  type='button'
                  onClick={() => setShowCuisinesDropdown(!showCuisinesDropdown)}
                  className='text-m inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-1.5 font-semibold text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset hover:bg-gray-50'
                  id='cuisine-dropdown-button'
                  aria-expanded='true'
                  aria-haspopup='true'
                >
                  {cuisine || 'Cuisine'}
                  <svg
                    className='-mr-1 size-5 text-gray-400'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                    aria-hidden='true'
                    data-slot='icon'
                  >
                    <path
                      fillRule='evenodd'
                      d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z'
                      clipRule='evenodd'
                    />
                  </svg>
                </button>
              </div>
              {showCuisinesDropdown && (
                <div
                  className='absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-hidden'
                  role='menu'
                  aria-orientation='vertical'
                  aria-labelledby='menu-button'
                >
                  {CUISINES.map((item, index) => (
                    <button
                      onClick={() => {
                        setCuisine(item);
                        setShowCuisinesDropdown(false);
                      }}
                      key={index}
                      className={`block w-full px-4 py-2 text-sm text-gray-700 ${item === cuisine ? 'bg-gray-100 text-gray-900 outline-hidden' : 'text-gray-700'}`}
                      role='menuitem'
                      id={item}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className='flex flex-col items-center gap-2'>
              <span className='text-md text-right text-gray-400'>
                Preparation Time
              </span>
              <div className='flex items-end gap-2'>
                <div className='items-center rounded-md bg-white outline-1 -outline-offset-1 outline-gray-300 has-[input:focus-within]:outline-2 has-[input:focus-within]:-outline-offset-2 has-[input:focus-within]:outline-indigo-600'>
                  <input
                    onChange={(e) => setPreparationTime(e.target.value)}
                    value={preparationTime || ''}
                    type='number'
                    name='preparationTime'
                    id='preparationTime'
                    className='text-m w-16 py-1.5 pr-3 pl-3 text-center text-gray-900 placeholder:text-gray-400 focus:outline-none'
                    placeholder='0'
                  />
                </div>
                <span className='text-sm text-gray-900'>min</span>
              </div>
            </div>
          </div>
        </div>
        {(searchQuery || cuisine || preparationTime) && (
          // search button
          <Link
            className='flex items-center justify-center rounded-md bg-indigo-600 px-10 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-gray-300 ring-inset hover:bg-indigo-700'
            href={`/recipes?${searchQuery ? `searchQuery=${searchQuery}` : ''}${
              cuisine ? `&cuisine=${cuisine}` : ''
            }${preparationTime ? `&preparationTime=${preparationTime}` : ''}`}
          >
            Next
          </Link>
        )}
      </main>
    </div>
  );
}
