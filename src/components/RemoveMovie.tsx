import { useEffect, useState } from "react";
import { Menu } from "../enums/MenuEnum";
import instance from "../hooks/instanceApi";
import { RemoveMovieProps } from "../types/RemoveMovieProps";
import { Movie } from "../types/MovieTypes";

export default function RemoveMovie({idMovie, activatingMenu}: RemoveMovieProps) {

  const [movieById, setMovieById] = useState<Movie>();

  const fetchData = async () => {
    const result = await instance.get(`movies/${idMovie}`);
    setMovieById(result.data.movie);
  }

  useEffect(() => {
    if(idMovie){
      fetchData();
    }
  }, [])

  async function onDelete(){
    
    if(idMovie){

      try {
        
        await instance.delete(`movie/${idMovie}`)

      } catch (error) {
        console.error("Erro ao deletar o filme:", error);
      }
    }

    return activatingMenu(undefined, Menu.LISTAR);
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
