import images from "../data/images.json";

const GET_IMAGES = 'images/getImages';
const ADD_IMAGE = 'iamges/addImage';

export const getImages = () => {
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

const initalState = { images: [], isLoading: true };

const imageReducer = (state = initalState, action) => {
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
