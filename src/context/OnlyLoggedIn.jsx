import { createContext, useContext, useEffect } from "react";
import { useGetAdmin } from "../hooks/adminHooks";
import { Outlet, useNavigate } from "react-router-dom";
import { SpinnerFullPage } from "../components/elementComponents";

const Context = createContext();

function OnlyLoggedIn({ children }) {
  const { isLoading, admin } = useGetAdmin();
  const navigator = useNavigate();

  useEffect(() => {
    if (!isLoading && !admin?.id) navigator("/login");
  }, [navigator, admin, isLoading]);

  if (isLoading || !admin) return <SpinnerFullPage />;

  const value = { isLoading, admin };

  return (
    <Context.Provider value={value}>
      {children}
      <Outlet />
    </Context.Provider>
  );
}

export function useAdminCtx() {
  const context = useContext(Context);
  if (!context) throw new Error("You are calling useAdminCtx outside OnlyLoggedIn context");

  return context;
}

export default OnlyLoggedIn;
