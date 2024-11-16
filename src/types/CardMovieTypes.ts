import { Menu } from "../enums/MenuEnum"

export type CardMovieProps = {
  id: number,
  urlImage: string,
  title: string,
  description: string
  actor: string,
  genre: string,
  ageGroup: string,
  duration: string,
  releaseYear: string,
  score: string,
  onClick: (id: number, menu: Menu) => void
}