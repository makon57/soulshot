// import images from "../data/images.json";

import { csrfFetch } from "./csrf";

const GET_IMAGES = 'images/getImages';
const ADD_IMAGE = 'images/addImage';

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

export const fetchImages = () => async (dispatch) => {
  const res = await fetch('/api/images');
  const images = await res.json();
  dispatch(getImages(images));
}

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

const initalState = { images: [], isLoading: true };

const imageReducer = (state = initalState, action) => {
  console.log(action);
  switch (action.type) {
    case GET_IMAGES:
      return { ...state, images: [...action.images]};
    case ADD_IMAGE:
      return { ...state, images: [...state.images, action.newImage] };
    default:
      return state;
  }
};

export default imageReducer;
