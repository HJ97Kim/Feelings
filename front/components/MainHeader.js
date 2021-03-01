/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Menu, Dropdown, Avatar, Modal } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import ProfileEdit from './ProfileEdit';
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
  const [visible, setVisible] = useState(false);

  const onLogOut = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  const showModal = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <span onClick={showModal}>내 설정</span>
      </Menu.Item>
      <Modal visible={visible} title="내 설정" onCancel={handleCancel} footer={null}>
        <ProfileEdit />
      </Modal>
      <Menu.Item key="1">
        <span onClick={onLogOut} loading={logOutLoading}>로그아웃</span>
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
