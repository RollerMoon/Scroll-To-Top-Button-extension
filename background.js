// Creates options defaults in case user hasn't set them yet
  if (!localStorage["scroll_speed"]) {
    localStorage["scroll_speed"] = 1000;
  }
  if (!localStorage["scroll_speed2"]) {
    localStorage["scroll_speed2"] = localStorage["scroll_speed"];
  }
  if (!localStorage["distance_length"]) {
    localStorage["distance_length"] = 400;
  }
  if (!localStorage["size"]) {
    localStorage["size"] = "50px";
  }
  if (!localStorage["arrow"]) {
    localStorage["arrow"] = "arrow_blue";
  }
  if (!localStorage["location"]) {
    localStorage["location"] = "TR";
  }
  if (!localStorage["stbb"]) {
    localStorage["stbb"] = "off";
  }
  if (!localStorage["transparency"]) {
    localStorage["transparency"] = "0.5";
  }
  if (!localStorage["contextmenu"]) {
    localStorage["contextmenu"] = "on";
  }
    if (!localStorage["shortcuts"]) {
    localStorage["shortcuts"] = "arrows";
  }
  if (!localStorage["loadcount"]) {
    localStorage["loadcount"] = "0";
  }
  if ((localStorage["loadcount"]=="40") && (localStorage["bothered"]!="1")) {
      localStorage["bothered"]="1";
      chrome.tabs.create({url:'http://scrolltotopbutton.com/STTBdonate',selected:false});
  }
  if (localStorage["stbb"]=="on") {
    localStorage["stbb"] = "flip";
  }
  if (localStorage["latest"]!="2"){
    localStorage["latest"]="2";
    chrome.tabs.create({url:'/options.html',selected:false});
  }

// Counts number of times Chrome has been opened to load donation message after certain amount
loadcount=localStorage["loadcount"];
loadcount++;
localStorage["loadcount"]=loadcount;

// Message passer to give [LocalStorage] settings to content_script.js because it is not allowed access to [LocalStorage]
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.greeting == "settings")
      sendResponse({speed: localStorage["scroll_speed"], speed2: localStorage["scroll_speed2"], distance: localStorage["distance_length"], size: localStorage["size"], arrow: localStorage["arrow"], scroll:"jswing", location: localStorage["location"], stbb: localStorage["stbb"],  transparency: localStorage["transparency"], shortcuts: localStorage["shortcuts"]});
    else if (request.greeting == "donated")
      localStorage["donated"] = "1";
    else
      sendResponse({}); // snub them.
  });