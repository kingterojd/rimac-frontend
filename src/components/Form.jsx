import React from 'react';
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Form.css'; // Importamos el archivo de estilos

const validationSchema = Yup.object({
  documentType: Yup.string().required('Debe seleccionar un tipo de documento'),
  dni: Yup.string()
    .when('documentType', {
      is: 'DNI',
      then: Yup.string()
        .matches(/^\d{8}$/, 'Debe ser un DNI válido (8 dígitos)')
        .required('Campo obligatorio'),
      otherwise: Yup.string().notRequired(),
    }),
  phone: Yup.string()
    .matches(/^\d{9}$/, 'Debe ser un número de celular válido (9 dígitos)')
    .required('Campo obligatorio'),
  privacyPolicy: Yup.boolean().oneOf([true], 'Debe aceptar la política de privacidad'),
  commercialPolicy: Yup.boolean().oneOf([true], 'Debe aceptar la política comercial'),
});

const Form = () => {
  const navigate = useNavigate();

  return (
    <Formik
      initialValues={{
        documentType: 'DNI',
        dni: '',
        phone: '',
        privacyPolicy: false,
        commercialPolicy: false,
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        console.log(values);
        try {
          const response = await axios.get(
            'https://rimac-front-end-challenge.netlify.app/api/user.json'
          );
          localStorage.setItem('formData', JSON.stringify(values));
          localStorage.setItem('apiData', JSON.stringify(response.data));
          navigate('/results');
        } catch (error) {
          console.error('Error fetching API data', error);
        }
      }}
    >
      {({ isValid, dirty, setFieldValue }) => (
        <FormikForm className="form-container">
          <h2 className="form-title">Creado para ti y tu familia</h2>
          <p className="form-description">
            Tú eliges cuánto pagar. Ingresa tus datos, cotiza y recibe nuestra asesoría. 100% online.
          </p>
          
          <div className="form-group">
            <Field
              as="select"
              name="documentType"
              className="form-select"
              onChange={(e) => setFieldValue("documentType", e.target.value)}
            >
              <option value="DNI">DNI</option>
              <option value="CE">Carnet de Extranjería</option>
            </Field>

            <Field
              name="dni"
              type="text"
              placeholder="30201647"
              className="form-input"
            />
          </div>
            <ErrorMessage name="documentType" component="div" className="error-message" />
            <ErrorMessage name="dni" component="div" className="error-message" />

          <div className="form-group mt-20">
            <Field name="phone" type="text" placeholder="513021647" className="form-input" />
          </div>
          <ErrorMessage name="phone" component="div" className="error-message" />

          <div className="checkbox-group mt-20 ">
            <label>
              <Field type="checkbox" name="privacyPolicy" className="form-checkbox" />
              Acepto la Política de Privacidad
            </label>
          </div>

          <div className="checkbox-group">
            <label>
              <Field type="checkbox" name="commercialPolicy" className="form-checkbox" />
              Acepto la Política de Comunicaciones Comerciales
            </label>
          </div>

          <button type="submit" disabled={!(dirty && isValid)} className="form-button">
            Cotiza aquí
          </button>
        </FormikForm>
      )}
    </Formik>
  );
};

export default Form;
