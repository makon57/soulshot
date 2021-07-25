import { csrfFetch } from "./csrf";

const GET_COMMENTS = 'comments/getComments';
const ADD_COMMENT = 'comments/addComment';
const REMOVE_COMMENT = 'comments/removeComment';
const UPDATE_COMMENT = 'comments/updateComment';

/*-----------------------ACTIONS-------------------*/
export const getComments = (comments) => {
  return {
    type: GET_COMMENTS,
    comments,
  }
}

export const addComment = (newComment) => {
  return {
    type: ADD_COMMENT,
    newComment
  };
};

export const updateComment = (comment) => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export const removeComment = (comments) => {
  return {
    type: REMOVE_COMMENT,
    comments
  };
};


/*-------------------------THUNKS-------------------------*/
export const fetchComments = (id) => async (dispatch) => {
  const res = await fetch(`/api/images/${id}/comments`);
  const comments = await res.json();
  if (res.ok) {
    dispatch(getComments(comments));
  }
}

export const createComment = (id, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${id}/comments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const newComment = await res.json();

  if (res.ok) {
    dispatch(addComment(newComment));
  }
  return newComment;
}

export const editComment = (imageId, commentId, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${imageId}/comments/${commentId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const comment = await res.json();
  if (res.ok) {
    dispatch(updateComment(comment));
  }
}

export const deleteComment = (imageId, commentId) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${imageId}/comments/${commentId}/delete`, {
    method: 'DELETE',
  });

  const comments = await res.json();
  dispatch(removeComment(comments));
}

/*-------------------------REDUCERRRR-------------------------*/
const initalState = { comments: {}, isLoading: true };

const commentReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      const allComments = {};
      action.comments.forEach(comment => allComments[comment.id] = comment)
      return { ...state, comments: allComments};
    case ADD_COMMENT:
      return { ...state, comments: {[action.newComment.id]: action.newComment, ...state.comments}};
    case UPDATE_COMMENT:
      return {
        ...state,
        comments: {...state.comments, [action.comment.id]: action.comment}
      };
    case REMOVE_COMMENT:
      const currentComments = {};
      action.comments.forEach(comment => currentComments[comment.id] = comment)
      return { ...state, comments: currentComments};
    default:
      return state;
  }
};

export default commentReducer;
