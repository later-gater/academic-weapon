chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "open-einstein",
    title: "Open Einstein",
    contexts: ["page"],
  });
  chrome.contextMenus.create({
    id: "consult-einstein",
    title: "Consult Einstein",
    contexts: ["selection"],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (tab.windowId !== -1) {
    if (info.menuItemId === "open-einstein") {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId });
    }
    if (info.menuItemId === "consult-einstein") {
      // This will open the panel in all the pages on the current window.
      chrome.sidePanel.open({ windowId: tab.windowId });
      // console.log(info.selectionText);
    }
  }
});

chrome.action.onClicked.addListener((tab) => {
  chrome.sidePanel.open({ windowId: tab.windowId });
});
