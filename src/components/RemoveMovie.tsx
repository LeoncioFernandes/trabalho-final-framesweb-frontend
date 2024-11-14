import { movies } from "../data/Movies";
import { Menu } from "../enums/MenuEnum";
import { RemoveMovieProps } from "../types/RemoveMovieProps";

export default function RemoveMovie({idMovie, activatingMenu}: RemoveMovieProps) {

  const movieById = movies.find((movie) => movie.id === idMovie)

  function onDelete(){
    const index = movies.findIndex((movie) => movie.id === idMovie)
    if(index !== -1){
      movies.splice(index, 1)
    }
    activatingMenu(undefined, Menu.LISTAR);
  }
  
  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl px-4 pb-4">Remover Filme</h1>
      <div className="p-4 text-lg">
        <p>Deseja remover o filme <span className="font-bold">{movieById?.title}</span> ?</p>
      </div>
      <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4 w-full max-w-md">
        <button
          type="button"
          onClick={() => activatingMenu(undefined, Menu.LISTAR)}
          className='w-full text-primiry text-lg font-medium border-2 border-primiry rounded-md p-3 transition hover:bg-primiry hover:text-white'
        >
          Cancelar
        </button>
        <button
          type="button"
          className='w-full text-variation2 text-lg font-medium bg-pink-500 rounded-md p-3 transition hover:bg-pink-800'
          onClick={onDelete}
        >
          Deletar
        </button>
      </div>
    </div>
  )
}
