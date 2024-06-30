import { BsCart4 } from "react-icons/bs";
import { FaTimes } from "react-icons/fa";
import { FaCubesStacked } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { PiNotepadBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useResponsive } from "../context/Responsive";

const StyledSidebar = styled.aside`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  transition: all 0.5s ease;

  @media (max-width: 68.75em) {
    max-width: 25rem;
    position: absolute;
    z-index: 15;
    left: 0;
    top: 0;
    border: 3px solid var(--cl-bg-light);
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    transform: translateX(${(p) => (p.$isOpen ? "0" : "-100%")});
  }

  .sidebar-top {
    margin-top: 2rem;

    @media (max-width: 68.75em) {
      margin-top: 1rem;
    }

    &-close {
      display: none;
      padding-right: 1rem;

      > span {
        cursor: pointer;
      }

      @media (max-width: 68.75em) {
        display: flex;
        justify-content: end;
        align-items: center;
        font-size: 2rem;
      }
    }

    &-logo {
      text-align: center;
      margin-bottom: 4rem;

      a {
        width: 10rem;
        height: 10rem;
        border-radius: 50%;
        overflow: hidden;
        border: 3px solid var(--cl-border);
        display: inline-block;
      }
    }

    ul {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      li a {
        width: 100%;
        border: 2px solid var(--cl-border);
        border-radius: var(--radius-small);
        padding: 1.2rem 1rem;

        display: flex;
        gap: 1rem;
        font-size: 2.5rem;
        font-weight: bold;

        span {
          font-size: 1.8rem;
        }
      }
    }
  }

  .sidebar-bottom {
    border: 3px solid var(--cl-border);
    border-radius: var(--radius-small);
    padding: 1rem;

    display: flex;
    align-items: center;
    gap: 1rem;

    &-image {
      width: 5rem;
      height: 5rem;
      border-radius: 50%;
      overflow: hidden;

      img {
        height: 100%;
      }
    }

    p {
      opacity: 0.7;
    }
  }

  a.active,
  ul li a.active {
    background-color: var(--cl-bg);

    @media (prefers-color-scheme: dark) {
      background-color: var(--cl-bg-light);
    }
  }
`;

function DashboarSidebar() {
  const { isOpenSidebar, setOpenSidebar } = useResponsive();

  const closeSidebar = () => setOpenSidebar(false);

  return (
    <StyledSidebar $isOpen={isOpenSidebar}>
      <div className="sidebar-top">
        <div className="sidebar-top-close">
          <span onClick={closeSidebar}>
            <FaTimes />
          </span>
        </div>
        <div className="sidebar-top-logo">
          <NavLink to="/" onClick={closeSidebar}>
            <img src="/images/distro-logo.svg" alt="The Distro Logo" />
          </NavLink>
        </div>
        <div className="sidebar-pages">
          <ul>
            <li>
              <NavLink to="/dashboard" onClick={closeSidebar}>
                <HiOutlineHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchases" onClick={closeSidebar}>
                <BsCart4 />
                <span>Purchases</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/supplies" onClick={closeSidebar}>
                <PiNotepadBold />
                <span>Supplies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={closeSidebar}>
                <FaCubesStacked />
                <span>Products</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <NavLink to="/profile" className="sidebar-bottom" onClick={closeSidebar}>
        <div className="sidebar-bottom-image">
          <img src="/images/profile-image.jpg" alt="The Distro Logo" />
        </div>
        <div className="sidebar-bottom-detail">
          <strong>Mercy Asafua</strong>
          <p>Administrator</p>
        </div>
      </NavLink>
    </StyledSidebar>
  );
}

export default DashboarSidebar;
