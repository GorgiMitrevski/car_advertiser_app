import React, { Component } from "react";

class EachPostCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_details: {}
    };
  }

  componentDidMount = () => {
    // TODO: from props take data for each post and fill card details (state: post_details)
  }

  render() {
    return (
      <div className="each-post-card">
        <h2 className="title"> {this.props.post.title} </h2>
        <div className="post-content">
          <p> Post-Id: {this.props.post.id} </p>
          <p> Description: {this.props.post.description} </p>
        </div>
      </div>
    );
  }
}

export default EachPostCard;
