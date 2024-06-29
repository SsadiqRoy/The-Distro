import styled from "styled-components";
import { FormInput, InputLabel } from "./elements";

const StyledFormGroup = styled.div`
  width: 100%;
  margin: 1rem auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export function FormGroup({ lable = "", id = "", type = "text", textAlign = null }) {
  return (
    <StyledFormGroup>
      <InputLabel htmlFor={id}>{lable}</InputLabel>
      <FormInput id={id} type={type} $textAlign={textAlign} />
    </StyledFormGroup>
  );
}
