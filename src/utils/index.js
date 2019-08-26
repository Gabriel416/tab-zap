/*global chrome*/
const SESSIONS = "SESSIONS";

export const saveChanges = session => {
  const sessions = fetchSessions();
  if (sessions) {
    localStorage.setItem(SESSIONS, JSON.stringify([...sessions, session]));
  } else {
    localStorage.setItem(SESSIONS, JSON.stringify([session]));
  }
};

export const fetchSessions = () => {
  return JSON.parse(localStorage.getItem(SESSIONS));
};
