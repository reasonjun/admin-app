"use client";

import React from "react";
import Descriptions from "antd/es/descriptions";
import Item from "antd/es/descriptions/Item";
import Input from "antd/es/input";
import Select from "antd/es/select";
import DatePicker from "antd/es/date-picker";
import Space from "antd/es/space";
import Button from "antd/es/button";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import Divider from "antd/es/divider";
import { useForm, Controller } from "react-hook-form";
import dayjs from "dayjs";

const { RangePicker } = DatePicker;
const { Option } = Select;

const CompanyMonitoringSearch = () => {
  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      approvalDate: null,
      registrationDate: null,
      companyName: "",
      businessNumber: "",
      managerName: "",
      managerPhone: "",
      managerEmail: "",
      paymentStatus: "전체",
      subsidyTarget: "전체",
      hasWebsite: "전체",
    },
  });

  const onSearch = (data) => {
    console.log("Search Data:", data);
  };

  const onReset = () => {
    reset();
  };

  const handleDateRange = (field, days) => {
    const today = dayjs();
    let startDate;

    if (days === 0) {
      // 오늘
      startDate = today;
    } else if (days === 7) {
      // 1주일 전
      startDate = today.subtract(7, "day");
    } else if (days === 30) {
      // 1개월 전
      startDate = today.subtract(1, "month");
    } else if (days === 365) {
      // 1년 전
      startDate = today.subtract(1, "year");
    }

    setValue(field, [startDate, today]);
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        style={{ marginBottom: "20px", fontSize: "16px", fontWeight: "bold" }}
      >
        기업 모니터링
      </div>

      <Form onFinish={handleSubmit(onSearch)}>
        <Descriptions bordered column={2} size='middle'>
          <Item label='승인일자' span={2}>
            <Space>
              <Controller
                name='approvalDate'
                control={control}
                render={({ field }) => (
                  <RangePicker
                    {...field}
                    placeholder={["시작일", "종료일"]}
                    style={{ width: 300 }}
                  />
                )}
              />
              <Button onClick={() => handleDateRange("approvalDate", 0)}>
                오늘
              </Button>
              <Button onClick={() => handleDateRange("approvalDate", 7)}>
                1주일
              </Button>
              <Button onClick={() => handleDateRange("approvalDate", 30)}>
                1개월
              </Button>
              <Button onClick={() => handleDateRange("approvalDate", 365)}>
                1년
              </Button>
            </Space>
          </Item>

          <Item label='가입일자' span={2}>
            <Space>
              <Controller
                name='registrationDate'
                control={control}
                render={({ field }) => (
                  <RangePicker
                    {...field}
                    placeholder={["시작일", "종료일"]}
                    style={{ width: 300 }}
                  />
                )}
              />
              <Button onClick={() => handleDateRange("registrationDate", 0)}>
                오늘
              </Button>
              <Button onClick={() => handleDateRange("registrationDate", 7)}>
                1주일
              </Button>
              <Button onClick={() => handleDateRange("registrationDate", 30)}>
                1개월
              </Button>
              <Button onClick={() => handleDateRange("registrationDate", 365)}>
                1년
              </Button>
            </Space>
          </Item>

          <Item label='기업명'>
            <Controller
              name='companyName'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: 200 }}
                  placeholder='기업명을 입력하세요'
                />
              )}
            />
          </Item>

          <Item label='사업자등록번호'>
            <Controller
              name='businessNumber'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: 200 }}
                  placeholder='사업자등록번호를 입력하세요'
                />
              )}
            />
          </Item>

          <Item label='담당자 명' span={2}>
            <Controller
              name='managerName'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: 200 }}
                  placeholder='담당자명을 입력하세요'
                />
              )}
            />
          </Item>

          <Item label='담당자 연락처'>
            <Controller
              name='managerPhone'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: 200 }}
                  placeholder='연락처를 입력하세요'
                />
              )}
            />
          </Item>

          <Item label='담당자 이메일'>
            <Controller
              name='managerEmail'
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  style={{ width: 200 }}
                  placeholder='이메일을 입력하세요'
                />
              )}
            />
          </Item>

          <Item label='결제상태'>
            <Controller
              name='paymentStatus'
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: 200 }}>
                  <Option value='전체'>전체</Option>
                  <Option value='결제완료'>결제완료</Option>
                  <Option value='미결제'>미결제</Option>
                </Select>
              )}
            />
          </Item>

          <Item label='지원금 신청대상'>
            <Controller
              name='subsidyTarget'
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: 200 }}>
                  <Option value='전체'>전체</Option>
                  <Option value='대상'>대상</Option>
                  <Option value='비대상'>비대상</Option>
                </Select>
              )}
            />
          </Item>

          <Item label='홈페이지 유무'>
            <Controller
              name='hasWebsite'
              control={control}
              render={({ field }) => (
                <Select {...field} style={{ width: 200 }}>
                  <Option value='전체'>전체</Option>
                  <Option value='있음'>있음</Option>
                  <Option value='없음'>없음</Option>
                </Select>
              )}
            />
          </Item>
        </Descriptions>

        <Divider style={{ margin: "24px 0 16px" }} />

        <Flex justify='flex-end' gap='middle'>
          <Button
            type='primary'
            htmlType='submit'
            size='large'
            style={{ minWidth: 100 }}
          >
            검색
          </Button>
          <Button
            type='default'
            htmlType='reset'
            onClick={onReset}
            size='large'
            style={{ minWidth: 100 }}
          >
            초기화
          </Button>
        </Flex>
      </Form>
    </div>
  );
};

export default CompanyMonitoringSearch;
