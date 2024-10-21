import styled from "styled-components";

export const Wrapper = styled.div`
    max-width:1280px;
    margin:0 auto;
    padding: 0 0;
`
export const TitleHeader = styled.div`
    display:flex;
    justify-content: space-between;
`
export const Text = styled.h1`
    font-size: 22px;
    padding: 35px 0 15px 0;
}
`
export const Table = styled.table`
    border-collapse: collapse;
    text-align: center;
    width: 100%;
    background: #fff;
`

export const TableRow = styled.tr`
    display: table-row;
    vertical-align: middle;
    unicode-bidi: isolate;
    border-color: inherit;
`

export const TableHead = styled.th`
    background-color: #555555;
    border: 1px solid #6d6d6d;
    padding: 8px;
    color: #fff;
    padding-bottom: 12px;
    padding-top: 12px;
    font-size: 13px;
    font-weight: 600;
`
export const TableData = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
    font-size: 12px;
    font-weight: 600;
`