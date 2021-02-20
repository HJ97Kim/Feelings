import React, { useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';
import { Row, Col, Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import StartLayout from '../components/StartLayout';
import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const SignupBtn = styled(Button)`
  margin-left: 5px;
`;

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { me, logInLoading } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  // 로그인 성공 -> 메인페이지 이동
  useEffect(() => {
    if (me) {
      router.push('/main');
    }
  }, [me]);

  const onSubmitForm = useCallback(() => { // 로그인
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

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
                <label htmlFor="user-email">Email</label>
                <br />
                <Input name="user-email" type="email" value={email} onChange={onChangeEmail} required />
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
                <Button type="primary" htmlType="submit" loading={logInLoading}>로그인</Button>
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
