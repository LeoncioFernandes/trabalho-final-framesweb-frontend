import { Menu } from "../enums/MenuEnum";

export type RemoveMovieProps = {
  idMovie: number | undefined
  activatingMenu: (id: number | undefined, menu: Menu) => void;
}