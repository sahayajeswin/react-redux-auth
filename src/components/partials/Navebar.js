import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { LOGOUT } from '../../redux/types';
import './Navebar.scss';

const Navbar = ({ title, icon }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="navbar bg-primary">
      <h2 className="logo">
        <Link to="/">{title}</Link>
      </h2>
      <ul className="menu-list">
        <li>
          <Button onClick={onLogout} variant="light">Logout</Button>
        </li>
      </ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};

Navbar.defaultProps = {
  title: 'Code Testing',
};

export default Navbar;
