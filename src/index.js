import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import FeedBackForm from './components/feedbackform'
import {
    BrowserRouter,
    Route,
    Routes
  } from "react-router-dom";

ReactDOM.render(
        <BrowserRouter>
            <Routes>
                <Route path='feedback' element={<FeedBackForm/>}></Route>
                <Route path='/' element={<App/>}></Route>
            </Routes>
        </BrowserRouter>
    , document.getElementById('root'))