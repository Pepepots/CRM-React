import { Field, Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { Alerta } from "./Alerta";

export const Formulario = ({ cliente }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, "El nombre es muy corto")
            .required("El Nombre del Cliente es Obligatorio"),
        empresa: Yup.string().required("El Nombre de la empresa es Obligatorio"),
        email: Yup.string()
            .email("Email no valido")
            .required("El email es Obligatorio"),
        telefono: Yup.number()
            .positive("Numero no valido")
            .integer("Numero no valido")
            .typeError("El numero no es valido"),
        // notas: ''
    });

    const handleSubmit = async (values) => {
        try {
            if (cliente.id) {
                const url = `${import.meta.env.VITE_API_URL}/${cliente.id}`;

                const respuesta = await fetch(url, {
                    method: "PUT",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                await respuesta.json();;
            } else {
                const url = import.meta.env.VITE_API_URL;

                const respuesta = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                await respuesta.json();
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                {cliente.id ? "Editar Cliente" : "Agregar Cliente"}
            </h1>

            <Formik
                initialValues={cliente}
                enableReinitialize={true}
                onSubmit={async (values, { resetForm }) => {
                    await handleSubmit(values);

                    resetForm();
                    navigate("/clientes");
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => (
                    <Form className="mt-10">
                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="nombre">
                                Nombre:
                            </label>
                            <Field
                                id="nombre"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre del Cliente"
                                name="nombre"
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>{errors.nombre}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="empresa">
                                Empresa:
                            </label>
                            <Field
                                id="empresa"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Nombre de la Empresa"
                                name="empresa"
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>{errors.empresa}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="email">
                                E-mail:
                            </label>
                            <Field
                                id="email"
                                type="email"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Email del Cliente"
                                name="email"
                            />
                            {errors.email && touched.email ? (
                                <Alerta>{errors.email}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="telefono">
                                Telefono:
                            </label>
                            <Field
                                id="telefono"
                                type="number"
                                className="mt-2 block w-full p-3 bg-gray-50"
                                placeholder="Telefono del Cliente"
                                name="telefono"
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>{errors.telefono}</Alerta>
                            ) : null}
                        </div>

                        <div className="mb-4">
                            <label className="text-gray-800" htmlFor="notas">
                                Notas:
                            </label>
                            <Field
                                as="textarea"
                                id="notas"
                                type="text"
                                className="mt-2 block w-full p-3 bg-gray-50 min-h-[50px]"
                                placeholder="Notas del Cliente"
                                name="notas"
                            />
                            {errors.notas && touched.notas ? (
                                <Alerta>{errors.notas}</Alerta>
                            ) : null}
                        </div>

                        <input
                            type="submit"
                            value={cliente.id ? "Editar Cliente" : "Agregar Cliente"}
                            className="mt-5 w-full bg-blue-700  p-3 text-white uppercase font-bold text-lg hover:bg-blue-800 cursor-pointer"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};

Formulario.defaultProps = {
    cliente: {
        nombre: "",
        empresa: "",
        email: "",
        telefono: "",
        notas: "",
    },
};
