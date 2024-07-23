import styled from "styled-components";
import GlobalStyle from "../styles/globalStyles";
import { Button } from "../components/elementComponents";

const StyledError = styled.div`
  width: 100%;
  height: 100vh;
  height: 100dvh;
  background-color: var(--cl-bg-light);
  padding: 3rem;

  display: grid;
  justify-items: center;
  align-content: center;
`;
const ErrorBox = styled.div`
  width: 100%;
  max-width: 800px;
  padding: 3rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3rem;

  font-size: 2rem;
`;

function Error({ error, resetErrorBoundary }) {
  return (
    <>
      <GlobalStyle />
      <StyledError>
        <ErrorBox>
          <h2>Sorry! Something went wrong</h2>
          <p>{error.message || error._message || error.originalMessage}</p>
          <Button data="Back to dashboard" onClick={resetErrorBoundary} $shape="square" />
        </ErrorBox>
      </StyledError>
    </>
  );
}

export default Error;
