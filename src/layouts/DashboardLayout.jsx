import { Outlet } from 'react-router-dom';
import DashboardHeading from './DashboardHeading';

function DashboardLayout() {
  return (
    <div>
      <DashboardHeading />

      <main>
        Dashboard Layout
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
