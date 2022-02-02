import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function PreviewPost(props) {
  const route_params = useParams();

  let [post_details, setPostDetails] = useState(null);

  useEffect(() => {
    getPostData();
  }, []);

  const getPostData = () => {
    let user_name = localStorage.getItem("current_username"); 
    axios({
      url: `http://localhost:8080/users/${user_name}/cars/${route_params.postId}`,
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      }
    }).then(res => {
      if(res.status == 200) {
        setPostDetails(res.data);
      } else {
        toast.info("Something went wrong, please relod the page");
      }
    })
  }

  return (
    <div className="preview-post">
      <div className="post-content">
        {post_details &&
          <>
            <p> Post-Id: {post_details.id} </p>
            <p> Description: {post_details.description} </p>
            <p> Manufacturer: {post_details.manufacturer} - Model: {post_details.model} </p>
            <p> Price: {post_details.price} </p>
            <p> Email: {post_details.email} </p>
            <p> Date posted: {post_details.dateBuild} </p>
          </>
        }
      </div>
    </div>
  );
}

export default PreviewPost;
