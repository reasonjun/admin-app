"use client";

import React, { useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Menu from "antd/es/menu";
import type {
  ItemType,
  MenuItemType,
  SubMenuType,
} from "antd/es/menu/interface";
import { SystemMenuInfo } from "@/types/menu";

interface AdminMenuProps {
  menuItems: SystemMenuInfo[];
}

const AdminMenu: React.FC<AdminMenuProps> = ({ menuItems }) => {
  const pathname = usePathname();

  // 경로-ID 매핑과 메뉴 변환을 한 번에 처리
  const { transformedMenuItems, selectedMenuId } = useMemo(() => {
    // 경로-ID 매핑 객체
    const pathMap: Record<string, number> = {};

    // 메뉴 변환 함수 (동시에 경로 맵 구축)
    const transformMenuItems = (items: SystemMenuInfo[]): ItemType[] => {
      return items
        .filter((item) => item.menuExosYn && item.menuUseYn) // 노출 및 사용 가능한 메뉴만 필터링
        .sort((a, b) => a.sortSeq - b.sortSeq) // 정렬 순서에 따라 정렬
        .map((item) => {
          // 경로 매핑 추가
          if (item.menuPathCnnt) {
            pathMap[item.menuPathCnnt] = item.menuId;
          }

          // 하위 메뉴가 있는지 확인
          const hasChildren = item.childMenu?.length > 0;

          // 기본 속성 정의
          const baseItem = {
            key: String(item.menuId),
            label: item.menuPathCnnt ? (
              <Link href={item.menuPathCnnt}>{item.menuNm}</Link>
            ) : (
              <span>{item.menuNm}</span>
            ),
          };

          // 하위 메뉴가 있으면 SubMenuType으로, 아니면 MenuItemType으로 반환
          if (hasChildren) {
            return {
              ...baseItem,
              children: transformMenuItems(item.childMenu),
            } as SubMenuType;
          } else {
            return baseItem as MenuItemType;
          }
        });
    };

    const items = transformMenuItems(menuItems);
    const selectedId = pathMap[pathname];

    return {
      transformedMenuItems: items,
      selectedMenuId: selectedId,
    };
  }, [menuItems, pathname]);

  return (
    <Menu
      mode='inline'
      theme='dark'
      items={transformedMenuItems}
      selectedKeys={selectedMenuId ? [String(selectedMenuId)] : []}
    />
  );
};

export default AdminMenu;
