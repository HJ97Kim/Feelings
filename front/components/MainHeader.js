/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Row, Col, Menu, Dropdown, Avatar, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { logoutRequestAction } from '../reducers/user';

const MainHeaderWrap = styled.header`
  width: 100%;
  height: 50px;
  background: #fff;
`;

const HeaderContents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainHeader = () => {
  const dispatch = useDispatch();
  const { logOutLoading } = useSelector((state) => state.user);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href="#">내 설정</a>
      </Menu.Item>
      <Menu.Item key="1">
        <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <MainHeaderWrap>
      <HeaderContents>
        <Row align="middle" style={{ height: '50px' }}>
          <Col span={12} offset={6} style={{ textAlign: 'center' }}>Feelings</Col>
          <Col span={6} style={{ textAlign: 'center' }}>
            {/* <span style={{ paddingRight: "10px" }}>안녕하세요 {me.nickname}님</span> 로그아웃시 에러남 */}
            <Dropdown overlay={menu} trigger={['click']}>
              <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                <Avatar size={42} icon={<UserOutlined />} />
              </a>
            </Dropdown>
          </Col>
        </Row>
      </HeaderContents>
    </MainHeaderWrap>
  );
};

export default MainHeader;
