/*global chrome*/
import React, { useState, useEffect } from "react";
import { saveChanges, fetchSessions, updateSessions } from "./utils/";
import "./App.scss";

import SaveSession from "./components/SaveSession";
import SessionList from "./components/SessionList";

function App() {
  const [view, setView] = useState("sessionList");
  const [buttonText, setButtonText] = useState("Save Current Tabs");
  const [sessions, setSessions] = useState([]);

  useEffect(async () => {
    setSessions(await fetchSessions());
  }, []);

  useEffect(() => {
    buttonText === "Back" ? setView("saveSession") : setView("sessionList");
  }, [buttonText]);

  const renderView = view => {
    switch (view) {
      case "sessionList":
        return (
          <SessionList
            sessions={sessions}
            updateSessionData={updateSessionData}
          />
        );
      case "saveSession":
        return <SaveSession onSubmit={saveSession} />;
      default:
        break;
    }
  };

  const saveSession = async session => {
    await saveChanges(session);
    setSessions(await fetchSessions());
    setButtonText("Save Current Tabs");
  };

  const updateSessionData = async sessions => {
    await updateSessions(sessions);
    setSessions(await fetchSessions());
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <i>Tab Zap ⚡</i>
          <button
            className="btn"
            onClick={() =>
              setButtonText(buttonText =>
                buttonText === "Back" ? "Save Current Tabs" : "Back"
              )
            }
          >
            {buttonText}
          </button>
        </div>
      </header>
      {renderView(view)}
    </div>
  );
}

export default App;
