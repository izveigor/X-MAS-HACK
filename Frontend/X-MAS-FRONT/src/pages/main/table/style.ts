import styled from "styled-components";

const TableLine = styled.div`
  padding: 8px 16px;
  font-weight: 500;
  font-size: 14px;
  height: auto;
  align-content: center;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 128px 72px 128px 64px 24px;
  grid-gap: 8px;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  transition: ${props => props.theme.transition.transition};

  :hover {
    background-color: ${props => props.theme.colors.blue};
  }
 
 @media (max-width: 768px) {
     padding: 16px 16px;
     display: flex;
     flex-direction: column;
     align-items: start;
     justify-content: center;
     gap: 8px;
 }
    
    //last-child
    :nth-child(4) {
      align-self: center;
    }
  }
 `;


const InfoText = styled.p`
    display: none;
 
     @media (max-width: 768px) {
      display: block;
      font-size: 14px;
      color: ${({theme}) => theme.colors.technical};
      text-align: center;
         font-weight: 600;
      margin: 0;
      padding: 0;
     }
    `;

const TableItem = styled.div`
    display: flex;  
    gap: 8px;
    align-items: center;
    justify-content: start;
    
    `

export {TableLine,InfoText, TableItem}
