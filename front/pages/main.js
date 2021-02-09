import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import styled, { createGlobalStyle } from 'styled-components';
import { Row, Col, Menu, Dropdown, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

import { logoutAction } from '../reducers/user';
import Calendar from '../components/Calendar';

const Global = createGlobalStyle`
  html,
  body,
  body > div:first-child,
  div#__next,
  div#__next > div {
    min-height: 100vh;
  }
`;

const BackgroundImg = styled.div`
  border: 0;
  padding: 0; 
  background-image: url('https://t1.daumcdn.net/cfile/tistory/26AEB633597644FE1E');
  height: 100%;
  background-position: center;
  background-size: cover;
`;

const MainHeader = styled.header`
  width: 100%;
  height: 50px;
  background: #fff;
`;

const HeaderContents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Main = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);

  // 로그인 안한 사용자 -> 로그인 페이지 이동(/)
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
      return;
    }
  }, [isLoggedIn]);

  const onLogOut = useCallback(() => {
    dispatch(logoutAction());
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">내 설정</a>
      </Menu.Item>
      <Menu.Item key="1">
        <a onClick={onLogOut}>로그아웃</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>Feelings</title>
      </Head>
      <BackgroundImg>
        <Global />
        <MainHeader>
          <HeaderContents>
            <Row align="middle" style={{ height:'50px' }}>
              <Col span={12} offset={6} style={{ textAlign: 'center' }}>Feelings</Col>
              <Col span={6} style={{ textAlign: 'center' }}>
                <Dropdown overlay={menu} trigger={['click']}>
                  <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                    <Avatar size={42} icon={<UserOutlined />} />
                  </a>
                </Dropdown>
              </Col>
            </Row>
          </HeaderContents>
        </MainHeader>
        <Row justify="space-around" align="middle">
          <Col xs={24} md={16}>
            <Calendar />
          </Col>
        </Row>
      </BackgroundImg>
    </>
  );
};

export default Main;
