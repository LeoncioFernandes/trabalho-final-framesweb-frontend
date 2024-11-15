import { useEffect, useState } from "react"
import { Menu } from "../enums/MenuEnum";
import { HeaderProps } from "../types/HeaderPropsTypes";

export default function Header({activeInicialMenu, idMovie, activatingMenu}: HeaderProps) {

  const menus = Object.values(Menu) as Menu[]
  const inicialMenu: Menu = activeInicialMenu

  const [activeButtonMenu, setActiveButtonMenu] = useState<Menu>(inicialMenu);

  function menuActive(menu: Menu){

    setActiveButtonMenu(menu)

    if(menu === Menu.LISTAR || menu === Menu.INSERIR){
      activatingMenu(undefined, menu)
    }else{
      activatingMenu(idMovie, menu)
    }

  }

  useEffect(() => {

    menuActive(inicialMenu)

  },[activeInicialMenu])

  return (
    <header className="w-full px-4 py-6 bg-primiry text-white rounded-b-2xl">
      <nav className="relative flex justify-center items-center flex-row">
        <div className="absolute left-0">
          <img src="/vite.svg" alt="" />
        </div>
        <ul className="flex flex-row gap-6 text-2xl">
          {menus.map((menu, index) => (
            <li
              key={index}
              className={
                `${activeButtonMenu === menu ? 
                  "text-secondary" 
                : 
                  `${(menu !== Menu.ALTERAR && menu !== Menu.REMOVER) &&
                    "hover:text-variation1"}`
                  } transition`
                }
            >
              {(menu === Menu.ALTERAR || menu === Menu.REMOVER) ? (
                <div>{menu}</div>
              ) : (
                <button onClick={() => menuActive(menu)}>{menu}</button>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
