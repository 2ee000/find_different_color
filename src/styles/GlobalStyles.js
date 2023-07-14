import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
    // 적용시킬 css 입력
    a{
        text-decoration: none;
    }
    *{
        box-sizing: border-box;
        flex-shrink: 0;
    }
    * { // 드래그 방지
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-use-select: none;
        user-select: none;
    }
    html { // 스크롤
        overflow-y: overlay;
        overflow-x: hidden;
        &::-webkit-scrollbar {
            display: none;
        }
    }
    html, body, div, span, h1, h2, h3, h4, h5, h6, p, 
    a, dl, dt, dd, ol, ul, li, form, label, table{
        margin: 0;
        padding: 0;
        border: 0;
        vertical-align: baseline;
    }
    body{
        font-family: 'Gugi', cursive;
        background-color: #FFFFFF;
    }
    button {
        border: 0;
        font-family: 'Gugi', cursive;
        background: transparent;
        cursor: pointer;
    }
`;

export default GlobalStyles;