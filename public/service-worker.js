chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-context",
    title: "Open Einstein",
    contexts: ["page"],
  });
  chrome.contextMenus.create({
    id: "consult-context",
    title: "Consult Einstein",
    contexts: ["selection"],
  });
});

const setStorage = async (openMethod, selectionText, tab) => {
  chrome.storage.local.set({
    openMethod: openMethod,
    selectionText: selectionText,
    pageContent: await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: () => document.body.innerText,
    }),
  });
};

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab.windowId !== -1) {
    if (info.menuItemId === "open-context") {
      // This will open the panel in all the pages on the current window.
      console.log("open-context called");
      chrome.sidePanel.open({ windowId: tab.windowId });
      setStorage("open-context", "", tab);
    }
    if (info.menuItemId === "consult-context") {
      // This will open the panel in all the pages on the current window.
      console.log("consult-context called");
      chrome.sidePanel.open({ windowId: tab.windowId });
      // console.log(info.selectionText);
      setStorage("consult-context", info.selectionText, tab);
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
  setStorage("open-context", "", tab);
});
