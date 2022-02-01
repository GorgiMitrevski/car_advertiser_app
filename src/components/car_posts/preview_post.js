import React, { Component } from "react";

class PreviewPost extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post_details: {}
    };
  }

  componentDidMount = () => {
    console.log('test');
    this.getPostData();
  }

  getPostData = () => {
    // TODO: do API call to backend to get data for post with that ID (which will be taken from params)
    console.log('getPostData');
  }

  render() {
    return (
      <div className="preview-post">
        <h2> Preview Car post - in new TAB </h2>
      </div>
    );
  }
}

export default PreviewPost;
