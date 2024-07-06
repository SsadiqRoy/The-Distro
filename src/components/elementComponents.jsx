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

export function Button({ children, data, $color = "blue", $outlined = false, $shape = "round", $size = "normal", ...rest }) {
  return (
    <StyledButton {...rest} $color={$color} $outlined={$outlined} $shape={$shape} $size={$size}>
      {children} {data}
    </StyledButton>
  );
}

export function ButtonPrimaryMini({ children, data, ...rest }) {
  const { isDarkMode } = useResponsive();

  return (
    <StyledButtonPrimaryMini $darkMode={isDarkMode} {...rest}>
      {children}
      {data}
    </StyledButtonPrimaryMini>
  );
}

export function ButtonPrimary({ children, data, ...rest }) {
  const { isDarkMode } = useResponsive();

  return (
    <StyledButtonPrimary $darkMode={isDarkMode} {...rest}>
      {children}
      {data}
    </StyledButtonPrimary>
  );
}

export function DisplayAltMessage({ message }) {
  const style = { width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", textTransform: "capitalize" };
  return <div style={style}>{message}</div>;
}
