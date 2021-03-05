import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, Input } from 'antd';

const PostEditForm = ({ postData, onCancelUpdate, onChangePost }) => {
  const [editText, setEditText] = useState(postData);
  const { updatePostLoading } = useSelector((state) => state.post);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  }, []);

  return (
    <>
      <div>
        <Input.TextArea value={editText} onChange={onChangeText} />
      </div>
      <div style={{ textAlign: 'right', marginBottom: '20px' }}>
        <Button type="primary" onClick={onChangePost(editText)} loading={updatePostLoading} style={{ marginRight: '5px' }}>
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
  postData: PropTypes.string.isRequired,
  onCancelUpdate: PropTypes.func.isRequired,
  onChangePost: PropTypes.func.isRequired,
};

export default PostEditForm;
