import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { fetchData } from '../api';
import './styles.css';

const resource = fetchData();

export const App = () => (
  <div className="App">
    <Suspense fallback={<h1>Loading...</h1>}>
      <ProfileDetails />
      <Suspense fallback={<h1>Loading Posts..</h1>}>
        <ProfilePosts />
      </Suspense>
    </Suspense>
  </div>
);

const ProfileDetails = () => {
  const user = resource.user.read();
  return (
    <div>
      <h1>{user.name}</h1>
      <ul>
        <li className="list">Username:{user.username}</li>
        <li className="list">Email:{user.email}</li>
        <li className="list">City:{user.address.city}</li>
      </ul>
    </div>
  );
};

const ProfilePosts = () => {
  // const posts = resource.posts.read();
  return (
    <ul className="un-list">
      <li className="list">
        <strong>Latest Posts</strong>
      </li>
      {/* {posts.map((post) => (
        <li className="list" key={post.id}>
          {post.title}
        </li>
      ))} */}
    </ul>
  );
};
