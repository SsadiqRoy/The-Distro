import { FaRegMoon } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuLogIn, LuSun } from "react-icons/lu";
import { SiDatabricks } from "react-icons/si";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useResponsive } from "../context/Responsive";
import { TbLayoutDashboard } from "react-icons/tb";
import { getCurrentPage } from "../utilities/utilities";

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

  .header-left {
    display: flex;
    align-items: center;
    gap: 2rem;

    img {
      transform: scale(0.5);
    }
  }
`;

function ClientHeader() {
  const { isDarkMode, toggleDarkMode } = useResponsive();
  const navigate = useNavigate();

  const currentPage = getCurrentPage();

  const colorThemeIcon = isDarkMode ? (
    <LuSun title="Light Mode" onClick={toggleDarkMode} />
  ) : (
    <FaRegMoon title="Dark Mode" onClick={toggleDarkMode} />
  );

  return (
    <StyledHeader>
      <div className="header-left">
        <NavLink to="/">
          <img src="../../public/images/logo-no-name.svg" alt="The Distro Logo" />
        </NavLink>
        <div className="header-icons">
          {currentPage !== "store" && (
            <NavLink to="/store">
              <HiOutlineBuildingStorefront title="Store" />
            </NavLink>
          )}

          {currentPage !== "supplier" && (
            <NavLink to="/supplier">
              <SiDatabricks title="Supplier" />
            </NavLink>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="header-icons">
          <TbLayoutDashboard title="Dashboard" onClick={() => navigate("/dashboard")} />
          {/* <NavLink to="/dashboard"></NavLink> */}

          {colorThemeIcon}

          <LuLogIn title="Login" onClick={() => navigate("/login")} />
          {/* <NavLink to="/login"></NavLink> */}
        </div>
      </div>
    </StyledHeader>
  );
}

export default ClientHeader;
