/* eslint-disable consistent-return */
import React, { useCallback, useEffect, useState, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Row, Col, Form, Input, Button, Avatar } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import StartLayout from '../components/StartLayout';
import useInput from '../hooks/useInput';
import { RESET_UPLOAD_IMAGE, SIGN_UP_REQUEST, UPLOAD_IMAGE_REQUEST } from '../reducers/user';

const ErrorMessage = styled.div`
  color: red;
`;

const CancelBtn = styled(Button)`
  margin-left: 5px;
`;

const Signup = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [nickname, onChangeNickname] = useInput('');
  const [nicknameError, setNicknameError] = useState(false);
  const { signUpLoading, signUpDone, signUpError } = useSelector((state) => state.user);

  useEffect(() => {
    if (signUpDone) {
      router.push('/'); // replace는 뒤로가기시 전페이지 안가짐
    }
    dispatch({
      type: RESET_UPLOAD_IMAGE,
    });
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [profileImageError, setProfileImageError] = useState(false);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordCheck(e.target.value);
    setPasswordError(e.target.value !== password);
  }, [password]);

  const { profileImagePaths } = useSelector((state) => state.user);
  const imageInput = useRef();
  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImage = useCallback((e) => {
    console.log('images', e.target.files);
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    dispatch({
      type: UPLOAD_IMAGE_REQUEST,
      data: imageFormData,
    });
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (nickname === null) {
      return setNicknameError(true);
    }
    if (profileImagePaths.length === 0) {
      alert('프로필 이미지를 선택해주세요.');
      return setProfileImageError(true);
    }
    console.log(email, password);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { email, password, nickname, profileImagePaths },
    });
  }, [email, password, passwordCheck, nickname, profileImagePaths]);

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>회원가입 | Feelings</title>
      </Head>
      <StartLayout>
        <Form encType="multipart/form-data" onFinish={onSubmit}>
          <Row>
            <Col xs={12} md={12} offset={6}>
              <h2>회원가입</h2>
              <Form.Item>
                {profileImagePaths.length > 0 ? (<Avatar size={64} src={`http://localhost:3065/${profileImagePaths}`} />) : (<Avatar size={64} icon={<UserOutlined />} />)}
                <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImage} />
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                {profileImageError && <ErrorMessage>프로필 이미지를 선택해주세요.</ErrorMessage>}
              </Form.Item>
              <Form.Item>
                <label htmlFor="user-nick">Nickname</label>
                <br />
                <Input name="user-nick" value={nickname} onChange={onChangeNickname} required />
                {nicknameError && <ErrorMessage>닉네임을 입력해주세요.</ErrorMessage>}
              </Form.Item>
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
