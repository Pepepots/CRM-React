import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Formulario } from "../components/Formulario";
import { Spinner } from "../components/Spinner";

export const EditarCliente = () => {
    const [cliente, setCliente] = useState({});
    const [cargando, setCargando] = useState(false);

    const { id } = useParams();

    useEffect(() => {
        setCargando(!cargando);
        const consultarCliente = async () => {
            try {
                const url = `http://192.168.100.231:4000/clientes/${id}`;

                const respuesta = await fetch(url);

                const resultado = await respuesta.json();

                setCliente(resultado);
            } catch (error) {
                console.log(error);
            }
            setCargando(false);
        };

        consultarCliente();
    }, []);

    return (
        <>
            {cargando ? (
                <Spinner />
            ) : (
                <>
                    <h1 className="font-black text-4xl text-blue-900">Editar Cliente</h1>
                    <p className="mt-3">
                        Utiliza este formulario para editar datos del cliente{" "}
                    </p>

                    {
                        cliente.id ? (
                            <Formulario cliente={cliente} />
                        ) :
                        (
                            <p>Cliente ID no valido</p>
                        )
                    }
                </>
            )}
        </>
    );
};
