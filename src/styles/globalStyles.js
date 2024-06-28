import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  
  @font-face {
  font-family: 'mulish light';
  src: url(/fonts/Mulish-Light.ttf);
}
@font-face {
  font-family: 'mulish regular';
  src: url(/fonts/Mulish-Regular.ttf);
}

@font-face {
  font-family: 'mulish medium';
  src: url(/fonts/Mulish-Medium.ttf);
}

@font-face {
  font-family: 'mulish semibold';
  src: url(/fonts/Mulish-SemiBold.ttf);
}

@font-face {
  font-family: 'mulish bold';
  src: url(/fonts/Mulish-Bold.ttf);
}

@font-face {
  font-family: 'mulish black';
  src: url(/fonts/Mulish-Black.ttf);
}

:root {
  --font-light: 'mulish light';
  --font-regular: 'mulish regular';
  --font-medium: 'mulish medium';
  --font-semibold: 'mulish semibold';
  --font-bold: 'mulish bold';
  --font-black: 'mulish black';
  
  --radius-large: 15px;
  --radius-small: 5px;
  --radius-normal: 10px;

  --cl-primary: #f1be06;
  --cl-primary-light: #fcd535;
  --cl-secondary: #1E2329;
  --cl-secondary-light: #48525E;
  --cl-white: #FFFFFF;
  
  --cl-danger: #DF3F2A;
  --cl-blue: #2E8BF9;
  --cl-green: #0ACC29;

  --cl-product-1: #9E77ED;
  --cl-product-2: #F79009;
  --cl-product-3: #EE46BC;
  --cl-product-4: #F63D68;
  --cl-product-5: #6172F3;

  --cl-txt:#1E2329;
  --cl-bg: #E6ECF3;
  --cl-bg-light: #F6FAFF;
  --cl-bg-white: #FFFFFF;
  
  @media(prefers-color-scheme: dark){
    --cl-txt:#E3E3E3;
    --cl-bg: #1E2329;
    --cl-bg-light: #48525E;
    --cl-bg-white: #1E2329;
  }
}

*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*::-webkit-scrollbar {
  width: 20px;
}
*::-webkit-scrollbar-track {
  background-color: var(--cl-bg);
}
*::-webkit-scrollbar-thumb {
  background-color: var(--cl-bg-light);
  border-radius: 100px;
  border: 4px solid var(--cl-bg);
}

html {
  font-size: 10px;
  font-family: var(--font-regular);

  @media (max-width: 64em) {
    font-size: 56.25%;
  }

  @media (max-width: 37.5em) {
    font-size: 50%;
  }
}



body {
  font-size: 1.6rem;
  background-color: var(--cl-bg);

  color: var(--cl-txt);
}

button{
  cursor: pointer;
  text-transform: capitalize;

  

  &:hover{
    opacity: .9;
    transition: background .1s linear;
  }

  &:focus {
    outline: 2px solid var(--cl-primary);
    outline-offset: 1px;
  }

  &:disabled{
    cursor: not-allowed;
    opacity: .4;
  }
}

img{
  width: 100%;
  object-fit: cover;
  object-position: center;
}

.center-element{
  text-align: center;
}

`;

export default GlobalStyle;