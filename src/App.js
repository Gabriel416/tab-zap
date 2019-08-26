/*global chrome*/
import React, { useState, useEffect } from "react";
import { saveChanges, fetchSessions } from "./utils/";
import "./App.scss";

import SaveSession from "./components/SaveSession";
import SessionList from "./components/SessionList";

function App() {
  console.log(chrome, "chrome");
  const [view, setView] = useState("sessionList");
  const [buttonText, setButtonText] = useState("Save Current Tabs");
  const [sessions, setSessions] = useState(fetchSessions());

  useEffect(() => {
    buttonText === "Back" ? setView("saveSession") : setView("sessionList");
    setSessions(fetchSessions());
  }, [buttonText]);

  const renderView = view => {
    switch (view) {
      case "sessionList":
        return <SessionList sessions={sessions} />;
      case "saveSession":
        return <SaveSession onSubmit={saveSession} />;
      default:
        break;
    }
  };

  const saveSession = session => {
    setButtonText("Save Current Tabs");
    saveChanges(session);
  };

  return (
    <div className="App">
      <header className="App-header">
        <i>⚡</i>
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
      </header>
      {renderView(view)}
    </div>
  );
}

export default App;
