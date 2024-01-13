import React from 'react';
import { LayoutMain } from '../components/Layout';

export const Home = () => {
  return (
    <LayoutMain contentComponent={HomeContent}/>
  );
};

export const HomeContent = () => {
  return (
    <>
      <h1>Home</h1>
    </>
  );
};