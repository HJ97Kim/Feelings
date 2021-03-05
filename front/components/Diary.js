import React, { useCallback, useEffect, useState } from 'react';
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

const Diary = ({ setVisible, post }) => {
  const dispatch = useDispatch();
  const { removePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editMode, setEditMode] = useState(false);

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

  const onChangePost = useCallback((editText) => () => {
    dispatch({
      type: UPDATE_POST_REQUEST,
      data: {
        PostId: post.id,
        content: editText,
      },
    });
  }, [post]);

  const onRemovePost = useCallback(() => {
    console.log('remove', post.id);
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
    setVisible(false);
  }, [post]);

  const feelingIcon = () => {
    if (post.feeling === 'best') {
      return <FeelingsEmoticon color="#fb8c00" icon={faLaughSquint} size="4x" />;
    }
    if (post.feeling === 'good') {
      return <FeelingsEmoticon color="#fff176" icon={faSmile} size="4x" />;
    }
    if (post.feeling === 'soso') {
      return <FeelingsEmoticon color="#9ccc65" icon={faMeh} size="4x" />;
    }
    if (post.feeling === 'sad') {
      return <FeelingsEmoticon color="#303f9f" icon={faSadCry} size="4x" />;
    }
    if (post.feeling === 'angry') {
      return <FeelingsEmoticon color="#e53935" icon={faAngry} size="4x" />;
    }
  };

  return (
    <>
      {editMode
        ? (
          <PostEditForm
            postData={post.content}
            onCancelUpdate={onCancelUpdate}
            onChangePost={onChangePost}
          />
        )
        : (
          <>
            <div style={{ textAlign: 'center' }}>
              {feelingIcon()}
            </div>
            <div>
              {post.content}
            </div>
            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
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
};

export default Diary;
