import React from "react";
import { InputWrapper, InputLabel, StyledInput, ErrorBlock } from "./style";
interface IInputProps {
	title?: string;
	  placeholder?: string;
	  value: string;
	  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	  type?: string;
	  error?: string;
	  valid?: boolean;
}

const Input = (props: IInputProps) => {
	  const { title, placeholder, value, handleChange, type, error, valid } = props;
	  return (
		    <InputWrapper>
			      <InputLabel>{title}</InputLabel>
			      <StyledInput
				        type={type}
				        value={value}
				        onChange={handleChange}
				        placeholder={placeholder}
				        			      />
			    <ErrorBlock>{error ? error : ""}</ErrorBlock>
		    </InputWrapper>
	  );
}

export default Input;
