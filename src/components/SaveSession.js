/*global chrome*/
import React, { Component } from "react";
import classnames from "classnames";
import { ninvoke } from "q";

class SaveSession extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      error: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: "" });
    if (!this.state.name) {
      this.setState({ error: "Please enter a name" });
      return;
    }

    // Call cb with name here with tabs list

    console.log(e, "e");
    chrome.tabs.getAllInWindow(null, tabs => {
      this.props.onSubmit({ name: this.state.name, tabs });
    });
  };

  render() {
    const { name, error } = this.state;
    return (
      <div>
        <form className="save-session-form" onSubmit={this.handleSubmit}>
          <label className="save-session-label" htmlFor="name">
            Name:
          </label>
          <input
            className={classnames("save-session-item", error ? "error" : "")}
            type="text"
            placeholder={error}
            onChange={e => this.setState({ name: e.target.value })}
            value={name}
          />
          <button className="save-session-item btn" type="submit">
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default SaveSession;
