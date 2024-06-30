// import '../src/styles/style.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Suspense, lazy } from "react";

import GlobalStyle from "./styles/globalStyles";
import PageNotFound from "./pages/PageNotFound";
import { SpinnerFullPage } from "./components/elementComponents";

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

      <Suspense fallback={<SpinnerFullPage />}>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />

          <BrowserRouter>
            <Routes>
              <Route element={<ClientLayout />}>
                <Route index element={<Navigate to="store" replace />} />
                <Route path="store" element={<Store />} />
                <Route path="supplier" element={<Supplier />} />
              </Route>

              <Route element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="purchases" element={<Purchases />} />
                <Route path="supplies" element={<Supplies />} />
                <Route path="supplies/:filter" element={<Supplies />} />
                <Route path="Products" element={<Products />} />
                <Route path="profile" element={<Profile />} />
              </Route>

              <Route path="login" element={<Login />} />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Suspense>
    </>
  );
}

export default App;
