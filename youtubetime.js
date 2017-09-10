// ==UserScript==
// @name         youtube time
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://youtube.com/*
// @grant        none
// ==/UserScript==

const BASE_STRING = getBaseStr();

//setInterval(function that appends url, 1,000)

setInterval(putNewTime, 1000);

function getBaseStr() {
  // "https://www.youtube.com/watch?v=y4gZMJKAeWs" =>  "watch?v=y4gZMJKAeWs"
  return getUrl().split(".com/")[1];
}

function getUrl() {
  return window.location.href;
}

function putNewTime() { // formatted as "t=4m30s"
  window.history.replaceState({}, "watch", [BASE_STRING, getTime()].join("&"));
}

function getTimeUnformatted() {
  return document.querySelector(".ytp-time-current").innerText;
}

function getTime() {
  var t = getTimeUnformatted();
  var timeArray = t.split(":");
  if (timeArray.length === 2) {
    timeArray[0] += "m";
    timeArray[1] += "s";
  } else if (timeArray.length === 3) {
    timeArray[0] += "h";
    timeArray[1] += "m";
    timeArray[2] += "s";
  }
  return timeArray.join("");
}
