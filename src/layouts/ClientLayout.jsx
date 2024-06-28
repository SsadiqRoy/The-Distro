import { Outlet } from 'react-router-dom';
import ClientHeader from './ClientHeader';
import styled from 'styled-components';

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

  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function ClientLayout() {
  return (
    <Cover>
      <Container>
        <ClientHeader />

        <Outlet />
      </Container>
    </Cover>
  );
}

export default ClientLayout;
