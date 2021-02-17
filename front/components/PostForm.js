import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = ({ postDate, setVisible }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(''); // textArea value
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: { content: text, date: postDate },
    });
    setVisible(false);
  }, [text, postDate]);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <Input.TextArea
        rows={10}
        value={text}
        onChange={onChangeText}
        maxLength={300}
        placeholder="오늘 당신의 기분은?"
      />
      <div style={{ float: 'right', margin: '5px 0' }}>
        <Button key="back" onClick={handleCancel} style={{ marginRight: '5px' }}>
          취소
        </Button>
        <Button key="submit" type="primary" loading={addPostLoading} htmlType="submit">
          작성
        </Button>
      </div>
    </Form>
  );
};

PostForm.propTypes = {
  postDate: PropTypes.string.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default PostForm;
