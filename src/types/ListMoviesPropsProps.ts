import { Menu } from "../enums/MenuEnum";

export type ListMoviesProps = {
  activatingMenu: (id: number, menu: Menu) => void;
}