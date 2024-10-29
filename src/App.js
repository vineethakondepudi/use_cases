import React from 'react'
import Translator from './components/Translator';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PubSub from './components/PubSub'


export default function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/translator" element={<Translator />} />
          <Route path="/chat" element={<PubSub />} />
        </Routes>
      </Router>
    </div>
  )
}
