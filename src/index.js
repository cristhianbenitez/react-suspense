import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { fetchData } from './api';
//here we fetch our resources first
const SuspensefulUserProfile = (userId) => {
  const resource = fetchData(userId);
  return (
    <Suspense fallback={<h1>Loading Users...</h1>}>
      <UserProfile resource={resource} />
    </Suspense>
  );
};
const UserProfile = ({ resource }) => {
  const data = resource.user.read();
  return (
    <>
      <h1>{data.name}</h1>
      <h2>{data.email}</h2>
    </>
  );
};

const UserProfileList = () => (
  <>
    <SuspensefulUserProfile userId={1} />
    <SuspensefulUserProfile userId={2} />
    <SuspensefulUserProfile userId={3} />
  </>
);

const rootElement = document.getElementById('root');
ReactDOM.createRoot(rootElement).render(<UserProfileList />);
