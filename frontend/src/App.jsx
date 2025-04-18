import React from 'react'
import Router from './Router'
import backgroundImage from './assets/img/background_image.jpeg'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/UIkit'
import './assets/reset.css'
import './assets/style.css'

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <main className="c-main">
        <div
          style={{
            backgroundImage: `url(${backgroundImage})`,
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
  )
}

export default App
