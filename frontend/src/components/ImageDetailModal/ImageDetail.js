import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import './ImageDetail.css';
import '../Comment/Comments.css';

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
  let editForm = null;
  if (showEditImage && sessionUser) {
    editForm = (
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
  // console.log(sessionUser);
  const things = sortedComments.filter(COM => COM.userId === sessionUser?.id)
  if (!sessionUser) {
    collections = null;
  } else if (sessionUser && things.length === 0) {
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
  } else if (sessionUser && things.length > 0) {
    collections = (
      <div>
        <AlbumsModal image={image} />
        <div>
          {comment}
        </div>
      </div>
    )
  }

  let content;
  if (!sessionUser) {
    ;
  } else if (sessionUser.id === image.userId) {
    content = (
      <div>
        <div>
          {editForm}
        </div>
        <div className="editImageButtons">
          {(!showEditImage) && (
            <button className="edit-comment-btn" onClick={() => setShowEditImage(true)}><i className="fas fa-edit"></i></button>
          )}
          <button className="delete-comment-btn" onClick={deletingImage}><i className="far fa-trash-alt"></i></button>
        </div>

      </div>
    )
  }


  let commentList = null;
  if (sortedComments.length > 0) {
    commentList = (
      <div className="comment-container">
        <ul className="comment-ul">
          {sortedComments?.map((comment) => {
            let commentED;
            if (!sessionUser) {
              commentED = (
                <li key={comment.id} className="comment-li">
                  <div className="comment-nav">
                    <i className="fas fa-user-circle username">  {comment.User.username}</i>
                  </div>
                  <p>{comment.comment}</p>
                </li>
              )
            } else if (comment.userId !== sessionUser.id) {
              commentED = (
                <li key={comment.id} className="comment-li">
                  <div className="comment-nav">
                    <i className="fas fa-user-circle username">  {comment.User.username}</i>
                  </div>
                  <p>{comment.comment}</p>
                </li>
              );
            }else if (comment.userId === sessionUser.id) {
              commentED = (
                <li key={comment.id} className="comment-li">
                  <div className="comment-nav">
                    <i className="fas fa-user-circle username">  {comment.User.username}</i>
                    <div className="editbuttons">
                      <button className="edit-comment-btn" onClick={() => setShowComment(true)}><i className="fas fa-edit"></i></button>
                      <button className="delete-comment-btn" onClick={() => commentDelete(image.id, comment.id)}><i className="far fa-trash-alt"></i></button>
                    </div>
                  </div>
                  <p>{comment.comment}</p>
                </li>
              );
            }
            return commentED;
          })}
        </ul>
        <br></br>
      </div>
    );
  };

  return (
    <div className="holder">
      <div className="image-container">
        <img src={image.imageUrl} alt={image.id}></img>
      </div>
      <div className="information">
        <h4>{image.title}</h4>
        <h3>{image.userId.username}</h3>
        <p>{image.description}</p>
        {content}
      </div>
      {collections}
      <div>
        <br></br>
      </div>
      {commentList}
    </div>
  );
};

export default ImageDetail;
