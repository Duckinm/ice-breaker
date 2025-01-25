import '@/index.css';
import { Outlet } from 'ice';

export default function RootLayout() {
  return (
    <div className="h-screen w-screen">
      <Outlet />
    </div>
  );
}
