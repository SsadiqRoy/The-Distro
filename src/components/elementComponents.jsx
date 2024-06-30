import styled from "styled-components";
import { FormInput, InputLabel } from "./elements";
import { ImSpinner9 } from "react-icons/im";

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

const StyledSpinnerFullPage = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--cl-bg);
`;

const StyledSpinner = styled.div`
  background-color: transparent;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    animation: loading 1s linear infinite;
    color: #f1be06;
    font-size: 4rem;
  }

  @keyframes loading {
    to {
      transform: rotate(1turn);
    }
  }
`;
export function Spinner() {
  return (
    <StyledSpinner>
      <ImSpinner9 />
    </StyledSpinner>
  );
}

export function SpinnerFullPage() {
  return (
    <StyledSpinnerFullPage>
      <Spinner />
    </StyledSpinnerFullPage>
  );
}
