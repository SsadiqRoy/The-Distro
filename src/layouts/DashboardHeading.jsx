import { useEffect, useState } from "react";
import { FaRegMoon } from "react-icons/fa6";
import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { LuLogIn, LuSun } from "react-icons/lu";
import { SiDatabricks } from "react-icons/si";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

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

function DashboardHeading() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(dark);
  }, [setIsDarkMode]);

  //
  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (e) => setIsDarkMode(e.matches));
  }, [setIsDarkMode]);

  return (
    <StyledHeader>
      <div className="header-left">
        <div className="header-icons">
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
          {isDarkMode ? (
            <LuSun title="Light Mode" />
          ) : (
            <FaRegMoon title="Dark Mode" />
          )}

          <NavLink to="/login">
            <LuLogIn title="Login" />
          </NavLink>
        </div>
      </div>
    </StyledHeader>
  );
}

export default DashboardHeading;
