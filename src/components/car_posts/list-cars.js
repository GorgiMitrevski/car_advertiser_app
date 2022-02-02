import React, { useState, useEffect } from 'react';
import EachPostCard from "./each_post";
import AddCarModal from "../add-car-modal";
import axios from "axios";

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css"; // import css

function ListCars() {

  let [car_posts, setCarPosts] = useState([]);
  let [current_opened_preview, setForPreview] = useState({});
  let [add_modal_opened, setModalStatus] = useState(false);
  
  let [current_page, setCurrentPage] = useState(1);
  let [per_page_items, setPerPageItems] = useState(2);
  let [current_page_items, setCurrentPageItems] = useState([]);

  const changeCurrentPage = page_num => {
    setCurrentPage(page_num);
    
    let page_items_start = per_page_items * page_num - per_page_items;
    let page_items_end = page_items_start + per_page_items;

    setCurrentPageItems(car_posts.slice(page_items_start, page_items_end));
  };

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
      if(res.status == 200) {
        let sorted_posts_by_date = res.data.sort((a,b) => {
          return new Date(b.dateBuild) - new Date(a.dateBuild);
        });
        setCarPosts(sorted_posts_by_date);

        let page_items_start = per_page_items * current_page - per_page_items;
        let page_items_end = page_items_start + per_page_items;
        setCurrentPageItems(sorted_posts_by_date.slice(page_items_start, page_items_end));
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
    return current_page_items.map((post) => {
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

      <Pagination
        currentPage={current_page}
        totalSize={car_posts.length} // total length of items (car posts)
        sizePerPage={per_page_items}
        changeCurrentPage={changeCurrentPage}
      />

      {add_modal_opened &&
        <AddCarModal
          closeModal={openCloseAddModal}
        />
      }
      
    </div>
  );
}

export default ListCars;

