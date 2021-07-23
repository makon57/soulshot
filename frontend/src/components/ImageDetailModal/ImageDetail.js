import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './ImageDetail.css';

import { deleteComment, fetchComments } from "../../store/comments";
import { deleteImage } from "../../store/home";
import ImageList from "../ImageList";
import EditImage from "./EditImages";
import AlbumsModal from "../AlbumsModal";
import Comment from "../Comment";



const ImageDetail = ({ image, setShowModal }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  let sessionUser = useSelector(state => state.session.user);

  const [showEditImage, setShowEditImage] = useState(false);
  const [showComment, setShowComment] = useState(false);
  // const [showEditComment, setShowEditComment] = useState(false);

  const comments = Object.values(useSelector((state) => state.comment.comments));
  const sortedComments = comments.slice(0).reverse();


  // FUNCTIONS
  const deletingImage = async (e) => {
    e.preventDefault();

    let deletedImage = dispatch(deleteImage(image.id));
    if (deletedImage) {
      setShowModal(false);
      history.push(<ImageList />);
    }
  }

  const commentDelete = async (imageId, commentId) => {
    dispatch(deleteComment(imageId, commentId));
  }


  // USE EFFECTS
  useEffect(() => {
    dispatch(fetchComments(image.id));
  }, [dispatch, image]);

  useEffect (() => {
    setShowEditImage(false);
  }, [image.id]);

  useEffect (() => {
    setShowComment(false);
  }, [image.id]);


  //CONTENT
  let content = null;
  if (showEditImage && sessionUser) {
    content = (
      <EditImage image={image} hideForm={() => setShowEditImage(false)} />
    )
  }

  let comment = null;
  if (showComment && sessionUser) {
    comment = (
      <Comment image={image} hideForm={() => setShowComment(false)} sortedComments={sortedComments} />
    )
  }

  let collections = null;
  if (sessionUser) {
    collections = (
      <div>
        <AlbumsModal image={image} />
        <div>
          {(!showComment) && (
            <button className="edit-btn" onClick={() => setShowComment(true)}>Comment</button>
          )}
        </div>
        <div>
          {comment}
        </div>
      </div>
    )
  }

  if (!sessionUser) {
    ;
  } else if (sessionUser.id === image.userId) {
    content = (
      <div>
        <div>
          {(!showEditImage) && (
            <button className="edit-btn" onClick={() => setShowEditImage(true)}>Edit</button>
          )}
        </div>
        <div>
          {content}
        </div>
        <div>
          <button className="delete-btn" onClick={deletingImage}>Delete</button>
        </div>
      </div>
    )
  }



  return (
    <div className="holder">
      <div className="image-container">
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div className="information">
        <h4>{image.title}</h4>
        <h3>{image.userId.username}</h3>
        <p>{image.description}</p>
      </div>
      {content}
      {collections}
      <div>
        <br></br>
      </div>
      <div>
        <ul>
          {sortedComments.map((comment) => (
            <li key={comment.id}>
              <h5>{comment.userId}</h5>
              <p>{comment.comment}</p>
              <button onClick={() => setShowComment(true)}>Edit Comment</button>
              <button onClick={() => commentDelete(image.id, comment.id)}>Delete Comment</button>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
};

export default ImageDetail;
