import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Form, Button, Input, Avatar } from 'antd';
import PropTypes from 'prop-types';
import axios from 'axios';

import useInput from '../hooks/useInput';
import { CHANGE_NICKNAME_REQUEST, CHANGE_PROFILE_IMG_REQUEST } from '../reducers/user';

const ProfileEdit = ({ me, setVisible, refresh }) => {
  const dispatch = useDispatch();
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const [profileImage, setProfileImage] = useState('');
  const imageInput = useRef();

  useEffect(() => {
    setProfileImage(me.img);
  }, [refresh]);

  const onClickImageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onChangeImage = useCallback(async (e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    const responseData = await axios.post('/user/image', imageFormData);
    const previewImage = responseData.data;
    setProfileImage(previewImage);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
    if (profileImage) {
      dispatch({
        type: CHANGE_PROFILE_IMG_REQUEST,
        data: profileImage,
      });
    }
    setVisible(false);
  }, [nickname, profileImage]);

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <div>
        {profileImage.length !== 0 ? <Avatar size={64} src={`http://localhost:3065/${profileImage}`} /> : <Avatar size={64} src={`http://localhost:3065/${me.img}`} />}
        <input type="file" name="image" hidden ref={imageInput} onChange={onChangeImage} />
        <Button onClick={onClickImageUpload}>이미지 업로드</Button>
      </div>
      <div style={{ marginTop: '20px' }}>
        <Input addonBefore="닉네임" value={nickname} onChange={onChangeNickname} required />
      </div>
      <div style={{ float: 'right', margin: '5px 0' }}>
        <Button key="submit" type="primary" htmlType="submit">
          완료
        </Button>
      </div>
    </Form>
  );
};

ProfileEdit.propTypes = {
  me: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default ProfileEdit;
