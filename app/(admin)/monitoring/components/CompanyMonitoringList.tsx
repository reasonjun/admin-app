"use client";

import Flex from "antd/es/flex";
import React, { useState } from "react";
import Text from "antd/es/typography/Text";
import Button from "antd/es/button";
import Table from "antd/es/table";
import Link from "next/link";
import Checkbox from "antd/es/checkbox/Checkbox";
import message from "antd/es/message";

const CompanyMonitoringList = () => {
  const initialData = [
    {
      key: 1,
      no: 1,
      companyName: "코꼬밍(주)",
      businessNo: "676-87-01559",
      approvalDate: "2025-03-12 15:33",
      companyDate: "2025-03-12 15:33",
      freeServicePrice: "2025-03-26 23:59",
      paidServicePrice: "2025-02-26 23:59",
      manager: "김*람람",
      contact: "010-****-1234",
      email: "a***@saramin.co.kr",
      salmonFee: "500,000",
      carFee: "100,000",
      carFeePayment: "100,000",
      supportFund: "400,000",
      qualityMaterial: "https://abc.care.er.rivers.co.kr",
      announcementCount: "11",
      applicantCount: "23",
      interviewManagement: "-",
      selectedGeneralPrice: "N",
    },
    {
      key: 2,
      no: 2,
      companyName: "(주)트리버시스템",
      businessNo: "686-86-01995",
      approvalDate: "2025-03-12 15:33",
      companyDate: "2025-03-12 15:33",
      freeServicePrice: "2025-03-12 15:33 - 2025-03-26 23:59",
      paidServicePrice: "-",
      manager: "박*훈",
      contact: "010-****-8514",
      email: "pa***@gmail.com",
      salmonFee: "500,000",
      carFee: "100,000",
      carFeePayment: "미결제",
      supportFund: "미신청",
      qualityMaterial: "-",
      announcementCount: "2",
      applicantCount: "1",
      interviewManagement: "-",
      selectedGeneralPrice: "N",
    },
    {
      key: 3,
      no: 3,
      companyName: "(주)트리버시스템",
      businessNo: "686-86-01995",
      approvalDate: "2025-03-12 15:33",
      companyDate: "2025-03-12 15:33",
      freeServicePrice: "2025-03-13 09:00 - 2025-03-27 23:59",
      paidServicePrice: "-",
      manager: "박*훈",
      contact: "010-****-8514",
      email: "pa***@gmail.com",
      salmonFee: "500,000",
      carFee: "100,000",
      carFeePayment: "미결제",
      supportFund: "미신청",
      qualityMaterial: "-",
      announcementCount: "5",
      applicantCount: "8",
      interviewManagement: "-",
      selectedGeneralPrice: "N",
    },
  ];

  const [data, setData] = useState(initialData);

  const handleCheckboxChange = async (key, checked) => {
    // 1. 먼저 UI를 즉시 업데이트 (Optimistic Update)
    const previousData = [...data]; // 롤백을 위한 이전 상태 저장

    setData((prevData) =>
      prevData.map((item) =>
        item.key === key
          ? {
              ...item,
              supportFund: checked ? "400,000" : "미신청",
              selectedGeneralPrice: checked ? "Y" : "N",
            }
          : item,
      ),
    );

    try {
      // 2. 백그라운드에서 API 호출
      // TODO: 실제 API 엔드포인트로 교체
      // await updateSelectedStatus(key, checked ? 'Y' : 'N');

      // 임시로 랜덤하게 성공/실패 시뮬레이션 (실제로는 제거)
      const mockApiCall = new Promise((resolve, reject) => {
        setTimeout(() => {
          Math.random() > 0.7 ? reject(new Error("API Error")) : resolve();
        }, 500);
      });

      await mockApiCall;

      // 3. API 성공 시 성공 메시지 표시
      message.success(checked ? "신청으로 설정했어요." : "신청을 해제했어요.");
    } catch (error) {
      // 4. API 실패 시 롤백 + 에러 메시지
      console.error("API 호출 실패:", error);

      // 이전 상태로 롤백
      setData(previousData);

      // 에러 메시지 표시
      message.error("처리 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      width: 60,
      fixed: "left",
    },
    {
      title: "기업명",
      dataIndex: "companyName",
      key: "companyName",
      width: 150,
      fixed: "left",
    },
    {
      title: "사업자등록번호",
      dataIndex: "businessNo",
      key: "businessNo",
      width: 130,
    },
    {
      title: "승인일자",
      dataIndex: "approvalDate",
      key: "approvalDate",
      width: 100,
    },
    {
      title: "가입일자",
      dataIndex: "companyDate",
      key: "companyDate",
      width: 100,
    },
    {
      title: "무료서비스가격",
      dataIndex: "freeServicePrice",
      key: "freeServicePrice",
      width: 120,
    },
    {
      title: "유료서비스가격",
      dataIndex: "paidServicePrice",
      key: "paidServicePrice",
      width: 120,
    },
    {
      title: "담당자",
      dataIndex: "manager",
      key: "manager",
      width: 80,
    },
    {
      title: "연락처",
      dataIndex: "contact",
      key: "contact",
      width: 100,
    },
    {
      title: "이메일",
      dataIndex: "email",
      key: "email",
      width: 150,
    },
    {
      title: "연이용료(원)",
      dataIndex: "salmonFee",
      key: "salmonFee",
      width: 100,
    },
    {
      title: "자부담금(원)",
      dataIndex: "carFee",
      key: "carFee",
      width: 100,
    },
    {
      title: "자부담금 납부액(원)",
      dataIndex: "carFeePayment",
      key: "carFeePayment",
      width: 130,
    },
    {
      title: "지원금 신청금액(원)",
      dataIndex: "supportFund",
      key: "supportFund",
      width: 130,
    },
    {
      title: "홈페이지개설",
      dataIndex: "qualityMaterial",
      key: "qualityMaterial",
      width: 150,
      render: (text) =>
        text && text !== "-" ? (
          <Link href={text} target='_blank' rel='noopener noreferrer'>
            {text}
          </Link>
        ) : (
          text
        ),
    },
    {
      title: "공고수",
      dataIndex: "announcementCount",
      key: "announcementCount",
      width: 80,
      render: (text, record) => (
        <Link
          href={`/announcements/${record.key}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {text}
        </Link>
      ),
    },
    {
      title: "후보자수",
      dataIndex: "applicantCount",
      key: "applicantCount",
      width: 80,
      render: (text, record) => (
        <Link
          href={`/applicants/${record.key}`}
          target='_blank'
          rel='noopener noreferrer'
        >
          {text}
        </Link>
      ),
    },
    {
      title: "면접 및 평과관리",
      dataIndex: "interviewManagement",
      key: "interviewManagement",
      width: 120,
    },
    {
      title: "신청완료",
      dataIndex: "selectedGeneralPrice",
      key: "selectedGeneralPrice",
      width: 120,
      render: (_, record) => {
        return (
          <Checkbox
            checked={record.selectedGeneralPrice === "Y"}
            onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
          />
        );
      },
    },
  ];

  return (
    <div>
      <Flex justify='space-between' align='center' style={{ marginBottom: 16 }}>
        <div>
          <Text>총 {data.length}개</Text>
        </div>
        <Button>엑셀 다운로드</Button>
      </Flex>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
};

export default CompanyMonitoringList;
