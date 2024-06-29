// import '../src/styles/style.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import DashboardLayout from "./layouts/DashboardLayout";
import ClientLayout from "./layouts/ClientLayout";
import GlobalStyle from "./styles/globalStyles";
import Dashboard from "./pages/Dashboard";
import Purchases from "./pages/Purchases";
import Products from "./pages/Products";
import Supplies from "./pages/Supplies";
import Supplier from "./pages/Supplier";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Store from "./pages/Store";

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 1 } },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyle />

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
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
