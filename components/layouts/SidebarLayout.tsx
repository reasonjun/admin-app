import { CSSProperties, ReactNode } from "react";
import Layout, { Content } from "antd/es/layout/layout";
import Sider from "antd/es/layout/Sider";
import Title from "antd/es/typography/Title";

interface SidebarLayoutProps {
  children: ReactNode;
  menuComponent: ReactNode;
}

const siderStyle: CSSProperties = {
  overflow: "auto",
  minHeight: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const contentStyle: CSSProperties = {
  padding: "1rem",
};

const SidebarLayout = ({ children, menuComponent }: SidebarLayoutProps) => {
  return (
    <Layout hasSider>
      <Sider width='250' style={siderStyle}>
        <Title
          level={3}
          style={{
            margin: 0,
            color: "#fff",
            marginTop: 5,
            padding: "15px",
            boxSizing: "border-box",
          }}
        >
          Rivers Admin
        </Title>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            minHeight: "calc(100vh - 67px)",
            height: "100%",
          }}
        >
          {menuComponent}
        </div>
      </Sider>
      <Content style={contentStyle}>{children}</Content>
    </Layout>
  );
};

export default SidebarLayout;
