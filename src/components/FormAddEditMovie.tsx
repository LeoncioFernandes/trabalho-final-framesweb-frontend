import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormAddEditMovieProps } from "../types/FormAddEditMoviePropsTypes";
import { Menu } from "../enums/MenuEnum";
import instance from "../hooks/instanceApi";
import { useEffect, useState } from "react";
import { Movie } from "../types/MovieTypes";
import { toast } from "react-toastify";
import Loading from "./Loading";
import ErrorApiMessage from "./ErrorApiMessage";

const schema = z.object({
  urlImage: z
    .string()
    .min(1, {message: "Imagem obrigatória."}),
  title: z
    .string()
    .min(1, {message: "Titulo obrigatório."})
    .max(50, {message: "O título não pode ter mais de 50 caracteres."}),
  actor: z
    .string()
    .min(1, {message: "Ator obrigatório."})
    .max(300, {message: "O campo não pode ter mais de 300 caracteres."}),
  ageGroup: z
    .string()
    .min(1, {message: "Faixa etária obrigatória."})
    .max(20, {message: "O campo não pode ter mais de 20 caracteres."}),
  genre: z
    .string()
    .min(1, {message: "Gênero obrigatório."})
    .max(100, {message: "O campo não pode ter mais de 100 caracteres."}),
  duration: z
    .string()
    .min(1, {message: "Duração obrigatória."})
    .max(10, {message: "O campo não pode ter mais de 10 caracteres."}),
  score: z
    .string()
    .min(1, {message: "Pontuação obrigatória."})
    .max(10, {message: "O campo não pode ter mais de 10 caracteres."})
    .refine((data) => {
      const number = Number(data.replace(",", "."));
      return number >= 0 && number <= 5;
    }, {message: "A pontuação deve ser entre 0 e 5."}),
  description: z
    .string()
    .min(1, {message: "Descrição obrigatória."}),
  releaseYear: z
    .string()
    .min(1, {message: "Ano de lançamento obrigatório."})
    .max(10, {message: "O campo não pode ter mais de 10 caracteres."}),
})

type FormMovieProps = z.infer<typeof schema>;

