import styled, { css } from 'styled-components';

export const ButtonPrimary = styled.button`
  width: 100%;
  padding: 1rem 2rem;
  text-align: center;
  text-transform: capitalize;
  border-radius: var(--radius-normal);
  font-family: var(--font-black);
  font-size: 1.6rem;
  outline: none;
  border: none;

  color: var(--cl-primary);
  background-color: var(--cl-secondary);

  @media (prefers-color-scheme: dark) {
    color: var(--cl-primary);
    background-color: var(--cl-bg-light);
  }
`;

export const ButtonPrimaryDark = styled.button`
  width: 100%;
  max-width: 35rem;
  padding: 1rem 2rem;
  text-align: center;
  text-transform: capitalize;
  border-radius: var(--radius-normal);
  font-family: var(--font-bold);
  font-size: 1.6rem;
  outline: none;
  border: none;

  color: var(--cl-primary);
  background-color: var(--cl-secondary);
`;

export const ButtonPrimaryMini = styled.button`
  padding-inline: 2px;
  text-align: center;
  text-transform: capitalize;
  border-radius: var(--radius-small);
  outline: none;
  border: none;
  font-family: var(--font-black);
  font-size: 1.6rem;
  font-weight: bolder;
  cursor: pointer;
  text-align: center;

  color: var(--cl-primary);
  background-color: var(--cl-secondary);

  @media (prefers-color-scheme: dark) {
    color: var(--cl-secondary);
    background-color: var(--cl-primary);
  }
`;

//

const buttonStyles = {
  solid: {
    blue: css`
      background-color: var(--cl-blue);
      color: var(--cl-white);
      border: none;
    `,
    danger: css`
      background-color: var(--cl-danger);
      color: var(--cl-white);
      border: none;
    `,
    green: css`
      background-color: var(--cl-green);
      color: var(--cl-white);
      border: none;
    `,
  },
  outlined: {
    blue: css`
      background-color: transparent;
      border: 2px solid var(--cl-blue);
      color: var(--cl-blue);
    `,
    danger: css`
      background-color: transparent;
      border: 2px solid var(--cl-danger);
      color: var(--cl-danger);
    `,
    green: css`
      background-color: transparent;
      border: 2px solid var(--cl-green);
      color: var(--cl-green);
    `,
  },
};
export const Button = styled.button`
  padding: 1rem 2rem;
  width: 100%;
  max-width: 35rem;
  font-family: var(--font-bold);

  ${(props) => (props.outlined ? buttonStyles.outlined[props.color] : buttonStyles.solid[props.color])}
  ${(props) => (props.shape === 'round' ? 'border-radius: 100px;' : 'border-radius: var(--radius-normal);')}
`;

//

Button.defaultProps = { color: 'blue', outlined: false, shape: 'round' };

export const FormInput = styled.input`
  width: 100%;
  border-radius: var(--radius-normal);
  padding: 1rem 1rem;
  font-size: 1.6rem;
  font-family: var(--font-regular);
  border: 3px solid var(--cl-bg);
  background-color: transparent;
  outline: none;
  color: var(--cl-txt);

  @media (prefers-color-scheme: dark) {
    border-color: var(--cl-bg-light);
  }
`;

export const InputLabel = styled.label`
  width: max-content;
  font-family: var(--font-semibold);
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  display: block;
`;
