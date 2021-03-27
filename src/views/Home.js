import React from 'react';
// import sections
import Hero from '../components/sections/Hero';
import Cta from '../components/sections/Cta';
import FeaturesTiles from '../components/sections/About/FeaturesTiles';
import Demo from '../components/demo/Demo';

const Home = () => {

  return (
  	<div>
  		<Hero />
		<FeaturesTiles className="light-2-background" />
	</div>
  );
}

export default Home;

// <Cta split className="light-2-background" />

