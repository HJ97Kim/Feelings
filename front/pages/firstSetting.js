import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import { Row, Col, Form, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons'

import StartLayout from '../components/StartLayout';
import useInput from '../hooks/useInput';

const FirstSetting = () => {
  const [nickname, onChangeNickname] = useInput('');
  const [nicknameError, setNicknameError] = useState(false);

  const onSubmit = useCallback(() => {
    if (nickname === null) {
      return setNicknameError(true);
    }
    console.log(nickname);
  }, [nickname]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | Feelings</title>
      </Head>
      <StartLayout>
      <Form onFinish={onSubmit}>
          <Row>
            <Col xs={12} md={12} offset={6}>
              <h2>프로필 설정</h2>
              <Form.Item>
                <Avatar size={64} icon={<UserOutlined />} />
              </Form.Item>
              <Form.Item>
                <label htmlFor="user-nick">Nickname</label>
                <br />
                <Input name="user-nick" value={nickname} onChange={onChangeNickname} required />
                {nicknameError && <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>}
              </Form.Item>
              <div>
                <Button type="primary" htmlType="submit" loading={false}>등록</Button>
              </div>
            </Col>
          </Row>
        </Form>
      </StartLayout>
    </>
  );
};

export default FirstSetting;