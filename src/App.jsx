import { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { EditarCliente } from "./pages/EditarCliente";
import { Inicio } from "./pages/Inicio";
import { NuevoCliente } from "./pages/NuevoCliente";
import { VerCliente } from "./pages/VerCliente";

export const App = () => {
  console.log(import.meta.env.VITE_SOME_KEY);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to='/clientes/nuevo' />} />
        <Route path="/clientes" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="nuevo" element={<NuevoCliente />} />
          <Route path="editar/:id" element={<EditarCliente />} />
          <Route path=":id" element={<VerCliente />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
