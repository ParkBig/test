import axios from "axios";
import { Provider } from "react-redux";
import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import store from "./store/configureStore";

const GlobalStyle = createGlobalStyle`
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, menu, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed,
    figure, figcaption, footer, header, hgroup,
    main, menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
      font: inherit;
    }

    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
        display: block;
    }
    
    *[hidden] {
        display: none;
    }
    body {
        line-height: 1;
    }
    menu, ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    * {
        box-sizing: border-box;
    }
    body {
        font-family: 'Spoqa Han Sans Neo';
    }
    a {
        text-decoration:none;
        color: inherit;
    }
`;
function App() {
  axios.get("https://api.adviceslip.com/advice").then( 
    res => console.log(`hello it's fun. Right? \ni got sentence for you. \n${res.data.slip.advice}`)
  )
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Outlet />
    </Provider>
  );
}

export default App;
