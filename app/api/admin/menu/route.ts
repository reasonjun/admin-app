import { NextResponse } from "next/server";
import { SystemMenuInfo } from "@/types/menu";

// 예시 메뉴 데이터
// 실제 환경에서는 데이터베이스나 외부 API에서 가져올 수 있습니다
const systemMenus: SystemMenuInfo[] = [
  {
    menuId: 1,
    moulCdNm: "ADMIN",
    menuNm: "대시보드",
    menuExln: "관리자 대시보드",
    pgmNm: "AdminDashboard",
    menuPathCnnt: "/dashboard",
    uiIntrPaamVal: "",
    menuLvlVal: 1,
    uperMenuId: 0,
    sortSeq: 1,
    menuExosYn: true,
    menuUseYn: true,
    menuAuthTpCd: "ADMIN",
    childMenu: [],
  },
  {
    menuId: 2,
    moulCdNm: "ADMIN",
    menuNm: "모니터링",
    menuExln: "시스템 모니터링",
    pgmNm: "Monitoring",
    menuPathCnnt: "/monitoring",
    uiIntrPaamVal: "",
    menuLvlVal: 1,
    uperMenuId: 0,
    sortSeq: 2,
    menuExosYn: true,
    menuUseYn: true,
    menuAuthTpCd: "ADMIN",
    childMenu: [],
  },
  {
    menuId: 3,
    moulCdNm: "ADMIN",
    menuNm: "설정",
    menuExln: "시스템 설정",
    pgmNm: "Settings",
    menuPathCnnt: "/settings",
    uiIntrPaamVal: "",
    menuLvlVal: 1,
    uperMenuId: 0,
    sortSeq: 3,
    menuExosYn: true,
    menuUseYn: true,
    menuAuthTpCd: "ADMIN",
    childMenu: [
      {
        menuId: 31,
        moulCdNm: "ADMIN",
        menuNm: "사용자 관리",
        menuExln: "사용자 관리 기능",
        pgmNm: "UserManagement",
        menuPathCnnt: "/settings/users",
        uiIntrPaamVal: "",
        menuLvlVal: 2,
        uperMenuId: 3,
        sortSeq: 1,
        menuExosYn: true,
        menuUseYn: true,
        menuAuthTpCd: "ADMIN",
        childMenu: [],
      },
      {
        menuId: 32,
        moulCdNm: "ADMIN",
        menuNm: "시스템 설정",
        menuExln: "시스템 기본 설정",
        pgmNm: "SystemSettings",
        menuPathCnnt: "/settings/system",
        uiIntrPaamVal: "",
        menuLvlVal: 2,
        uperMenuId: 3,
        sortSeq: 2,
        menuExosYn: true,
        menuUseYn: true,
        menuAuthTpCd: "ADMIN",
        childMenu: [],
      },
    ],
  },
  {
    menuId: 4,
    moulCdNm: "ADMIN",
    menuNm: "리포트",
    menuExln: "리포트 출력",
    pgmNm: "Reports",
    menuPathCnnt: "/reports",
    uiIntrPaamVal: "",
    menuLvlVal: 1,
    uperMenuId: 0,
    sortSeq: 4,
    menuExosYn: true,
    menuUseYn: true,
    menuAuthTpCd: "ADMIN",
    childMenu: [],
  },
];

export async function GET(request: Request) {
  // URL에서 쿼리 파라미터 추출
  const { searchParams } = new URL(request.url);
  const role = searchParams.get("role"); // 역할/권한
  // 필터링된 메뉴를 저장할 변수
  let filteredMenus = systemMenus;

  // 역할 기반 필터링 (옵션)
  if (role) {
    const filterMenusByRole = (menus: SystemMenuInfo[]): SystemMenuInfo[] => {
      return menus
        .filter(
          (menu) => menu.menuAuthTpCd === role || menu.menuAuthTpCd === "ALL",
        )
        .map((menu) => ({
          ...menu,
          childMenu: menu.childMenu.length
            ? filterMenusByRole(menu.childMenu)
            : [],
        }))
        .filter((menu) => menu.menuExosYn && menu.menuUseYn); // 표시 가능하고 사용 가능한 메뉴만 반환
    };

    filteredMenus = filterMenusByRole(systemMenus);
  }

  // 지연 시뮬레이션 (실제 API에서는 제거)
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(filteredMenus);
}
