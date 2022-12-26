import styled from "styled-components";

interface IStatusDot {
	status: string;
}

const StatusDot = styled.span<IStatusDot>`
  display: inline-block;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background-color: ${(props) => props.status === 'Готово' ? props.theme.colors.success : props.theme.colors.wait};
`

const StatusContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

export {
	StatusDot,
	StatusContainer
};
