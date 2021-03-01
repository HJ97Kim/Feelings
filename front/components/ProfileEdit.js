import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Button, Input } from 'antd';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';

const ProfileEdit = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <div style={{ marginTop: '20px' }}>
        <Input value={nickname} onChange={onChangeNickname} required />
      </div>
      <div style={{ float: 'right', margin: '5px 0' }}>
        <Button key="submit" type="primary" htmlType="submit">
          완료
        </Button>
      </div>
    </Form>
  );
};

export default ProfileEdit;
