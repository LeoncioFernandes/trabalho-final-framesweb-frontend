import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAddEditMovieProps } from "../types/FormAddEditMoviePropsTypes";
import { Menu } from "../enums/MenuEnum";
import { movies } from "../data/Movies";

const schema = z.object({
  title: z.string().min(1, {message: "Titulo obrigatório."}),
  actor: z.string().min(1, {message: "Ator obrigatório."}),
  ageGroup: z.string().min(1, {message: "Faixa etária obrigatória."}),
  genre: z.string().min(1, {message: "Gênero obrigatório."})
})

type FormMovieProps = z.infer<typeof schema>;

export default function FormAddEditMovie({idMovie, activatingMenu}: FormAddEditMovieProps) {

  const movieById = movies.find((movie) => movie.id === idMovie)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormMovieProps>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: movieById?.title,
      ageGroup: movieById?.ageGroup,
      actor: movieById?.actor,
      genre: movieById?.genre
    }
  })

  const onSubmit = (data: FormMovieProps) => {

    if(idMovie){

      movies.map((movie) => {
        if(movie.id === idMovie){
          movie.title = data.title;
          movie.ageGroup = data.ageGroup;
          movie.actor = data.actor;
          movie.genre = data.genre;
          return
        }
        return
      })

    }else{

      const newId: number = movies.length === 0 ? 1 : movies[movies.length - 1].id + 1;

      movies.push({
        id: newId,
        title: data.title,
        ageGroup: data.ageGroup,
        actor: data.actor,
        genre: data.genre
      })
      
    }

    return activatingMenu(undefined, Menu.LISTAR)

  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl px-4 pb-4">{idMovie === undefined ? "Cadastrar Filme" : "Editar Filme"}</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 w-full max-w-5xl"
      >
        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite um Título"
            className="border border-primiry rounded-lg px-2 py-3 text-xl"
            {...register("title")}
          />
          {errors.title && (
            <span className="text-sm text-red-700">
              {errors.title.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite uma Faixa Etária"
            className="border border-primiry rounded-lg px-2 py-3 text-xl"
            {...register("ageGroup")}
          />
          {errors.ageGroup && (
            <span className="text-sm text-red-700">
              {errors.ageGroup.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite um Ator"
            className="border border-primiry rounded-lg px-2 py-3 text-xl"
            {...register("actor")}
          />
          {errors.actor && (
            <span className="text-sm text-red-700">
              {errors.actor.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-col">
          <input
            type="text"
            placeholder="Digite um Gênero"
            className="border border-primiry rounded-lg px-2 py-3 text-xl"
            {...register("genre")}
          />
          {errors.genre && (
            <span className="text-sm text-red-700">
              {errors.genre.message?.toString()}
            </span>
          )}
        </div>

        <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4">
          <button
            type="button"
            onClick={() => activatingMenu(undefined, Menu.LISTAR)}
            className='w-full text-primiry text-lg font-medium border-2 border-primiry rounded-md p-3 transition hover:bg-red-500 hover:text-white'
          >
            Cancelar
          </button>
          <button
            type="submit"
            className='w-full text-variation2 text-lg font-medium bg-primiry rounded-md p-3 transition hover:bg-secondary'
          >
            Salvar
          </button>
        </div>

      </form>
      
    </div>
  )
}