import React from "react";
import styled from "styled-components";
import Button from "../ui/button/Button";


export const DragAndDrop = () => {
	return (
		<DragAndDropZone>
			<p>Перетащите сюда документы <br/>или</p>
			<Button main={false}>Выберите файлы</Button>
		</DragAndDropZone>
	)
}

				export default DragAndDrop;

const DragAndDropZone = styled.div`
  		margin-top: 24px;
	  width: 100%;
  		gap: 10px;
	  border: 3px dashed  #404040;
  	color: ${props => props.theme.colors.technical};
		border-radius: 24px;
		height: 200px;
  		display: flex;
  		justify-content: center;
  		align-items: center;
  		flex-direction: column;
  		box-sizing: border-box;
  		text-align: center;
  
  p{
      	font-weight: 500;
      	font-size: 14px;
  }
		`
