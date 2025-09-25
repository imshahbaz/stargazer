import * as React from 'react';
import CarousalBar from '../components/CarousalBar';

export default function HomePage({ drawer }) {
  return (
    <>
      <CarousalBar drawer={drawer}></CarousalBar>
    </>
  );
}
