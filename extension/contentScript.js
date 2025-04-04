"use strict";

window.addEventListener("message", function (event) {
  if (event.source == window && event.data) {
    if (event.data.type == "send-request") {
      chrome.runtime.sendMessage(event.data, function (response) {
        window.postMessage(
          {
            type: "receive-response",
            response,
          },
          "*"
        );
      });
    } else if (event.data.type == "ping") {
      chrome.runtime.sendMessage(event.data, function () {
        window.postMessage(
          {
            type: "pong",
            version: chrome.runtime.getManifest().version,
          },
          "*"
        );
      });
    } else if (event.data.type == "ws-connect") {
      chrome.runtime.sendMessage(event.data, function (result) {
        console.log("ws-connect-result", result);
        window.postMessage({ type: "ws-connect-result", result }, "*");
      });
    } else if (event.data.type == "ws-disconnect") {
      chrome.runtime.sendMessage(event.data, function (result) {
        window.postMessage({ type: "ws-disconnect-result", result }, "*");
      });
    } else if (event.data.type == "ws-write") {
      chrome.runtime.sendMessage(event.data, function (result) {
        window.postMessage({ type: "ws-write-result", result }, "*");
      });
    }
  }
});

chrome.runtime.onMessage.addListener((message) => {
  if (
    message.type === "ws-read" ||
    message.type === "ws-close"
  ) {
    window.postMessage(message, "*");
  }
});
