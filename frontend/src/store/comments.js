import { csrfFetch } from "./csrf";
const GET_COMMENTS = 'images/getComments';
const ADD_COMMENT = 'images/addComment';

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

const initalState = { comments: {}, isLoading: true };

const commentReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_COMMENTS:
      const allComments = {};
      action.comments.forEach(comment => allComments[comment.id] = comment)
      return { ...state, comments: allComments};
    // case GET_ALBUM_IMAGES:
    //   const albumImages = {};
    //   action.images.Images.forEach(image => albumImages[image.id] = image)
    //   return { ...state, images: albumImages};
    case ADD_COMMENT:
      return { ...state, comments: {[action.newComment.id]: action.newComment, ...state.comments}};
    // case UPDATE_IMAGE:
    //   return {
    //     ...state,
    //     images: {...state.images, [action.image.id]: action.image}
    //   };
    // case REMOVE_IMAGE:
    //   const currentImages = {};
    //   action.images.forEach(image => currentImages[image.id] = image)
    //   return { ...state, images: currentImages};
    default:
      return state;
  }
};

export default commentReducer;
