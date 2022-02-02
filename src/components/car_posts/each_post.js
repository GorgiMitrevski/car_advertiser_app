import React, { useState, useEffect } from 'react';

function EachPostCard(props) {

  let [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(localStorage.getItem('current_username'));
    console.log(localStorage.getItem('current_username'));
  }, []);

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
      {username == props.post.user.username &&
        <button type="button" className="custom-btn"> Update </button>
      }
    </div>
  );
}

export default EachPostCard;
