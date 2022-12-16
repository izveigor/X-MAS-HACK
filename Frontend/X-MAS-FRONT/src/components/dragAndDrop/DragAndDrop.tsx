import React from "react";
import styled from "styled-components";
import Button from "../ui/button/Button";


export const DragAndDrop = () => {
	const [files, setFiles] = React.useState<File[]>([]);
	const [drag, setDrag] = React.useState(false);
	const [dragCounter, setDragCounter] = React.useState(0);
	const fileInputRef = React.useRef<HTMLInputElement>(null);
	const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragCounter(dragCounter + 1);
		if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
			setDrag(true);
		}
	}
	const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDragCounter(dragCounter - 1);
		if (dragCounter > 0) return;
		setDrag(false);
	}
	const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
	}
	const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		e.stopPropagation();
		setDrag(false);
		if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
			handleFiles(e.dataTransfer.files);
			e.dataTransfer.clearData();
			setDragCounter(0);
		}
	}
	const handleFiles = (files: FileList) => {
		for (let i = 0; i < files.length; i++) {
			console.log(files[i]);
			setFiles([...files]);
		}
	}
	const openFileDialog = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	}
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			handleFiles(e.target.files);
		}
	}

	return (
		<DragAndDropZone>
			<p>Перетащите сюда документы <br/>или</p>
			<input onDrop={onDrop} onDragOver={onDragOver} onDragEnter={onDragEnter} onDragLeave={onDragLeave}
			       ref={fileInputRef} type='file' multiple={true}
			       style={{display: 'none', height: '100%', width: '100%'}} onChange={onChange}/>
			<Button main={false} onClick={openFileDialog}>Выберите файл</Button>
			{files.length > 0 && <p>Выбрано файлов: {files.length}</p>
			}
			{drag && <p>Перетащите файлы</p>}
			{files.map((file, index) => <p key={index}>{file.name}</p>)}
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
  height: 164px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  box-sizing: border-box;
  text-align: center;

  p {
    font-weight: 500;
    font-size: 14px;
  }
`
