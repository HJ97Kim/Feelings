import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faSmile, faMeh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

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

const PostEditForm = ({ post, onCancelUpdate, onChangePost }) => {
  const [editText, setEditText] = useState(post.content);
  const [feelings, setFeelings] = useState('');
  const { updatePostLoading } = useSelector((state) => state.post);

  const onChangeFeelings = useCallback((e) => {
    setFeelings(e.target.value);
  }, [feelings]);

  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <>
      <FeelingsEmoticonWrap>
        <EmoticonInput type="radio" id="best" name="feeling" value="best" onChange={onChangeFeelings} />
        <FeelingsEmoticon color="#fb8c00" htmlFor="best"><FontAwesomeIcon icon={faLaughSquint} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="good" name="feeling" value="good" onChange={onChangeFeelings} />
        <FeelingsEmoticon color="#fff176" htmlFor="good"><FontAwesomeIcon icon={faSmile} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="soso" name="feeling" value="soso" onChange={onChangeFeelings} />
        <FeelingsEmoticon color="#9ccc65" htmlFor="soso"><FontAwesomeIcon icon={faMeh} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="sad" name="feeling" value="sad" onChange={onChangeFeelings} />
        <FeelingsEmoticon color="#303f9f" htmlFor="sad"><FontAwesomeIcon icon={faSadCry} size="4x" /></FeelingsEmoticon>
        <EmoticonInput type="radio" id="angry" name="feeling" value="angry" onChange={onChangeFeelings} />
        <FeelingsEmoticon color="#e53935" htmlFor="angry"><FontAwesomeIcon icon={faAngry} size="4x" /></FeelingsEmoticon>
      </FeelingsEmoticonWrap>
      <div style={{ marginBottom: '20px' }}>
        <Input.TextArea rows={10} value={editText} onChange={onChangeText} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button type="primary" onClick={onChangePost(editText, feelings)} loading={updatePostLoading} style={{ marginRight: '5px' }}>
          수정
        </Button>
        <Button type="danger" onClick={onCancelUpdate}>
          취소
        </Button>
      </div>
    </>
  );
};

PostEditForm.propTypes = {
  post: PropTypes.object.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

export default PostEditForm;
