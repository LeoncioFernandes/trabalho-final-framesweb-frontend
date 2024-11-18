import { useEffect, useState } from "react"
import { Menu } from "../enums/MenuEnum";
import { HeaderProps } from "../types/HeaderPropsTypes";

export default function Header({activeInicialMenu, idMovie, activatingMenu}: HeaderProps) {

  const menus = Object.values(Menu) as Menu[]
  
  const [activeButtonMenu, setActiveButtonMenu] = useState<Menu>(activeInicialMenu);

  function menuActive(menu: Menu){

    setActiveButtonMenu(menu)

    if(menu === Menu.LISTAR || menu === Menu.INSERIR){
      activatingMenu(undefined, menu)
    }else{
      activatingMenu(idMovie, menu)
    }

  }

  useEffect(() => {

    menuActive(activeInicialMenu)

  },[activeInicialMenu])

  return (
    <header className="w-full px-4 py-2 sm:py-12 bg-primiry text-white rounded-b-2xl">
      <nav className="relative flex justify-center items-center flex-col sm:flex-row">
        <div className="sm:absolute left-0">
          <img src="/images/LogoCinema.svg" alt="imagem" className="w-36" />
        </div>
        <ul className="flex flex-row gap-6 text-2xl pb-4 sm:pb-0">
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
