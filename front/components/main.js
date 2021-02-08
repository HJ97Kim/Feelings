import React, { useCallback } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { Row, Col, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const Global = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    height: 100%;
  }
`;

const BackgroundImg = styled.div`
  border: 0;
  padding: 0; 
  background-image: url('https://t1.daumcdn.net/cfile/tistory/26AEB633597644FE1E');
  min-height: 100%;
  background-position: center;
  background-size: cover;
`;

const menu = (
  <Menu>
    <Menu.Item key="0">
      <a href="#">내 설정</a>
    </Menu.Item>
    <Menu.Item key="1">
      <a href="#">로그아웃</a>
    </Menu.Item>
  </Menu>
)

const Main = () => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Feelings</title>
      </Head>
      <BackgroundImg>
        <Global />
        <header style={{ width: '100%', height: '50px', background: '#fff' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <Row align="middle" style={{ height:'50px' }}>
              <Col span={12} offset={6} style={{ textAlign: 'center' }}>Feelings</Col>
              <Col span={6} style={{ textAlign: 'right' }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar size={42} icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </div>
        </header>
      </BackgroundImg>
    </>
  );
};

export default Main;