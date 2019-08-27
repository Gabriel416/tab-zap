/*global chrome*/
import React, { Component } from "react";
import { validURL } from "../utils/";

class AddTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      link: null,
      error: ""
    };
  }

  handleSubmit = e => {
    const { sessionIndex, handleTabAdd } = this.props;
    e.preventDefault();
    this.setState({ error: "" });
    if (validURL(this.state.link)) {
      chrome.tabs.query({ url: this.state.link }, tabData => {
        handleTabAdd({ sessionIndex, tabData: tabData[0] });
      });
    } else {
      this.setState({ error: "Invalid URL" });
    }
  };

  render() {
    const { link, error } = this.state;
    return (
      <div className="add-tab">
        <form onSubmit={this.handleSubmit}>
          <input
            className={error ? "error" : ""}
            type="text"
            placeholder="Enter Link"
            value={link}
            onChange={e => this.setState({ link: e.target.value })}
          />
          <button className="btn add-link-btn" type="submit">
            Add
          </button>
          <p className="error-text">{error}</p>
        </form>
      </div>
    );
  }
}

export default AddTab;
