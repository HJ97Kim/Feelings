import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from "next/router";

import StartLayout from '../components/StartLayout';
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers/user';

const SignupBtn = styled(Button)`
  margin-left: 5px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoggedIn } = useSelector((state) => state.user);
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 로그인 성공 -> 메인페이지 이동
  useEffect(() => {
    if(isLoggedIn){
        router.push('/main');
    }
}, [isLoggedIn]);

  const onSubmitForm = useCallback(() => { // 가짜 로그인
    console.log(id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);
  
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>로그인 | Feelings</title>
      </Head>
      <StartLayout>
        <Form onFinish={onSubmitForm}>
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