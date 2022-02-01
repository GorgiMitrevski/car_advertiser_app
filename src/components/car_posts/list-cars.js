import React, { useState, useEffect } from 'react';
import EachPostCard from "./each_post";
import AddCarModal from "../add-car-modal";
import axios from "axios";

function ListCars() {

  let [car_posts, setCarPosts] = useState([]);
  let [current_opened_preview, setForPreview] = useState({});
  let [add_modal_opened, setModalStatus] = useState(false);

  useEffect(() => {
    getAllPosts();
  }, []);

  const getAllPosts = () => {
    axios({
      url: "http://localhost:8080/cars",
      method: "GET",
      headers: {
        authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
      },
    }).then(res => {
      console.log('res: ', res);
      if(res.status == 200) {
        setCarPosts(res.data);
      } else {
        console.log('error - something is wrong');
      }
    })
  }

  const openCloseAddModal = () => {
    if(add_modal_opened == true) {
      getAllPosts();
    }
    setModalStatus(!add_modal_opened);
  }

  const deletePost = (post) => {
    // TODO: delete post - this option is available only if post is attached by current userx
  };

  const renderPosts = () => { // render all car posts
    let sorted_posts_by_date = car_posts.sort((a,b) => {
      return new Date(b.dateBuild) - new Date(a.dateBuild);
    });

    return sorted_posts_by_date.map((post) => {
      return (
        <EachPostCard
          key={post.id}
          post={post}
        />
      );
    });
  };

  return (
    <div className="list_cars">
      
      <button type="button" className="custom-btn"
        onClick={openCloseAddModal}
      > Add new post </button>

      {car_posts.length > 0 ?
        renderPosts()
      :
        <h2> There are no posts yet in our system </h2>
      }

      {add_modal_opened &&
        <AddCarModal
          closeModal={openCloseAddModal}
        />
      }
      
    </div>
  );
}

export default ListCars;

