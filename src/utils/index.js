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
  return JSON.parse(localStorage.getItem(SESSIONS)) || [];
};

export const updateSessions = updatedSessions => {
  console.log(updatedSessions, "updateSessio");
  localStorage.setItem(SESSIONS, JSON.stringify(updatedSessions));
  console.log(fetchSessions(), "lastest");
};

export const validURL = str => {
  var pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
    "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
    "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
    "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
    "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator

  return !!pattern.test(str);
};
