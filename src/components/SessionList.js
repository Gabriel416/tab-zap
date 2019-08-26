/*global chrome*/
import React, { Component } from "react";

class SessionList extends Component {
  constructor(props) {
    super(props);
  }

  displaySessionList = sessions => {
    return sessions.map(({ name, tabs }, i) => {
      return (
        <div key={i}>
          <p>{name}</p>
          {tabs.map((tab, i) => {
            return <p>hello</p>;
          })}
        </div>
      );
    });
  };

  render() {
    const { sessions } = this.props;

    return (
      <div>
        {sessions
          ? this.displaySessionList(sessions)
          : "No sessions saved so far."}
      </div>
    );
  }
}

export default SessionList;
