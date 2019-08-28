/*global chrome*/
import React, { Component } from "react";
import classnames from "classnames";

import TabView from "./TabView";
import AddTab from "./AddTab";

class SessionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTab: []
    };
  }

  toggleTabView = idx => {
    const updatedSessions = this.props.sessions.map((session, i) => {
      if (i === idx) {
        return {
          ...session,
          showTabs: !session.showTabs
        };
      }

      return session;
    });

    this.props.updateSessionData(updatedSessions);
  };

  handleTabDelete = ({ sessionIndex, tabIndex }) => {
    let selectedSession = { ...this.props.sessions[sessionIndex] };
    selectedSession.tabs = selectedSession.tabs.filter(
      (_, i) => i !== tabIndex
    );

    const updatedSessions = this.props.sessions.map((session, i) => {
      if (i === sessionIndex) {
        return selectedSession;
      }

      return session;
    });

    this.props.updateSessionData(updatedSessions);
  };

  handleTabAdd = ({ sessionIndex, tabData }) => {
    let sessionsCopy = [...this.props.sessions];
    sessionsCopy[sessionIndex].tabs = [
      ...sessionsCopy[sessionIndex].tabs,
      tabData
    ];

    this.setState(prevState => ({
      addTab: prevState.addTab.filter(i => i !== sessionIndex)
    }));

    this.props.updateSessionData(sessionsCopy);
  };

  handleSessionDelete = idx => {
    this.props.updateSessionData(
      this.props.sessions.filter((_, i) => i !== idx)
    );
  };

  openSession = tabs => {
    chrome.windows.create({ url: tabs.map(tab => tab.url) });
  };

  displaySessionList = sessions => {
    const { addTab } = this.state;
    return sessions.map(({ name, showTabs, tabs }, i) => {
      return (
        <div key={i} className="session-list-wrapper">
          <div className="session-item">
            <div className="session-overview">
              <p className="session-title">{name}</p>
              <p
                className="session-description"
                onClick={() => this.toggleTabView(i)}
              >
                {tabs.length} tabs
                <i
                  className={classnames(
                    showTabs ? "fa fa-chevron-down" : "fa fa-chevron-right"
                  )}
                ></i>
              </p>
            </div>
            <div className="session-actions">
              <span
                onClick={() => this.openSession(tabs)}
                className="open-session"
              >
                Open Session
              </span>
              <i
                onClick={() => this.handleSessionDelete(i)}
                className="fa fa-trash"
              ></i>
            </div>
          </div>
          {showTabs && (
            <div>
              <TabView
                sessionIndex={i}
                tabs={tabs}
                handleTabDelete={this.handleTabDelete}
              />
              {addTab.includes(i) ? (
                <AddTab sessionIndex={i} handleTabAdd={this.handleTabAdd} />
              ) : (
                <button
                  onClick={() =>
                    this.setState(prevState => ({
                      addTab: [...prevState.addTab, i]
                    }))
                  }
                  className="btn"
                  style={{ width: "75px" }}
                >
                  Add Tab
                </button>
              )}
            </div>
          )}
        </div>
      );
    });
  };

  render() {
    const { sessions } = this.props;

    return (
      <div>
        {sessions.length ? (
          this.displaySessionList(sessions)
        ) : (
          <p className="no-sessions">No sessions saved so far.</p>
        )}
      </div>
    );
  }
}

export default SessionList;
