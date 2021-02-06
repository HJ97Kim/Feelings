import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Form, Input, Button } from 'antd';

import StartLayout from '../components/StartLayout';

const SignupBtn = styled(Button)`
  margin-left: 5px;
`;

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const onChangeId = useCallback((e) => {
    setId(e.target.value);
  }, []);

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>로그인 | Feelings</title>
      </Head>
      <StartLayout>
        <Form>
          <Row>
            <Col xs={12} md={12} offset={6}>
              <h2>로그인</h2>
              <Form.Item>
                <label htmlFor="user-id">Email</label>
                <br />
                <Input name="user-id" value={id} onChange={onChangeId} required />
              </Form.Item>
              <Form.Item>
                <label htmlFor="user-password">Password</label>
                <br />
                <Input 
                  name="user-password" 
                  type="password" 
                  value={password} 
                  onChange={onChangePassword} 
                  required 
                />
              </Form.Item>
              <div>
                <Button type="primary" htmlType="submit" loading={false}>로그인</Button>
                <Link href="/signup"><a><SignupBtn>회원가입</SignupBtn></a></Link>
              </div>
            </Col>
          </Row>
        </Form>
      </StartLayout>
    </>
  );
};

export default Login;