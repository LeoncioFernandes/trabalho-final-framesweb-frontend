import { useState } from "react"
import Header from "./components/Header"
import { Menu } from "./enums/MenuEnum"
import ListMovies from "./components/ListMovies"
import FormAddEditMovie from "./components/FormAddEditMovie"
import RemoveMovie from "./components/RemoveMovie"

function App() {

  const [activeMenu, setActiveMenu] = useState<Menu>(Menu.LISTAR)
  const [idMovie, setIdMovie] = useState<number | undefined>(undefined)

  function activatingMenu(id: number | undefined, menu: Menu){
    setActiveMenu(menu)
    setIdMovie(id)
  }
  
  return (
    <>
      <Header
        activeInicialMenu={activeMenu}
        idMovie={idMovie}
        activatingMenu={activatingMenu}
      />

      {activeMenu === Menu.LISTAR && (
        <ListMovies activatingMenu={activatingMenu} />
      )}

      {activeMenu === Menu.INSERIR && (
        <FormAddEditMovie
          activatingMenu={activatingMenu}
          idMovie={idMovie}
        />
      )}

      {activeMenu === Menu.ALTERAR && (
        <FormAddEditMovie
          activatingMenu={activatingMenu}
          idMovie={idMovie}
        />
      )}

      {activeMenu === Menu.REMOVER && (
        <RemoveMovie
          activatingMenu={activatingMenu}
          idMovie={idMovie}
        />
      )}
    </>
  )
}

export default App
