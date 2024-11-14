import { Menu } from "../enums/MenuEnum";

export type FormAddEditMovieProps = {
  idMovie: number | undefined
  activatingMenu: (id: number | undefined, menu: Menu) => void;
}