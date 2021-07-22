import { csrfFetch } from "./csrf";

const GET_ALBUMS = 'albums/getAlbums';
const ADD_ALBUM = 'albums/addAlbum';
// const UPDATE_IMAGE = 'images/updateImage';
// const REMOVE_IMAGE = 'images/removeImage';

export const getAlbums = (albums) => {
  return {
    type: GET_ALBUMS,
    albums,
  }
}

export const addAlbum = (newAlbum) => {
  return {
    type: ADD_ALBUM,
    newAlbum
  };
};

// export const updateImage = (image) => {
//   return {
//     type: UPDATE_IMAGE,
//     image
//   }
// }

// export const removeImage = (images) => {
//   return {
//     type: REMOVE_IMAGE,
//     images
//   };
// };

export const fetchAlbums = (user) => async (dispatch) => {
  const res = await csrfFetch('/api/albums', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user),
  });
  const albums = await res.json();
  dispatch(getAlbums(albums));
}

export const createAlbum = (payload) => async (dispatch) => {
  const res = await csrfFetch('/api/albums/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const newAlbum = await res.json();

  if (res.ok) {
    dispatch(addAlbum(newAlbum));
  }
  return newAlbum;
}

// export const editImage = (id, payload) => async (dispatch) => {
//   const res = await csrfFetch(`/api/images/${id}`, {
//     method: 'PUT',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(payload),
//   });

//   const image = await res.json();
//   if (res.ok) {
//     dispatch(updateImage(image));
//   }
//   return image;
// }

// export const deleteImage = (id) => async (dispatch) => {
//   const res = await csrfFetch(`/api/images/${id}/delete`, {
//     method: 'DELETE',
//   });

//   const images = await res.json();
//   dispatch(removeImage(images));
// }

const initalState = { albums: {}, isLoading: true };

const albumReducer = (state = initalState, action) => {
  switch (action.type) {
    case GET_ALBUMS:
      const allAlbums = {};
      action.albums.forEach(album => allAlbums[album.id] = album)
      return { ...state, albums: allAlbums};
    case ADD_ALBUM:
      return { ...state, albums: {[action.newAlbum.id]: action.newAlbum, ...state.albums}};
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

export default albumReducer;
