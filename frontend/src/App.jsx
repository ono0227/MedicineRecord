import React from 'react';
import Router from './Router'
import { Header } from './components/Header';
import {Footer, ScrollToTop} from './components/UIkit'
import "./assets/reset.css"
import "./assets/style.css"

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="c-main">
        <Router />
      </main>
      <Footer />
    </>
  );
};

export default App;
