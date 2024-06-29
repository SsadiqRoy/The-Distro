import { BsCart4 } from "react-icons/bs";
import { FaCubesStacked } from "react-icons/fa6";
import { HiOutlineHome } from "react-icons/hi2";
import { PiNotepadBold } from "react-icons/pi";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const StyledSidebar = styled.aside`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .sidebar-top {
    margin-top: 2rem;

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
  return (
    <StyledSidebar>
      <div className="sidebar-top">
        <div className="sidebar-top-logo">
          <NavLink to="/">
            <img src="/images/distro-logo.svg" alt="The Distro Logo" />
          </NavLink>
        </div>
        <div className="sidebar-pages">
          <ul>
            <li>
              <NavLink to="/dashboard">
                <HiOutlineHome />
                <span>Home</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/purchases">
                <BsCart4 />
                <span>Purchases</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/supplies">
                <PiNotepadBold />
                <span>Supplies</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/products">
                <FaCubesStacked />
                <span>Products</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <NavLink to="/profile" className="sidebar-bottom">
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
