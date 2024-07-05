import styled from "styled-components";
import { FormInput, InputLabel } from "../components/elements";
import { ButtonPrimary, FormGroupFree } from "../components/elementComponents";
import { NavLink } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/adminHooks";
import { validateEmail } from "../utilities/utilities";

const Cover = styled.div`
  width: 100%;
  max-width: 1400px;
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

  @media (max-width: 37.5em) {
    border-radius: 0;
    padding: 1rem;
  }
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

  @media (max-width: 37.5em) {
    width: 100%;
  }

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
  const defaultValues = { email: "ssadiqueroy@mailsac.com", password: "test1234" };

  const { register, handleSubmit, formState, reset } = useForm({ defaultValues });
  const { mutate, isPending } = useLogin();

  const { errors } = formState;

  function handleLogin({ email, password }) {
    mutate({ email, password });
    reset();
  }

  const registerEmail = register("email", { required: "enter your email", validate: validateEmail });
  const registerPassword = register("password", { required: "enter you password" });

  return (
    <Cover>
      <Container>
        <Content>
          <NavLink to="/" className="logo">
            <img src="/images/distro-logo.svg" alt="The Distro Logo" />
          </NavLink>

          <StyledForm onSubmit={handleSubmit(handleLogin)}>
            <div className="center-element">
              <h1>Log In</h1>
            </div>

            <FormGroupFree>
              <InputLabel htmlFor="email">
                email <span>{errors?.email?.message}</span>
              </InputLabel>
              <FormInput disabled={isPending} id="email" type="email" {...registerEmail} />
            </FormGroupFree>

            <FormGroupFree>
              <InputLabel htmlFor="password">
                password <span>{errors?.password?.message}</span>
              </InputLabel>
              <FormInput disabled={isPending} id="password" type="password" {...registerPassword} />
            </FormGroupFree>

            <ButtonPrimary type="submit" disabled={isPending}>
              Log In
            </ButtonPrimary>
          </StyledForm>
        </Content>
      </Container>
    </Cover>
  );
}

export default Login;
