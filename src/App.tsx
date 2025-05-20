import React, { Suspense } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import HomePage from './pages/home';
import { ContractProvider } from './context/ContractContext';

const App: React.FC = () => {
  return (
    <UserProvider>
      <ContractProvider>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
              <Routes>
                <Route path="/" element={<HomePage />} />
              </Routes>
        </Router>
      </Suspense>
      </ContractProvider>
    </UserProvider>
  );
};

export default App;