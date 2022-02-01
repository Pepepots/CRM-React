import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./layout/Layout"
import { EditarCliente } from "./pages/EditarCliente"
import { Inicio } from "./pages/Inicio"
import { NuevoCliente } from "./pages/NuevoCliente"

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/clientes' element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path='nuevo' element={<NuevoCliente />} />
          <Route path='editar/:id' element={<EditarCliente />}/>
        </Route>
      </Routes>
    </BrowserRouter>    
  )
};
