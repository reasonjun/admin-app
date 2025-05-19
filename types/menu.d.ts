// 백엔드 API에서 제공하는 메뉴 정보 인터페이스
export interface SystemMenuInfo {
  menuId: number; // 메뉴ID
  moulCdNm: string; // 모듈코드명
  menuNm: string; // 메뉴명
  menuExln: string; // 메뉴설명
  pgmNm: string; // 프로그램명
  menuPathCnnt: string; // 메뉴경로내용
  uiIntrPaamVal: string; // UI초기화파라미터값
  menuLvlVal: number; // 메뉴레벨값
  uperMenuId: number; // 상위메뉴ID
  sortSeq: number; // 정렬순서
  menuExosYn: boolean; // 메뉴노출여부
  menuUseYn: boolean; // 메뉴사용여부
  menuAuthTpCd: string; // 메뉴권한유형코드
  childMenu: SystemMenuInfo[]; // 하위 메뉴 목록
}
