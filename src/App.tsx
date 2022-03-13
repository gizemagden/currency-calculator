import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Modal from './components/Modal';
import Header from './components/Header';
import Convert from './containers/Convert';
import Chart from './containers/Chart';
import { SettingsContextProvider } from './context';

const App = () => {
  return (
    <SettingsContextProvider>
      <BrowserRouter>
        <Header />
        <Modal>
          <Routes>
            <Route path='/' element={<Convert />} />
            <Route path='/convert' element={<Convert />} />
            <Route path="/chart" element={<Chart />} />
          </Routes>
        </Modal>
      </BrowserRouter>
    </SettingsContextProvider>
  );
}

export default App;
