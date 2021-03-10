/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { Row, Col, Menu, Dropdown, Avatar, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import ProfileEdit from './ProfileEdit';
import { logoutRequestAction } from '../reducers/user';

const MainHeaderWrap = styled.header`
  width: 100%;
  height: 60px;
  background-color: rgba( 255, 255, 255, 0.5 );
`;

const HeaderContents = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const MainHeader = ({ me }) => {
  const dispatch = useDispatch();
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
        <ProfileEdit me={me} setVisible={setVisible} refresh={Math.random()} />
      </Modal>
      <Menu.Item key="1">
        <span onClick={onLogOut}>로그아웃</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <MainHeaderWrap>
      {me !== null ? (
        <HeaderContents>
          <Row align="middle" style={{ height: '60px' }}>
            <Col span={12} offset={6} style={{ textAlign: 'center' }}>
              <img src="/logo_transparent.png" alt="logo" style={{ width: '150px' }} />
            </Col>
            <Col span={6} style={{ textAlign: 'center' }}>
              <span style={{ paddingRight: '10px', fontWeight: 'bold' }}>{me.nickname}</span>
              <Dropdown overlay={menu} trigger={['click']}>
                <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
                  <Avatar size={42} src={`http://localhost:3065/${me.img}`} />
                </a>
              </Dropdown>
            </Col>
          </Row>
        </HeaderContents>
      ) : (
        <></>
      )}
    </MainHeaderWrap>
  );
};

MainHeader.propTypes = {
  me: PropTypes.object.isRequired,
};

export default MainHeader;
