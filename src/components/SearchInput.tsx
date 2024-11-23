import { IoCloseOutline } from "react-icons/io5"

type SearchInputProps = {
  search: string,
  setSearch: (value: string) => void
}

export default function SearchInput({search, setSearch}: SearchInputProps){

  return(
    <div className="relative flex items-center w-full max-w-6xl">
      <input
        type="text"
        placeholder="Digite para pesquisar filmes..."
        className="w-full border border-primiry rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-primiry focus:border-transparent"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {search && (
        <IoCloseOutline onClick={() => setSearch("")} className='absolute right-3 w-7 h-7 text-secondary hover:cursor-pointer' />
      )}
    </div>
  )
}