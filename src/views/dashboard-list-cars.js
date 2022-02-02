import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from "react-toastify";

import Pagination from "react-pagination-js";
import "react-pagination-js/dist/styles.css";

import AddCarModal from '../components/modals/add-car-modal';
import EachPostCard from '../components/car_posts/each-post';


function ListCars() {

  let [car_posts, setCarPosts] = useState([]);
  let [add_modal_opened, setModalStatus] = useState(false);
  
  let [current_page, setCurrentPage] = useState(1);
  let [per_page_items, setPerPageItems] = useState(2);
  let [current_page_items, setCurrentPageItems] = useState([]);

  let [current_car_for_update, setCurrentCarForUpdating] = useState(null);

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
        toast.info("Something is wrong with connection, please reload the page");
      }
    })
  }

  const openCloseAddModal = (post, is_update) => {
    if(is_update) {
      setCurrentCarForUpdating(post);
    } else {
      setCurrentCarForUpdating(null);
    }
    if(add_modal_opened == true) {
      getAllPosts();
    }
    setModalStatus(!add_modal_opened);
  }

  const deleteCarPost = (post_id) => {
    let confirmDelete = window.confirm("Are you sure you want to delete this car ?");
    if(confirmDelete) {
      let user_name = localStorage.getItem('current_username');
      axios({
        url: `http://localhost:8080/users/${user_name}/cars/${post_id}`,
        method: 'DELETE',
        headers: {
          authorization: `Bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
      }).then(res => {
        if(res.status = 200) {
          toast.success("Car sucessfully deleted");
          getAllPosts();
        } else {
          toast.error("Something went wrong, please try again");
        }
      })
    }
  };

  const renderPosts = () => { // render all car posts
    return current_page_items.map((post) => {
      return (
        <EachPostCard
          deleteCarPost={deleteCarPost}
          openUpdateCar={openCloseAddModal}
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
      > Add new car </button>

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
          key={current_car_for_update}
          current_car_for_update={current_car_for_update}
          closeModal={openCloseAddModal}
        />
      }
      
    </div>
  );
}

export default ListCars;

