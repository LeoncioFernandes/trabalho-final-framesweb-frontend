// import { movies } from "../data/Movies"
import { Menu } from "../enums/MenuEnum";
import { GrEdit, GrTrash } from "react-icons/gr";
import { ListMoviesProps } from "../types/ListMoviesPropsProps";
import { useEffect, useState } from "react";
import instance from "../hooks/instanceApi";
import { Movie } from "../types/MovieTypes";

export default function ListMovies({activatingMenu}: ListMoviesProps) {

  const [movies, setMovies] = useState<Movie[]>();

  function onClick(id: number, menu: Menu){
    activatingMenu(id, menu)
  }

  const fetchData = async () => {
    const result = await instance.get('movies');

    setMovies(result.data.movies);
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center p-4 overflow-x-auto">
      <h1 className="font-bold text-3xl px-4 pb-4">Listagem de Filmes</h1>
      {movies && movies.length === 0 ? (
        <p className="text-lg p-4">Não existem filmes cadastrados!</p>
      ) : (
        <table className="w-full max-w-7xl border-collapse border-4 border-primiry">
          <thead>
            <tr>
              <th className="border-y-4 border-x border-primiry p-3">Título</th>
              <th className="border-y-4 border-x border-primiry p-3">Ator</th>
              <th className="border-y-4 border-x border-primiry p-3">Faixa Etária</th>
              <th className="border-y-4 border-x border-primiry p-3">Categoria</th>
              <th className="border-y-4 border-x border-primiry p-3 w-0">Operações</th>
            </tr>
          </thead>
          <tbody>
            {movies && movies.map((movie, index) => (
              <tr
                key={movie.id}
                className={`border ${index % 2 == 0 && "bg-variation2"}`}
              >
                <td className="border border-primiry p-3">{movie.title}</td>
                <td className="border border-primiry p-3">{movie.actor}</td>
                <td className="border border-primiry p-3">{movie.ageGroup}</td>
                <td className="border border-primiry p-3">{movie.genre}</td>
                <td className="border border-primiry p-3">
                  <div className="flex justify-center items-center gap-5">
                    <button
                      onClick={() => onClick(movie.id, Menu.ALTERAR)}
                      className="w-6 h-6 hover:text-variation1 transition active:text-secondary"
                    >
                      <GrEdit className="w-full h-full" />
                    </button>
                    <button
                      onClick={() => onClick(movie.id, Menu.REMOVER)}
                      className="w-6 h-6 hover:text-red-500 transition active:text-red-800"
                    >
                      <GrTrash className="w-full h-full"/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      
      
    </div>
  )
}
