/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import logo from 'src/assets/img/logo.png';

import './styles.scss';

function Logo({ to }) {
  return (
    <Link className="Logo--link" to={to}><img className="Logo" src={logo} alt="logo" /></Link>
  );
}

Logo.propTypes = {
  to: PropTypes.string.isRequired,
};

export default Logo;
