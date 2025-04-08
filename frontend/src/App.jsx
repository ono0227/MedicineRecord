import React from 'react';
import Router from './Router';
import { Header } from './components/Header';
import { ScrollToTop } from './components/UIkit';
import { Footer } from './components/Footer';
import backgroundimage from './assets/img/backgroundimage.jpeg';
import './assets/reset.css';
import './assets/style.css';

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="c-main">
        <div
          style={{
            backgroundImage: `url(${backgroundimage})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            minHeight: '100vh',
          }}
        >
          <Router />
        </div>
      </main>
      <Footer />
    </>
  );
};

export default App;
