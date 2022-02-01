import { Field, Form, Formik } from "formik"
import * as Yup from 'yup'
import { Alerta } from "./Alerta";

export const Formulario = () => {

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
                    .min(3, 'El nombre es muy corto')
                    .required('El Nombre del Cliente es Obligatorio'),
        empresa: Yup.string()
                    .required('El Nombre de la empresa es Obligatorio'),
        email: Yup.string()
                    .email('Email no valido')
                    .required('El email es Obligatorio'),
        telefono: Yup.number()
                    .positive('Numero no valido')
                    .integer('Numero no valido')
                    .typeError('El numero no es valido'),
        // notas: ''
    })

    const handleSubmit = async (values) => {
        try {
            const url = 'http://localhost:4000/clientes'

            const respuesta = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(values),
                headers:{
                    'Content-Type': 'application/json'
                }
            })

            const resultado = await respuesta.json()

            console.log(resultado)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto">
            <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
                Agregar Cliente
            </h1>

            <Formik
                initialValues={{
                    nombre: '',
                    empresa: '',
                    email: '',
                    telefono: '',
                    notas: ''
                }}
                onSubmit={values => {
                    handleSubmit(values)
                }}
                validationSchema={nuevoClienteSchema}
            >
                {({ errors, touched }) => (
                    <Form
                        className="mt-10"
                    >
                        <div
                            className="mb-4"
                        >
                            <label
                                className="text-gray-800"
                                htmlFor="nombre"
                            >
                                Nombre:
                            </label>
                            <Field
                                id="nombre"
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre del Cliente'
                                name='nombre'
                            />
                            {errors.nombre && touched.nombre ? (
                                <Alerta>
                                    {errors.nombre}
                                </Alerta>
                            ) : null }

                        </div>

                        <div
                            className="mb-4"
                        >
                            <label
                                className="text-gray-800"
                                htmlFor="empresa"
                            >
                                Empresa:
                            </label>
                            <Field
                                id="empresa"
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Nombre de la Empresa'
                                name='empresa'
                            />
                            {errors.empresa && touched.empresa ? (
                                <Alerta>
                                    {errors.empresa}
                                </Alerta>
                            ) : null }
                        </div>

                        <div
                            className="mb-4"
                        >
                            <label
                                className="text-gray-800"
                                htmlFor="email"
                            >
                                E-mail:
                            </label>
                            <Field
                                id="email"
                                type='email'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Email del Cliente'
                                name='email'
                            />
                            {errors.email && touched.email ? (
                                <Alerta>
                                    {errors.email}
                                </Alerta>
                            ) : null }
                        </div>

                        <div
                            className="mb-4"
                        >
                            <label
                                className="text-gray-800"
                                htmlFor="telefono"
                            >
                                Telefono:
                            </label>
                            <Field
                                id="telefono"
                                type='number'
                                className='mt-2 block w-full p-3 bg-gray-50'
                                placeholder='Telefono del Cliente'
                                name='telefono'
                            />
                            {errors.telefono && touched.telefono ? (
                                <Alerta>
                                    {errors.telefono}
                                </Alerta>
                            ) : null }
                        </div>

                        <div
                            className="mb-4"
                        >
                            <label
                                className="text-gray-800"
                                htmlFor="notas"
                            >
                                Notas:
                            </label>
                            <Field
                                as='textarea'
                                id="notas"
                                type='text'
                                className='mt-2 block w-full p-3 bg-gray-50 min-h-[50px]'
                                placeholder='Notas del Cliente'
                                name='notas'
                            />
                            {errors.notas && touched.notas ? (
                                <Alerta>
                                    {errors.notas}
                                </Alerta>
                            ) : null }
                        </div>

                        <input
                            type="submit"
                            value='Agregar Cliente'
                            className="mt-5 w-full bg-blue-800  p-3 text-white uppercase font-bold text-lg hover:bg-blue-300"
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
};
