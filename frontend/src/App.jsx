import React from 'react';
import Router from './Router'
import Header from './components/Header/Header';

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
};

export default App;
