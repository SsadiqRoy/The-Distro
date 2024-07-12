import { HiOutlineBuildingStorefront } from "react-icons/hi2";
import { RiMenuUnfold3Line } from "react-icons/ri";
import { LuLogIn, LuSun } from "react-icons/lu";
import { fromSearchString, toSearchString } from "../utilities/utilities";
import { useResponsive } from "../context/Responsive";
import { SiDatabricks } from "react-icons/si";
import { FaRegMoon } from "react-icons/fa6";
import { useLogout } from "../hooks/adminHooks";
import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Spinner } from "../components/elementComponents";
import styled from "styled-components";
import { FaSortNumericDown, FaSortNumericUpAlt } from "react-icons/fa";

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

const StyledRangeInputs = styled.div`
  display: flex;
  gap: 1rem;

  input,
  button {
    background-color: transparent;
    border: 2px solid var(--cl-border);
    padding: 3px 5px;
    border-radius: var(--radius-small);
    color: var(--cl-text);
  }
`;

function DashboardHeading({ range = true, sort = true }) {
  const { isDarkMode, toggleDarkMode, setOpenSidebar } = useResponsive();
  const { logOut, logingOut } = useLogout();

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
          <RangeInputs range={range} sorting={sort} />
          {colorThemeIcon}
          {logingOut ? (
            <span style={{ width: "2rem", height: "2rem" }}>
              <Spinner />
            </span>
          ) : (
            <LuLogIn title="Login" onClick={logOut} />
          )}
        </div>
      </div>
    </StyledHeader>
  );
}

export default DashboardHeading;

/*




*/

function RangeInputs({ range, sorting }) {
  const navigator = useNavigate();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    let filter = window.location.search;

    if (sort) filter = filter ? `${filter}&sort=${sort}` : `?sort=${sort}`;
    if (from) filter = filter ? `${filter}&createdAt[gte]=${from}` : `?createdAt[gte]=${from}`;
    if (to) {
      let newTo = new Date(to).getTime() + 86400000;
      newTo = new Date(newTo).toISOString().split("T")[0];
      filter = filter ? `${filter}&createdAt[lte]=${newTo}` : `?createdAt[lte]=${newTo}`;
    }

    if (filter) {
      filter = fromSearchString(filter);
      filter = toSearchString(filter);

      const { pathname } = window.location;
      const url = pathname + filter;
      navigator(url);
    }
  }, [sort, from, to, navigator]);

  return (
    <StyledRangeInputs>
      {sorting && (
        <button>
          {!sort || sort === "-createdAt" ? (
            <FaSortNumericUpAlt onClick={() => setSort("createdAt")} />
          ) : (
            <FaSortNumericDown onClick={() => setSort("-createdAt")} />
          )}
        </button>
      )}
      {range && (
        <>
          <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
          <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
        </>
      )}
    </StyledRangeInputs>
  );
}
