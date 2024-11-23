import { Menu } from "../enums/MenuEnum";
import { ListMoviesProps } from "../types/ListMoviesPropsProps";
import { useEffect, useState } from "react";
import instance from "../hooks/instanceApi";
import { Movie } from "../types/MovieTypes";
import CardMovie from "./CardMovie";
import Loading from "./Loading";
import ErrorApiMessage from "./ErrorApiMessage";
import SearchInput from "./SearchInput";

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
    
      <SearchInput search={search} setSearch={setSearch} />
      
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
