import styled from "styled-components";

export const Container = styled.span`
    font-size:14px;
    margin-right:6px;
    padding: 5px 14px;
    border-radius:5px;
    cursor: pointer;
    color: ${({theme})=> theme.COLORS.BACKGROUND_900};
    background-color: ${({theme})=> theme.COLORS.ORANGE};

`