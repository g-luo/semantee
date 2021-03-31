import React, { useRef, useEffect } from 'react';
import { useLocation, Switch } from 'react-router-dom';
import ScrollReveal from './utils/ScrollReveal';
import ReactGA from 'react-ga';
import classNames from 'classnames';

// Import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import LayoutDefault from './components/layout/LayoutDefault';

// Views 
// import Home from './views/Home';
import Routes from './utils/Routes';

// Initialize Google Analytics
ReactGA.initialize(process.env.REACT_APP_GA_CODE);

const trackPage = page => {
  ReactGA.set({ page });
  ReactGA.pageview(page);
};

const App = () => {

  const childRef = useRef();
  let location = useLocation();

  useEffect(() => {
    const page = location.pathname;
    document.body.classList.add('is-loaded')
    childRef.current.init();
    trackPage(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <LayoutDefault>
          <Routes />
        </LayoutDefault>
      )} />
  );
}

export default App;

// <Switch>
//    <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
// </Switch>