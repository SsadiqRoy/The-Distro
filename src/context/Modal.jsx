import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { cloneElement, createContext, useContext, useState } from "react";

const StyledWindow = styled.div`
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  backdrop-filter: blur(2px);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  left: 0;
  top: 0;
  z-index: 20;

  .modal-cover {
    width: 700px;
    max-width: 90%;
    max-height: 90%;
    background-color: var(--cl-bg-light);
    padding: 2rem;
    border-radius: var(--radius-normal);
    box-shadow: 0 0 5px 2px #00000040;
  }

  .modal-container {
    border-radius: var(--radius-normal);
    background-color: var(--cl-bg-white);
    padding: 2rem;

    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .modal-heading {
    display: flex;
    align-items: center;
    gap: 1rem;
    text-transform: capitalize;

    h3 {
      flex-grow: 1;
    }
    span {
      display: none;
      color: var(--cl-danger);
      font-size: 2rem;
      font-weight: bolder;
      cursor: pointer;
    }
  }

  .modal-content {
    max-height: 60vh;
    overflow-y: auto;
    padding-inline: 4px;
  }

  .modal-footer {
  }
`;

/*









*/

const ModalContext = createContext();

//

function Modal({ children }) {
  const [openId, setOpenId] = useState("");

  const open = setOpenId;
  const close = () => setOpenId("");
  const value = { openId, open, close };

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>;
}

//

function Open({ children, openId }) {
  const { open } = useContext(ModalContext);

  return cloneElement(children, { onClick: () => open(openId) });
}

//
function Window({ children, title, id }) {
  const { openId, close } = useContext(ModalContext);

  const clickOutside = function (e) {
    const cover = e.target.closest(".modal-cover");
    !cover && close();
  };

  if (id !== openId) return;

  const modal = (
    <StyledWindow onClick={clickOutside}>
      <div className="modal-cover">
        <div className="modal-container">
          <div className="modal-heading">
            <h3 className="center-element">{title}</h3>

            <span onClick={close}>
              <HiXMark />
            </span>
          </div>

          {children}
        </div>
      </div>
    </StyledWindow>
  );

  return createPortal(modal, document.body);
}

//
function Content({ children }) {
  return <div className="modal-content">{children}</div>;
}

//
function Footer({ children }) {
  return <div className="modal-footer">{children}</div>;
}

//
Modal.Open = Open;
Modal.Window = Window;
Modal.Content = Content;
Modal.Footer = Footer;

export default Modal;
