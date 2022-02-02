import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function EachPostCard(props) {
  const navigate = useNavigate();

  let [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('current_username'));
  }, []);

  const navigateToPreview = () => {
    navigate(`/dashboard/${props.post.id}`);
  }

  return (
    <div className="each-post-card">
      <h2 className="title"> {props.post.title} </h2>
      <div className="post-content">
        <p> Post-Id: {props.post.user.username} </p>
        <p> Description: {props.post.description} </p>
        <p> Manufacturer: {props.post.manufacturer} - Model: {props.post.model} </p>
        <p> Price: {props.post.price} </p>
        <p> Email: {props.post.email} </p>
        <p> Date posted: {props.post.dateBuild} </p>
      </div>
      <div className="post-card-buttons">
        {username == props.post.user.username &&
          <>
            <button type="button" className="custom-btn tab-btn" onClick={ () => { props.openUpdateCar(props.post, true) } }> Update </button>
            <button type="button" className="custom-btn tab-btn" onClick={ () => { props.deleteCarPost(props.post.id) } }> Delete </button>
          </>
        }
        <button type="button" className="custom-btn tab-btn" onClick={navigateToPreview}> Preview </button>
      </div>
    </div>
  );
}

export default EachPostCard;
