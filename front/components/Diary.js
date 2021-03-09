import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faSmile, faMeh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from '../reducers/post';
import PostEditForm from './PostEditForm';

const FeelingsEmoticon = styled(FontAwesomeIcon)`
  color: ${(props) => props.color};
`;

const Diary = ({ setVisible, post, editMode, setEditMode }) => {
  const dispatch = useDispatch();
  const { removePostLoading, updatePostDone } = useSelector((state) => state.post);

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  const onClickUpdate = useCallback(() => {
    setEditMode(true);
  }, []);

  const onCancelUpdate = useCallback(() => {
    setEditMode(false);
  }, []);

  const onChangePost = useCallback((editText, feelings) => () => {
    if (feelings === '') {
      alert('감정을 선택해주세요!');
      return false;
    }
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
        feeling: feelings,
      },
    });
  }, [post]);

  const onRemovePost = useCallback(() => {
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
    setVisible(false);
  }, [post]);

  const feelingIcon = useCallback((feeling) => {
    if (feeling === 'best') {
      return <FeelingsEmoticon color="#fb8c00" icon={faLaughSquint} size="4x" />;
    }
    if (feeling === 'good') {
      return <FeelingsEmoticon color="#ffea00" icon={faSmile} size="4x" />;
    }
    if (feeling === 'soso') {
      return <FeelingsEmoticon color="#9ccc65" icon={faMeh} size="4x" />;
    }
    if (feeling === 'sad') {
      return <FeelingsEmoticon color="#303f9f" icon={faSadCry} size="4x" />;
    }
    if (feeling === 'angry') {
      return <FeelingsEmoticon color="#e53935" icon={faAngry} size="4x" />;
    }
  }, []);

  return (
    <>
      {editMode
        ? (
          <PostEditForm
            post={post}
            onCancelUpdate={onCancelUpdate}
            onChangePost={onChangePost}
          />
        )
        : (
          <>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              {feelingIcon(post.feeling)}
            </div>
            <div>
              {post.content}
            </div>
            <div style={{ textAlign: 'right' }}>
              <Button type="primary" onClick={onClickUpdate} style={{ marginRight: '5px' }}>
                수정
              </Button>
              <Button key="submit" type="danger" loading={removePostLoading} onClick={onRemovePost} htmlType="submit">
                삭제
              </Button>
            </div>
          </>
        )}
    </>
  );
};

Diary.propTypes = {
  post: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  setEditMode: PropTypes.func.isRequired,
};

export default Diary;
