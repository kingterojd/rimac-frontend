import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;600&display=swap');

  /* Estilos para pantallas grandes (por defecto) */
  body {
    font-family: 'Lato', sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }

  header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 20px;
    background-color: #f8f8f8;
  }

  main {
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 1200px; /* Ampliar el tamaño máximo del contenedor */
    padding: 20px;
  }

  .family-image {
    max-width: 100%;
    border-radius: 10px;
  }

  footer {
    text-align: center;
    padding: 20px;
    background-color: #f8f8f8;
    width: 100%;
  }

  /* Estilos responsive solo para dispositivos móviles */
  @media (max-width: 768px) {
    .container {
      max-width: 100%;
      padding: 10px;
    }

    h1 {
      font-size: 1.3rem;  /* Reducir el tamaño del título en móviles */
    }

    p {
      font-size: 0.9rem;  /* Reducir el tamaño del texto en móviles */
    }

    .family-image {
      max-width: 100%;  /* Ajustar imagen para ocupar todo el ancho en móviles */
    }

    .rimac-logo {
      height: 30px;  /* Reducción del logo en móviles */
    }

    .rimac-logo-footer {
      width: 100px;  /* Reducción del logo en el footer */
    }

    footer {
      padding: 10px; /* Reducir el padding del footer en móviles */
    }
  }
`;

export default GlobalStyle;
