import { Search } from "../assets"

interface SearchProps {
  handleSubmit: (event: any) => void
  setLocationData: React.Dispatch<React.SetStateAction<string>>
  locationData: string
}

function SearchBar({ handleSubmit, setLocationData, locationData }: SearchProps) {
  return (
    <div className='h-16 rounded-lg bg-slate-50 shadow px-5 flex items-center'>
      <form className='flex  w-full' onSubmit={handleSubmit}>
        <label htmlFor='search-field' className='sr-only'>
          Search
        </label>
        <div className='relative w-full text-gray-400 flex focus-within:text-gray-600'>
          <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none'>
            <Search className='h-5 w-5' aria-hidden='true' />
          </div>
          <input
            id='search-field'
            className='block w-full flex-1 h-full pl-8 pr-3 py-2 border-transparent text-gray-900 placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent sm:text-sm'
            placeholder='Search for a zip code...'
            type='number'
            maxLength={10}
            required
            name='search'
            onChange={(e) => setLocationData(e.target.value)}
            value={locationData}
          />
          <button
            type='submit'
            className='font-medium text-md py-2 border rounded-lg px-6 text-gray-900 my-2 bg-blue-200'
          >
            Search
          </button>
        </div>
      </form>
    </div>
  )
}

export default SearchBar
