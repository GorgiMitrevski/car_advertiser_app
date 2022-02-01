import React, { Component } from "react";
import { Link } from "react-router-dom";
import EachPostCard from "./each_post";

class ListCars extends Component {
  constructor(props) {
    super(props);

    this.state = {
      car_posts: [
        // dummy data for posts
        {id: '1', title: 'test-1 title', description: 'test-1 description'},
        {id: '2', title: 'test-2 title', description: 'test-2 description'},
        {id: '3', title: 'test-3 title', description: 'test-3 description'},
      ],
      current_opened_preview: {},
      add_modal_opened: false,
    };
  }

  componentDidMount = () => {
    this.getAllPosts();
  }

  getAllPosts = () => {
    // TODO: get all posts after component is mount and list down
    console.log('getAllPosts');
  }

  openAddPostModal = () => {
    // This is triggered on click of 'Add new post' button
    // TODO: create new component(modal) for adding new post, and in this method open that modal
    // for adding new post
    console.log('clicked Add Post btn');
  }

  deletePost = (post) => {
    // TODO: delete post - this option is available only if post is attached by current userx
  };

  // renderProjectTable() {
  //   return this.props.projects.map((project) => {
  //     const { Id, Name, Description } = project;
  //     return (
  //       <tr key={Id}>
  //         <td> {Name} </td>
  //         <td> {Description} </td>
  //         <td>
  //           <Link
  //             to={{
  //               pathname: `/preview-project/${Id}`,
  //               query: { project: project },
  //             }}
  //             className="btn btn-info"
  //           >
  //             View Project
  //           </Link>
  //         </td>
  //         <td>
  //           <button className="btn btn-success"
  //             onClick={() => { this.openUpdateModal(Id) }}
  //           >
  //             Update Project
  //           </button>
  //         </td>
  //         <td>
  //           <button className="btn btn-danger"
  //             onClick={() => { this.deleteProject(project); }}
  //           >
  //             Delete Project
  //           </button>
  //         </td>
  //       </tr>
  //     );
  //   });
  // }

  renderPosts() {
    return this.state.car_posts.map((post) => {
      return (
        <EachPostCard
          key={post.id}
          post={post}
        />
      );
    });
  }

  render() {
    return (
      <div className="list-cars">
        
        <button type="button" className="custom-btn"
          onClick={this.openAddPostModal}
        > Add new post </button>

        {this.state.car_posts.length > 0 ?
          this.renderPosts()
        :
          <h2> There are no posts yet in our system </h2>
        }
        {/* <ReusableModal
          key={this.state.current_opened_preview.Name}
          modalOpen={this.state.modalOpen}
          closeModal={this.closeModal}
          projectForUpdating={this.state.current_opened_preview}
        /> */}
      </div>
    );
  }
}

export default ListCars;
