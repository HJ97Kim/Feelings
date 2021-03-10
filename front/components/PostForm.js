import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faSmile, faMeh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { ADD_POST_REQUEST } from '../reducers/post';

const FeelingsEmoticonWrap = styled.div`
  margin-bottom: 20px;
  display: flex;
  justify-content: space-evenly;
`;

const FeelingsEmoticon = styled.label`
  color: ${(props) => props.color};
  opacity: 0.2;
  cursor: pointer;
`;

const EmoticonInput = styled.input`
  display: none;
  &:hover + ${FeelingsEmoticon},
  &:checked + ${FeelingsEmoticon} {
    opacity: 1;
  }
`;

const PostForm = ({ postDate, setVisible }) => {
  const dispatch = useDispatch();
  const [text, setText] = useState(''); // textArea value
  const [feelings, setFeelings] = useState('');
  const { addPostDone, addPostLoading } = useSelector((state) => state.post);

  useEffect(() => {
    if (addPostDone || postDate) {
      setText('');
      setFeelings('');
    }
  }, [addPostDone, postDate]);

  const onChangeText = useCallback((e) => {
    let textValue = e.target.value;
    textValue = textValue.replaceAll('<br/>', '\r\n');
    setText(textValue);
  }, [text]);

  const onChangeFeelings = useCallback((e) => {
    setFeelings(e.target.value);
  }, [feelings]);

  const onSubmit = useCallback(() => {
    if (feelings === '') {
      alert('감정을 선택해주세요!');
      return false;
    }
    dispatch({
      type: ADD_POST_REQUEST,
      data: { content: text, date: postDate, feeling: feelings },
    });
    setVisible(false);
  }, [text, postDate, feelings]);

  const handleCancel = () => {
    setVisible(false);
  };

  return (
    <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onFinish={onSubmit}>
      <FeelingsEmoticonWrap>
        <EmoticonInput type="radio" id="best" name="feeling" value="best" onChange={onChangeFeelings} checked={feelings === 'best'} />
        <FeelingsEmoticon color="#fb8c00" htmlFor="best"><FontAwesomeIcon icon={faLaughSquint} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="good" name="feeling" value="good" onChange={onChangeFeelings} checked={feelings === 'good'} />
        <FeelingsEmoticon color="#ffea00" htmlFor="good"><FontAwesomeIcon icon={faSmile} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="soso" name="feeling" value="soso" onChange={onChangeFeelings} checked={feelings === 'soso'} />
        <FeelingsEmoticon color="#9ccc65" htmlFor="soso"><FontAwesomeIcon icon={faMeh} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="sad" name="feeling" value="sad" onChange={onChangeFeelings} checked={feelings === 'sad'} />
        <FeelingsEmoticon color="#303f9f" htmlFor="sad"><FontAwesomeIcon icon={faSadCry} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="angry" name="feeling" value="angry" onChange={onChangeFeelings} checked={feelings === 'angry'} />
        <FeelingsEmoticon color="#e53935" htmlFor="angry"><FontAwesomeIcon icon={faAngry} size="4x" /></FeelingsEmoticon>
      </FeelingsEmoticonWrap>
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
