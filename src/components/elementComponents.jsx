import styled from 'styled-components';
import { FormInput, InputLabel } from './elements';

const StyledFormGroup = styled.div`
  width: 100%;
  margin: 4rem auto;

  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  input[type='file'] {
    padding-block: 0;
    padding-left: 0;

    &::-webkit-file-upload-button {
      outline: none;
      border: none;
      background-color: var(--cl-bg);
      font-family: var(--font-semibold);
      padding: 1rem 2rem;
      margin-right: 2rem;

      @media (prefers-color-scheme: dark) {
        background-color: var(--cl-bg-light);
      }
    }
  }
`;

export function FormGroup({ lable = '', id = '', type = 'text' }) {
  return (
    <StyledFormGroup>
      <InputLabel htmlFor={id}>{lable}</InputLabel>
      <FormInput id={id} type={type} />
    </StyledFormGroup>
  );
}
