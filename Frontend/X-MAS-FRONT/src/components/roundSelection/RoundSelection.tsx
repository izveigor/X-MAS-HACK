import React from "react";
import styled from "styled-components";
import closeSvg from "../../assets/images/close.svg";

interface IRoundSelected {
	title: string;
	onClick: () => void;
}

const RoundSelection = (props: IRoundSelected) => {
	return (
		<Container>
			<Title>{props.title}</Title>
			<Icon src={closeSvg} alt='close' onClick={props.onClick}/>
		</Container>
	);
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 3px 9px;
  gap: 2px;
  background-color: ${(props) => props.theme.colors.support};
  border-radius: 25px;
`

const Title = styled.p`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: ${(props) => props.theme.colors.accent};
`

const Icon = styled.img`
  width: 18px;
  height: 18px;
`


export default RoundSelection;
