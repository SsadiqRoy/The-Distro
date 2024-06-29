import styled, { css } from "styled-components";

export const ButtonPrimary = styled.button`
  --cl-btn-bg: var(--cl-secondary);
  @media (prefers-color-scheme: dark) {
    --cl-btn-bg: var(--cl-bg-light);
  }

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
  background-color: var(--cl-btn-bg);

  &:focus {
    outline: 2px solid var(--cl-btn-bg);
    outline-offset: 2px;
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
  font-family: var(--font-bold);

  &:focus {
    outline: 2px solid var(--cl-${(props) => props.$color || "primary"});
    outline-offset: 2px;
  }

  ${(props) => (props.$outlined ? buttonStyles.outlined[props.$color] : buttonStyles.solid[props.$color])}
  ${(props) => (props.$shape === "round" ? "border-radius: 100px;" : "border-radius: var(--radius-normal);")}

  ${(props) =>
    props.$display === "flex" &&
    css`
      display: flex;
      align-items: center;
      gap: 0.5rem;

      span {
        font-size: 1.2em;
        display: flex;
        align-items: center;
      }
    `}

  ${(props) =>
    props.$size === "normal" &&
    css`
      width: 100%;
      max-width: 35rem;
    `}
  ${(props) =>
    props.$size === "small" &&
    css`
      width: max-content;
      padding: 0.5rem 1.2rem;
    `}
  ${(props) =>
    props.$size === "large" &&
    css`
      width: 100%;
      padding-block: 1.3rem;
      font-size: 1.8rem;
    `}
  ${(props) => props.$size === "small" && props.$shape !== "round" && "border-radius: var(--radius-small);"}
`;
Button.defaultProps = {
  $color: "blue",
  $outlined: false,
  $shape: "round",
  $size: "normal",
};

//

export const FormInput = styled.input`
  width: 100%;
  border-radius: var(--radius-normal);
  padding: 1rem 1rem;
  font-size: 1.6rem;
  font-family: var(--font-regular);
  border: 3px solid var(--cl-border);
  background-color: transparent;
  outline: none;
  color: var(--cl-txt);

  ${(props) => props.$textAlign && `text-align: ${props.$textAlign};`}

  &:focus {
    outline: 2px solid var(--cl-border);
    outline-offset: 2px;
  }

  &[type="file"] {
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

  &[type="color"] {
    padding: 0;
    border: 3px solid var(--cl-border);
    height: 4.5rem;
    background-color: transparent;
    border-radius: 5px;
  }

  &[type="number"]::-webkit-inner-spin-button {
    display: none;
  }
`;

export const InputLabel = styled.label`
  width: max-content;
  font-family: var(--font-semibold);
  text-transform: capitalize;
  margin-bottom: 0.5rem;
  display: block;
`;

export const ColoredText = styled.p`
  display: inline-block;
  ${(props) => `color: var(--cl-${props.$color || "secondary"})`}
`;
