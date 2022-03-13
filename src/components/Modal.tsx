import React, { FC, useMemo } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { TabTypeTypeEvent } from '../types/components';

import "../styles/modal.scss";

const Modal: FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const mode = useMemo(() => location.pathname, [location]);

  const handleTabChange = (event: TabTypeTypeEvent) => {
    navigate(`/${event.target.id}`);
  }

  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className="tab">
          <button id="convert" className={`tab-item ${['/convert', '/'].indexOf(mode) > -1 ? 'isActive' : ''}`} onClick={handleTabChange}>Convert</button>
          <button id="chart" className={`tab-item  ${mode === '/chart' ? 'isActive' : ''}`} onClick={handleTabChange}>Chart</button>
        </div>
        {children}
      </div>
    </div>
  );
}

export default Modal;
