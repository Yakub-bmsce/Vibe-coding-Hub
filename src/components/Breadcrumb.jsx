import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Breadcrumb.css';

const Breadcrumb = ({ items }) => {
  const navigate = useNavigate();

  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <React.Fragment key={index}>
          {index > 0 && <span className="breadcrumb-separator">›</span>}
          <span
            className={`breadcrumb-item ${item.path ? 'clickable' : 'current'}`}
            onClick={() => item.path && navigate(item.path)}
          >
            {item.label}
          </span>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Breadcrumb;
