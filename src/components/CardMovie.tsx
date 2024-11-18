import { GrEdit, GrTrash } from "react-icons/gr"
import { Menu } from "../enums/MenuEnum"
import { CardMovieProps } from "../types/CardMovieTypes";

export default function CardMovie({id, urlImage, title, description, actor, genre, ageGroup, duration, releaseYear, score, onClick}: CardMovieProps){

  const num = Number(score.replace(",", "."))

  const stars: number[] = [];

  for (let i = 0; i < 5; i++) {
    const rest = num - i;
    if(rest >= 1){
      stars.push(100)
    }else if(rest > 0 && rest < 1){
      const ini = rest * 100;
      stars.push(ini)
    }else{
      stars.push(0)
    }   
  }

  return(
    <div
      className="flex flex-col min-[900px]:flex-row items-stretch gap-4 bg-variation2 rounded-xl p-4 drop-shadow-xl"
    >
      <img
        src={urlImage}
        alt={`imagem capa do filme ${title}`}
        className="self-center rounded-xl w-full h-fit max-w-60 drop-shadow-lg"
      />
      <div className="flex flex-col justify-between gap-6 w-full max-w-4xl">

        <div className="flex flex-col gap-2">
          <p className="font-bold text-2xl text-center min-[900px]:text-left">{title}</p>
          <p>{description}</p>
          <div className="flex flex-col gap-3">
            
            <div className="flex gap-1">
              <span className="font-bold">Atores:</span>
              <p>{actor}</p>
            </div>
            
            <div className="flex flex-col min-[900px]:flex-row gap-3 justify-between">
              <div className="flex gap-1">
                <span className="font-bold">Gênero:</span>
                <p>{genre}</p>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Faixa Etária:</span>
                <p>{ageGroup}</p>
              </div>
              <div className="flex gap-1">
                <span className="font-bold">Duração:</span>
                <p>{duration}</p>
              </div>
                <div className="flex gap-1">
                <span className="font-bold">Lançamento:</span>
                <p>{releaseYear}</p>
              </div>
  
            </div>

            <div className="flex gap-1 items-center">
              <p className="font-bold">Pontuação:</p>
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div 
                    key={index}
                    className="text-4xl"
                    style={{
                      background: stars[index] === 100 ? "#360259" : stars[index] === 0 ? "#FFFFFF" : `linear-gradient(90deg, #360259 ${stars[index]}%, #FFFFFF 0%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent"
                    }}
                  >
                    &#9733;
                  </div>
                ))}
              </div>
            </div>
            
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => onClick(id, Menu.ALTERAR)}
            className="flex grow p-2.5 rounded-2xl justify-center bg-primiry text-white hover:bg-secondary transition active:bg-variation1 drop-shadow-xl"
          >
            <GrEdit className="w-8 h-8" />
          </button>
          <button
            onClick={() => onClick(id, Menu.REMOVER)}
            className="flex grow p-2.5 rounded-2xl justify-center bg-red-500 text-white hover:bg-red-800 transition active:bg-red-900 drop-shadow-xl"
          >
            <GrTrash className="w-8 h-8"/>
          </button>
        </div>

      </div>
    </div>         
  )
}