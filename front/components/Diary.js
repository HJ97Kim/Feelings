import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLaughSquint, faSmile, faMeh, faSadCry, faAngry } from '@fortawesome/free-solid-svg-icons';

import { REMOVE_POST_REQUEST } from '../reducers/post';

const Diary = ({ setVisible, post }) => {
  const dispatch = useDispatch();
  const { removePostLoading } = useSelector((state) => state.post);

  const handleCancel = () => {
    setVisible(false);
  };

  const onRemovePost = useCallback(() => {
    console.log('remove', post.id);
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
    setVisible(false);
  }, []);

  const feelingIcon = () => {
    if (post.feeling === 'best') {
      return <FontAwesomeIcon icon={faLaughSquint} size="4x" />;
    }
    if (post.feeling === 'good') {
      return <FontAwesomeIcon icon={faSmile} size="4x" />;
    }
    if (post.feeling === 'soso') {
      return <FontAwesomeIcon icon={faMeh} size="4x" />;
    }
    if (post.feeling === 'sad') {
      return <FontAwesomeIcon icon={faSadCry} size="4x" />;
    }
    if (post.feeling === 'angry') {
      return <FontAwesomeIcon icon={faAngry} size="4x" />;
    }
  };

  return (
    <>
      <div>
        {feelingIcon()}
      </div>
      <div>
        {post.content}
      </div>
      <div style={{ textAlign: 'right' }}>
        <Button key="back" type="primary" onClick={handleCancel} style={{ marginRight: '5px' }}>
          수정
        </Button>
        <Button key="submit" type="danger" loading={removePostLoading} onClick={onRemovePost} htmlType="submit">
          삭제
        </Button>
      </div>
    </>
  );
};

Diary.propTypes = {
  post: PropTypes.object.isRequired,
  setVisible: PropTypes.func.isRequired,
};

export default Diary;
