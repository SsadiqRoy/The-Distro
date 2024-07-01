import { FaRegMoon } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuLogIn, LuSun } from "react-icons/lu";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { SiDatabricks } from "react-icons/si";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useResponsive } from "../context/Responsive";

const StyledHeader = styled.header`
  width: 100%;
  padding: 1rem 2rem;
  background-color: var(--cl-bg-white);
  border-radius: var(--radius-normal);

  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-icons {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 2.5rem;

    > * {
      cursor: pointer;
    }

    a {
      text-decoration: none;
      color: inherit;
    }
  }

  .menu {
    display: none;

    @media (max-width: 68.75em) {
      display: initial;
    }
  }

  .header-left {
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      transform: scale(0.5);
    }
  }
`;

function DashboardHeading() {
  const { isDarkMode, toggleDarkMode, setOpenSidebar } = useResponsive();

  //

  const colorThemeIcon = isDarkMode ? (
    <LuSun title="Light Mode" onClick={toggleDarkMode} />
  ) : (
    <FaRegMoon title="Dark Mode" onClick={toggleDarkMode} />
  );

  return (
    <StyledHeader>
      <div className="header-left">
        <div className="header-icons">
          <div className="menu" onClick={() => setOpenSidebar(true)}>
            <RiMenuUnfold3Line />
          </div>
          <NavLink to="/store">
            <HiOutlineBuildingStorefront title="Store" />
          </NavLink>

          <NavLink to="/supplier">
            <SiDatabricks title="Supplier" />
          </NavLink>
        </div>
      </div>

      <div className="header-right">
        <div className="header-icons">
          {colorThemeIcon}

          <NavLink to="/login">
            <LuLogIn title="Login" />
          </NavLink>
        </div>
      </div>
    </StyledHeader>
  );
}

export default DashboardHeading;
