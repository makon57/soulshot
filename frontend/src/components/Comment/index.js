
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

  const [userId, setUserId] = useState(sessionUser);
  const [imageId, setImageId] = useState(image.id);
  const [comment, setComment] = useState("");

  const updateComment = (e) => setComment(e.target.value);

  const reset = () => {
    setUserId(sessionUser);
    setImageId(image.id);
    setComment("");
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

    const currentComment = sortedComments.find(comment => comment.userId === sessionUser)
    console.log(currentComment);

    if (currentComment) {
      const commentId = currentComment.id;
      const editedComment = await dispatch(editComment(imageId, commentId, payload));
      if (editedComment) {
        hideForm();
        reset();
      }
    } else {
      let addComment = await dispatch(createComment(image.id, payload))
      if (addComment) {
        hideForm();
        reset();
      }
    }
  };


  return (
    <section className="edit-form">
      <form onSubmit={handleSubmit}>
        <textarea
          type="description"
          placeholder="Description"
          required
          value={comment}
          onChange={updateComment} />
        <button className="update-btn" type="submit">Save Comment</button>
        <button className="cancel-btn" type="button" onClick={handleCancelClick}>Cancel</button>
      </form>
    </section>
  );
};

export default Comment;
