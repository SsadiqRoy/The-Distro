import styled from "styled-components";
import { FormInput, InputLabel, StyledButton, StyledButtonPrimary, StyledButtonPrimaryMini, StyledSpinner, StyledSpinnerFullPage } from "./elements";
import { ImSpinner9 } from "react-icons/im";
import { useResponsive } from "../context/Responsive";

const StyledFormGroup = styled.div`
  width: 100%;
  margin: 1rem auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export function FormGroup({ error = "", label = "", id = "", type = "text", textAlign = null, ...rest }) {
  return (
    <StyledFormGroup>
      <InputLabel htmlFor={id}>
        {label} <span>{error}</span>
      </InputLabel>
      <FormInput id={id} type={type} $textAlign={textAlign} {...rest} />
    </StyledFormGroup>
  );
}

export function FormGroupFree({ children }) {
  return <StyledFormGroup>{children}</StyledFormGroup>;
}

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

export function Button({ children, data, onClick, disabled = false, $color = "blue", $outlined = false, $shape = "round", $size = "normal" }) {
  return (
    <StyledButton onClick={onClick} disabled={disabled} $color={$color} $outlined={$outlined} $shape={$shape} $size={$size}>
      {children} {data}
    </StyledButton>
  );
}

export function ButtonPrimaryMini({ children, data, onClick, disabled = false }) {
  const { isDarkMode } = useResponsive();

  return (
    <StyledButtonPrimaryMini onClick={onClick} $darkMode={isDarkMode} disabled={disabled}>
      {children}
      {data}
    </StyledButtonPrimaryMini>
  );
}

export function ButtonPrimary({ children, data, disabled = false, onClick }) {
  const { isDarkMode } = useResponsive();

  return (
    <StyledButtonPrimary onClick={onClick} $darkMode={isDarkMode} disabled={disabled}>
      {children}
      {data}
    </StyledButtonPrimary>
  );
}
