
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createComment, fetchComments, editComment } from '../../store/comments';
import '../ImageDetailModal/EditImages/EditForm.css';

const Comment = ({ image, hideForm, sortedComments }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  let sessionUser = useSelector(state => state.session.user);

  if (!sessionUser) {
    history.push(`/`);
  }

  sessionUser = useSelector(state => state.session.user.id);
  const currentComment = sortedComments.find(comment => comment.userId === sessionUser)

  const [userId, setUserId] = useState(sessionUser);
  const [imageId, setImageId] = useState(image.id);
  const [comment, setComment] = useState(currentComment?.comment);

  const reset = () => {
    setUserId(sessionUser);
    setImageId(image.id);
    setComment(currentComment?.comment);
  };

  const handleCancelClick = (e) => {
    e.preventDefault();
    hideForm();
  };

  useEffect(() => {
    dispatch(fetchComments(image.id));
  }, [dispatch, image]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      userId,
      imageId,
      comment,
    };

    if (!currentComment) {
      let addComment = await dispatch(createComment(image.id, payload))
      if (addComment) {
        hideForm();
        reset();
      }
    } else {
      const commentId = currentComment.id;
      await dispatch(editComment(imageId, commentId, payload));
      hideForm();
      reset();
    }
  };


  return (
    <section className="edit-form">
      <form onSubmit={handleSubmit}>
        <textarea
          type="comment"
          placeholder={comment}
          required
          value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <button className="update-btn" type="submit">Save Comment</button>
        <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default Comment;
