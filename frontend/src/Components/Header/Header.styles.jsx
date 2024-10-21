import styled from "styled-components";


export const Wrapper = styled.div`
    width:100%;
    background:#fff;
`

export const Content = styled.div`
    width:1280px;
    margin:0 auto;
    padding:10px 0;
`

export const Grid = styled.div`
    display: grid;
    grid-template-columns: auto auto;
    justify-content: space-between;
    padding: 15px 0;
    .logout{
        background: transparent;
        border: 0;
        font-weight: 500;
        font-size: 16px;
        cursor: pointer;
        color: #000000a1;
    }

`