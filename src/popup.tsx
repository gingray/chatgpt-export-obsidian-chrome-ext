// 'use strict';
'use strict';

import './styles/app.sass';
import React from "react";
import {createRoot} from "react-dom/client";
import {App} from "./app";

(function () {
  const element = document.getElementById('app')
  const root = createRoot(element!)
  chrome.runtime.onMessage.addListener((req, sender, response) => {
    console.log("from content script", req, sender, response)
  })
  root.render(<React.StrictMode> <App/> </React.StrictMode> )
})()
