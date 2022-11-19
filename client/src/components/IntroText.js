import React from 'react';
import { NavLink } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

const IntroText = () => {
  return (
    <div>
      <Breadcrumb>
        <BreadcrumbItem>
          <h2>Welcome to the Sports News Feed App</h2>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem>
          <p>This app retrieves sports new via NewsAPI.</p>
        </BreadcrumbItem>
      </Breadcrumb>
      <Breadcrumb>
        <BreadcrumbItem>
          <h3>
            <NavLink to="/news">News Feed</NavLink>
          </h3>
        </BreadcrumbItem>
      </Breadcrumb>
    </div>
  );
};

export default IntroText;
