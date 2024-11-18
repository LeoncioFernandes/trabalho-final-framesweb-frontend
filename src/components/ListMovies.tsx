import { Menu } from "../enums/MenuEnum";
import { ListMoviesProps } from "../types/ListMoviesPropsProps";
import { useEffect, useState } from "react";
import instance from "../hooks/instanceApi";
import { Movie } from "../types/MovieTypes";
import CardMovie from "./CardMovie";
import Loading from "./Loading";
import ErrorApiMessage from "./ErrorApiMessage";

export default function ListMovies({activatingMenu}: ListMoviesProps) {

  const [movies, setMovies] = useState<Movie[]>();
  const [error, setError] = useState<boolean>(false)

  function onClick(id: number, menu: Menu){
    activatingMenu(id, menu)
  }

  const fetchData = async () => {

    try {

      const result = await instance.get('movies');
      setMovies(result.data.movies);
      
    } catch (error) {
      console.log(error);
      setError(true);
    }
    
  }

  useEffect(() => {
    fetchData();
  }, [])

  return (
    <div className="flex flex-col justify-center items-center p-4 overflow-x-auto">
      <h1 className="font-bold text-3xl px-4 pb-4">Listagem de Filmes</h1>
      {(!movies && !error) && (
        <Loading />
      )}
      {error && (
        <ErrorApiMessage />
      )}
      {movies && movies.length === 0 ? (
        <p className="text-lg p-4">Não existem filmes cadastrados!</p>
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
