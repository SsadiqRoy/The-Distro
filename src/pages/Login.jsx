import styled from "styled-components";
import { ButtonPrimary } from "../components/elements";
import { FormGroup } from "../components/elementComponents";
import { NavLink } from "react-router-dom";

const Cover = styled.div`
  width: 100%;
  max-width: 1300px;
  height: 100vh;
  height: 100dvh;
  margin-inline: auto;
  padding-block: 2rem;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--cl-bg-light);
  padding: 2rem 3rem;
  border-radius: var(--radius-normal);

  position: relative;

  display: grid;
  align-items: center;
`;

const Content = styled.div`
  width: 90%;
  max-width: 900px;
  padding: 2rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);
  height: 90%;
  margin: 0 auto;
  overflow: auto;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid var(--cl-border);
    margin-bottom: 4rem;
    flex-shrink: 0;
  }
`;

const StyledForm = styled.form`
  width: 100%;
  max-width: 500px;

  display: flex;
  flex-direction: column;
  gap: 1rem;

  button {
    margin-top: 2rem;
  }
`;

function Login() {
  return (
    <Cover>
      <Container>
        <Content>
          <NavLink to="/" className="logo">
            <img src="/images/distro-logo.svg" alt="The Distro Logo" />
          </NavLink>

          <StyledForm>
            <div className="center-element">
              <h1>Log In</h1>
            </div>
            <FormGroup lable="email" id="email" type="email" />
            <FormGroup lable="password" id="password" type="password" />
            <FormGroup lable="" id="file" type="file" />

            <NavLink to="/profile">
              <ButtonPrimary type="button">Log In</ButtonPrimary>
            </NavLink>
          </StyledForm>
        </Content>
      </Container>
    </Cover>
  );
}

export default Login;
