import React from 'react';
import { NavLink } from 'react-router-dom';

const IntroText = () => {
    return(
      <div>
        <h2>Welcome to the Sports News Feed App</h2>
        <p>This app pulls NBA, NFL, and other sports news, from ESPN, Fox Sports, and NFL News via NewsAPI. You can read a short description, favorite, and take notes on stories. Links to the stories open in a new tab. Sign in or sign up to favorite and take notes on stories.</p>
        <h3><NavLink to="/news">News Feed</NavLink></h3>
      </div>
    )
};

export default IntroText;
