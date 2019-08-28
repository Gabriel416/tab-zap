/*global chrome*/
const SESSIONS = "SESSIONS";

export const saveChanges = async session => {
  const sessions = await fetchSessions();
  sessions.length
    ? chrome.storage.local.set({ SESSIONS: [...sessions, session] })
    : chrome.storage.local.set({ SESSIONS: [session] });
};

export const fetchSessions = () => {
  return new Promise(resolve => {
    chrome.storage.local.get([SESSIONS], data => {
      resolve(Object.keys(data).length ? data.SESSIONS : []);
    });
  });
};

export const updateSessions = updatedSessions => {
  chrome.storage.local.set({ SESSIONS: updatedSessions });
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
