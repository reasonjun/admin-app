import { ReactNode } from "react";
import AdminMenu from "@/components/layouts/AdminMenu";
import SidebarLayout from "@/components/layouts/SidebarLayout";
import { SystemMenuInfo } from "@/types/menu";

interface AdminLayoutProps {
  children: ReactNode;
}

// 서버 컴포넌트에서 메뉴 데이터 가져오기
async function fetchMenuData(): Promise<SystemMenuInfo[]> {
  try {
    // 현재 환경에 따라 URL 설정 (개발/프로덕션)
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
    const res = await fetch(`${baseUrl}/api/admin/menu`);

    if (!res.ok) {
      // 오류 발생 시 빈 배열 반환
      console.error("Failed to fetch menu data", await res.text());
      return [];
    }

    return await res.json();
  } catch (error) {
    console.error("Error fetching menu data:", error);
    return [];
  }
}

const AdminLayout = async ({ children }: AdminLayoutProps) => {
  // 메뉴 데이터 가져오기
  const menuItems = await fetchMenuData();

  return (
    <SidebarLayout menuComponent={<AdminMenu menuItems={menuItems} />}>
      {children}
    </SidebarLayout>
  );
};

export default AdminLayout;
