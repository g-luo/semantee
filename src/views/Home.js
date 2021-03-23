import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import Cta from '../components/sections/Cta';
import FeaturesTiles from '../components/sections/About/FeaturesTiles';

const Home = () => {

  return (
    <>
      <Hero className="gradient-background-01" />
      <FeaturesTiles />
      <Cta split />
    </>
  );
}

export default Home;