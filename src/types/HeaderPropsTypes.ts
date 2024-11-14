import { Menu } from "../enums/MenuEnum";

export type HeaderProps = {
  activeInicialMenu: Menu
  idMovie: number | undefined
  activatingMenu: (id: number | undefined, menu: Menu) => void;
}