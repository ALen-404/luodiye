import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home';

const App: React.FC = () => {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
        </Router>
      </Suspense>
  );
};

export default App;