
import { csrfFetch } from "./csrf";

const GET_IMAGES = 'images/getImages';
const ADD_IMAGE = 'images/addImage';
// const FIND_ONE = 'images/findImage';
const UPDATE_IMAGE = 'images/updateImage';
const REMOVE_IMAGE = 'images/removeImage';

export const getImages = (images) => {
  return {
    type: GET_IMAGES,
    images,
  }
}

export const addImage = (newImage) => {
  return {
    type: ADD_IMAGE,
    newImage
  };
};

// export const findOneImage = (id) => {
//   return {
//     type: FIND_ONE,
//     id
//   }
// }

export const updateImage = (image) => {
  return {
    type: UPDATE_IMAGE,
    image
  }
}

export const removeImage = (images) => {
  return {
    type: REMOVE_IMAGE,
    images
  };
};

export const fetchAlbumImages = (id) => async (dispatch) => {
  const res = await fetch(`/api/albums/${id}`);
  const images = await res.json();
  dispatch(getImages(images));
}

export const fetchImages = () => async (dispatch) => {
  const res = await fetch('/api/images');
  const images = await res.json();
  dispatch(getImages(images));
}

// export const fetchOneImage = (id) => async (dispatch) => {
//   const res = await fetch(`/api/images/${id}`);
//   const image = await res.json();
//   dispatch(findOneImage(image));
// }

export const createImage = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const newImage = await res.json();

  if (res.ok) {
    dispatch(addImage(newImage));
  }
  return newImage;
}

export const editImage = (id, payload) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const image = await res.json();
  if (res.ok) {
    dispatch(updateImage(image));
  }
  return image;
}

export const deleteImage = (id) => async (dispatch) => {
  const res = await csrfFetch(`/api/images/${id}/delete`, {
    method: 'DELETE',
  });

  const images = await res.json();
  dispatch(removeImage(images));
}

const initalState = { images: {}, isLoading: true };

const imageReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_IMAGES:
      const allImages = {};
      action.images.forEach(image => allImages[image.id] = image)
      return { ...state, images: allImages};
    case ADD_IMAGE:
      return { ...state, images: {[action.newImage.id]: action.newImage, ...state.images}};
    case UPDATE_IMAGE:
      return {
        ...state,
        images: {...state.images, [action.image.id]: action.image}
      };
    case REMOVE_IMAGE:
      const currentImages = {};
      action.images.forEach(image => currentImages[image.id] = image)
      return { ...state, images: currentImages};
    default:
      return state;
  }
};

export default imageReducer;
