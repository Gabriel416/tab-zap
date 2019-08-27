/*global chrome*/
import React from "react";

const TabView = ({ sessionIndex, tabs, handleTabDelete }) => {
  const handleFaviconErr = e => {
    e.target.src = "chrome://favicon/chrome://newtab/";
    // e.target.style.opacity = 0;
  };

  const openNewTab = (e, url) => {
    e.preventDefault();
    chrome.tabs.create({ url, active: false });
    return false;
  };

  const renderTabView = tabs => {
    return tabs.map(({ favIconUrl, title, url }, i) => {
      return (
        <div className="tab-wrapper">
          <a
            className="tab-description"
            href={url}
            target="_blank"
            onClick={e => openNewTab(e, url)}
          >
            <img
              onError={e => handleFaviconErr(e)}
              src={favIconUrl}
              alt="tab favicon"
            />
            <p>{title}</p>
          </a>
          <i
            onClick={() => handleTabDelete({ sessionIndex, tabIndex: i })}
            className="fa fa-minus-circle"
          ></i>
        </div>
      );
    });
  };

  return <div>{tabs && renderTabView(tabs)}</div>;
};

export default TabView;
