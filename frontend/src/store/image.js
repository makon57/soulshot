// import { csrfFetch } from "./csrf";

// const GET_IMAGE = 'images/GET_IMAGE';

// export const getImage = (id) => {
//   return {
//     type: GET_IMAGE,
//     id,
//   }
// }

// export const deleteImage = (id) => async (dispatch) => {
//   const res = await csrfFetch(`/api/images/${id}`, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(id),
//   });
//   const newImage = await res.json();

//   return newImage
// }
