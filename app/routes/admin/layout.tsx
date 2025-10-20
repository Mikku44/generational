import { Outlet } from 'react-router'
import AdminSideBar from '~/components/adminSideBar';
import { useAuthListener } from '~/lib/firebase/auth';
import type { Route } from './+types/dashboard';
import AdminMobileSidebar from '~/components/adminMobileSideBar';

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "ADMIN - GENERATIONAL" },
    { name: "description", content: "PURVEYOR OF THE MOST BEAUTIFUL, CULTURALLY SIGNIFICANT CLASSIC AUTOMOBILES IN THAILAND." },
  ];
}


export default function AdminLayout() {
  useAuthListener();
  return (
    <main className='grid grid-cols-5'>
      <AdminMobileSidebar />
      <AdminSideBar />
      <div className="lg:col-span-4 col-span-5">
        <Outlet />
      </div>
    </main>
  )
}