export default function FormAddEditMovie({idMovie, activatingMenu}: FormAddEditMovieProps) {

  const [movieById, setMovieById] = useState<Movie>();
  const [error, setError] = useState<boolean>(false)

  const fetchData = async () => {

    try {

      const result = await instance.get(`movies/${idMovie}`);
      setMovieById(result.data.movie);
      
    } catch (error) {
      console.log(error);
      setError(true);
    }
    
  }

  useEffect(() => {
    if(idMovie){
      fetchData();
    }
  }, [])

  useEffect(() => {
    if (movieById) {
      reset({
        urlImage: movieById.urlImage,
        title: movieById.title,
        ageGroup: movieById.ageGroup,
        actor: movieById.actor,
        genre: movieById.genre,
        duration: movieById.duration,
        score: movieById.score,
        description: movieById.description,
        releaseYear: movieById.releaseYear
      });
    }
  }, [movieById]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormMovieProps>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormMovieProps) => {

    if(idMovie){

      try {

        await instance.put(`movie/${idMovie}`, data)

        toast.success("Filme atualizado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          progressStyle: {
            background: '#8D5EF2'
          },
          style: {
            background: '#E9ECF2', 
            color: '#000000'
          }
        });
        
      } catch (error) {
        console.error("Erro ao atualizar o filme:", error);
        toast.error("Ocorreu um erro ao tentar atualizar o filme.");
      }


    } else {

      try {

        await instance.post(`movie`, data)

        toast.success("Filme adicionado com sucesso!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          progressStyle: {
            background: '#8D5EF2'
          },
          style: {
            background: '#E9ECF2', 
            color: '#000000'
          }
        });
        
      } catch (error) {
        console.error("Erro ao cadastrar o filme:", error);
        toast.error("Ocorreu um erro ao tentar adicionar o filme.");
      }
      
    }

    return activatingMenu(undefined, Menu.LISTAR)

  }

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="font-bold text-3xl px-4 pb-4">{idMovie === undefined ? "Cadastrar Filme" : "Editar Filme"}</h1>
      {error && (
        <ErrorApiMessage />
      )}
      {(idMovie && !error && !movieById) ? (
        <Loading />
      ) : (
        !error && (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 w-full max-w-5xl"
          >
            <div className="relative flex flex-col">
              <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Título do Filme</label>
              <input
                type="text"
                placeholder="Digite um Título"
                className="border border-primiry rounded-lg px-4 py-3 text-lg"
                {...register("title")}
              />
              {errors.title && (
                <span className="text-sm text-red-700 text-right">
                  {errors.title.message?.toString()}
                </span>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Descrição</label>
              <textarea
                placeholder="Digite uma descrição do filme"
                className="border min-h-60 border-primiry rounded-lg px-4 py-3 text-lg"
                {...register("description")}
              />
              {errors.description && (
                <span className="text-sm text-red-700 text-right">
                  {errors.description.message?.toString()}
                </span>
              )}
            </div>

            <div className="relative flex flex-col">
              <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Atores</label>
              <input
                type="text"
                placeholder="Digite pelo menos um ator"
                className="border border-primiry rounded-lg px-4 py-3 text-lg"
                {...register("actor")}
              />
              {errors.actor && (
                <span className="text-sm text-red-700 text-right">
                  {errors.actor.message?.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">

              <div className="relative flex flex-col grow">
                <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Gênero</label>
                <input
                  type="text"
                  placeholder="Digite pelo menos um Gênero"
                  className="border border-primiry rounded-lg px-4 py-3 text-lg"
                  {...register("genre")}
                />
                {errors.genre && (
                  <span className="text-sm text-red-700 text-right">
                    {errors.genre.message?.toString()}
                  </span>
                )}
              </div>

              <div className="relative flex flex-col">
                <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Faixa Etária</label>
                <input
                  type="text"
                  placeholder="Digite uma Faixa Etária"
                  className="border border-primiry rounded-lg px-4 py-3 text-lg"
                  {...register("ageGroup")}
                />
                {errors.ageGroup && (
                  <span className="text-sm text-red-700 text-right">
                    {errors.ageGroup.message?.toString()}
                  </span>
                )}
              </div>

            </div>

            <div className="flex flex-col md:flex-row gap-4">

              <div className="relative flex flex-col w-full">
                <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Duração</label>
                <input
                  type="text"
                  placeholder="Digite a duração do filme"
                  className="border border-primiry rounded-lg px-4 py-3 text-lg"
                  {...register("duration")}
                />
                {errors.duration && (
                  <span className="text-sm text-red-700 text-right">
                    {errors.duration.message?.toString()}
                  </span>
                )}
              </div>

              <div className="relative flex flex-col w-full">
                <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Pontuação do Filme</label>
                <input
                  type="text"
                  placeholder="Digite a pontuação do filme (entre 0 e 5)"
                  className="border border-primiry rounded-lg px-4 py-3 text-lg"
                  {...register("score")}
                />
                {errors.score && (
                  <span className="text-sm text-red-700 text-right">
                    {errors.score.message?.toString()}
                  </span>
                )}
              </div>

              <div className="relative flex flex-col w-full">
                <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Ano de lançamento</label>
                <input
                  type="text"
                  placeholder="Digite o ano de lançamento do filme"
                  className="border border-primiry rounded-lg px-4 py-3 text-lg"
                  {...register("releaseYear")}
                />
                {errors.releaseYear && (
                  <span className="text-sm text-red-700 text-right">
                    {errors.releaseYear.message?.toString()}
                  </span>
                )}
              </div>


            </div>

            <div className="relative flex flex-col">
              <label className="absolute bg-white font-opensansCondensed font-semibold px-2 -top-1 left-2 leading-[8px]">Link da Imagem</label>
              <input
                type="text"
                placeholder="Digite o link da imagem"
                className="border border-primiry rounded-lg px-4 py-3 text-lg"
                {...register("urlImage")}
              />
              {errors.urlImage && (
                <span className="text-sm text-red-700 text-right">
                  {errors.urlImage.message?.toString()}
                </span>
              )}
            </div>

            <div className="flex flex-row flex-wrap sm:flex-nowrap gap-4">
              <button
                type="button"
                onClick={() => activatingMenu(undefined, Menu.LISTAR)}
                className='w-full text-primiry text-lg font-medium border-2 border-primiry rounded-md p-3 transition hover:bg-red-500 hover:text-white drop-shadow-xl'
              >
                Cancelar
              </button>
              <button
                type="submit"
                className='w-full text-variation2 text-lg font-medium bg-primiry rounded-md p-3 transition hover:bg-secondary drop-shadow-xl'
              >
                Salvar
              </button>
            </div>

          </form>
        )
      )}
      
    </div>
  )
}