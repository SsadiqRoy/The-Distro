import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ButtonPrimary } from "../components/elementComponents";

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

function PageNotFound() {
  return (
    <Cover>
      <Container>
        <Content>
          <NavLink to="/" className="logo">
            <img src="/images/distro-logo.svg" alt="The Distro Logo" />
          </NavLink>

          <div className="center-elemet">
            <h1 style={{ marginBottom: "3rem" }}>404 Page Not Found</h1>

            <ButtonPrimary>Get to app</ButtonPrimary>
          </div>
        </Content>
      </Container>
    </Cover>
  );
}

export default PageNotFound;
