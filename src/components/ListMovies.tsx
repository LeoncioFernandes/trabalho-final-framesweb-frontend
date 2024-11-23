import { Menu } from "../enums/MenuEnum";
import { ListMoviesProps } from "../types/ListMoviesPropsProps";
import { useEffect, useState } from "react";
import instance from "../hooks/instanceApi";
import { Movie } from "../types/MovieTypes";
import CardMovie from "./CardMovie";
import Loading from "./Loading";
import ErrorApiMessage from "./ErrorApiMessage";
import { IoCloseOutline } from "react-icons/io5";

export default function ListMovies({activatingMenu}: ListMoviesProps) {

  const [movies, setMovies] = useState<Movie[]>();
  const [error, setError] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  function onClick(id: number, menu: Menu){
    activatingMenu(id, menu)
  }

  const fetchData = async () => {

    setMovies(undefined)

    try {

      if(!search){
        const result = await instance.get('movies');
        setMovies(result.data.movies);
      }else{
        const result = await instance.get(`movies/${search}`);
        setMovies(result.data.movies);
      }
      
    } catch (error) {
      console.log(error);
      setError(true);
    }
    
  }

  useEffect(() => {
    fetchData();
  }, [search])

  return (
    <div className="flex flex-col gap-4 justify-center items-center p-4 overflow-x-auto">
      <h1 className="font-bold text-3xl px-4">Listagem de Filmes</h1>
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
      
      {(!movies && !error) && (
        <Loading />
      )}
      {error && (
        <ErrorApiMessage />
      )}
      {movies && movies.length === 0 ? (
        !search ? (
          <p className="text-lg p-4">Não existem filmes cadastrados!</p>
        ) : (
          <p className="text-lg p-4">Filme "{search}" não encontrado!</p>
        )
      ) : (
        <div className="flex flex-col gap-6">
          {movies && movies.map((movie) => (
            <CardMovie
              key={movie.id}
              id={movie.id}
              urlImage={movie.urlImage}
              title={movie.title}
              description={movie.description}
              actor={movie.actor}
              genre={movie.genre}
              ageGroup={movie.ageGroup}
              duration={movie.duration}
              releaseYear={movie.releaseYear}
              score={movie.score}
              onClick={onClick}
            />
          ))}
        </div>
      )}
    </div>
  )
}
