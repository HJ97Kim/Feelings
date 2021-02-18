import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faSmile, faMeh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { ADD_POST_REQUEST } from '../reducers/post';

const PostForm = ({ postDate, setVisible }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(''); // textArea value
  const [feelings, setFeelings] = useState('');
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone) {
      setText('');
      setFeelings('');
    }
  }, [addPostDone]);

  const onChangeText = useCallback((e) => {
    setText(e.target.value);
  }, []);

  const onChangeFeelings = useCallback((e) => {
    setFeelings(e.target.value);
  }, []);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_POST_REQUEST,
      data: { content: text, date: postDate, feeling: feelings },
    });
    setVisible(false);
  }, [text, postDate]);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <input type="radio" id="best" name="feeling" value="best" onChange={onChangeFeelings} />
      <label htmlFor="best"><FontAwesomeIcon icon={faLaughSquint} size="4x" /></label>
      <input type="radio" id="good" name="feeling" value="good" onChange={onChangeFeelings} />
      <label htmlFor="good"><FontAwesomeIcon icon={faSmile} size="4x" /></label>
      <input type="radio" id="soso" name="feeling" value="soso" onChange={onChangeFeelings} />
      <label htmlFor="soso"><FontAwesomeIcon icon={faMeh} size="4x" /></label>
      <input type="radio" id="sad" name="feeling" value="sad" onChange={onChangeFeelings} />
      <label htmlFor="sad"><FontAwesomeIcon icon={faSadCry} size="4x" /></label>
      <input type="radio" id="angry" name="feeling" value="angry" onChange={onChangeFeelings} />
      <label htmlFor="angry"><FontAwesomeIcon icon={faAngry} size="4x" /></label>
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
