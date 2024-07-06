/* eslint-disable */

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";

import GlobalStyle from "./styles/globalStyles";
import PageNotFound from "./pages/PageNotFound";
import { SpinnerFullPage } from "./components/elementComponents";
import Responsive from "./context/Responsive";
import { Toaster } from "react-hot-toast";
import OnlyLoggedIn from "./context/OnlyLoggedIn";

const DashboardLayout = lazy(() => import("./layouts/DashboardLayout"));
const ClientLayout = lazy(() => import("./layouts/ClientLayout"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Purchases = lazy(() => import("./pages/Purchases"));
const Products = lazy(() => import("./pages/Products"));
const Supplies = lazy(() => import("./pages/Supplies"));
const Supplier = lazy(() => import("./pages/Supplier"));
const Profile = lazy(() => import("./pages/Profile"));
const Login = lazy(() => import("./pages/Login"));
const Store = lazy(() => import("./pages/Store"));

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1 } },
});

function App() {
  return (
    <>
      <GlobalStyle />
      <Toaster
        position="top-center"
        containerStyle={{ margin: "8px" }}
        gutter={12}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: "1.5rem",
            width: "max-content",
            maxWidth: "90%",
            backgroundColor: "var(--cl-bg)",
            color: "var(--cl-text)",
            padding: "1rem 1.3rem",
          },
        }}
      />

      <Suspense fallback={<SpinnerFullPage />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <Responsive>
            <BrowserRouter>
              <Routes>
                <Route element={<ClientLayout />}>
                  <Route index element={<Navigate to="store" replace />} />
                  <Route path="store" element={<Store />} />
                  <Route path="supplier" element={<Supplier />} />
                </Route>

                <Route element={<OnlyLoggedIn />}>
                  <Route element={<DashboardLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="purchases" element={<Purchases />} />
                    <Route path="supplies" element={<Supplies />} />
                    {/* <Route path="supplies/:filter" element={<Supplies />} /> */}
                    <Route path="Products" element={<Products />} />
                    <Route path="profile" element={<Profile />} />
                  </Route>
                </Route>

                <Route path="login" element={<Login />} />
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>
          </Responsive>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

export default App;
