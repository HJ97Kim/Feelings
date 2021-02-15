/* eslint-disable consistent-return */
import React, { useCallback, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import StartLayout from '../components/StartLayout';
import useInput from '../hooks/useInput';
import { SIGN_UP_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const CancelBtn = styled(Button)`
  margin-left: 5px;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector((state) => state.user);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    console.log(email, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password },
    });
  }, [email, password, passwordCheck]);

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
              <h2>회원가입</h2>
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
              <Form.Item>
                <label htmlFor="user-password-check">Password Check</label>
                <br />
                <Input
                  name="user-password"
                  type="password"
                  value={passwordCheck}
                  onChange={onChangePasswordCheck}
                  required
                />
                {passwordError && <ErrorMessage>비밀번호가 일치하지 않습니다.</ErrorMessage>}
              </Form.Item>
              <div>
                <Button type="primary" htmlType="submit" loading={signUpLoading}>회원가입</Button>
                <Link href="/"><a><CancelBtn>취소</CancelBtn></a></Link>
              </div>
            </Col>
          </Row>
        </Form>
      </StartLayout>
    </>
  );
};

export default Signup;
