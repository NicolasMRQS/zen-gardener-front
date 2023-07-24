import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionLogout } from '../../redux/session/sessionActions';
import './styles.scss';

function Overlay({ menuOpen, setMenuOpen, isConnected }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(actionLogout());
    setMenuOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const openMailbox = () => {
    window.location.href = 'mailto:ozengardener@gmail.com';
    setMenuOpen(false);
  };

  return (
    <div className={menuOpen ? 'Overlay Overlay--open' : 'Overlay'}>
      <a
        className="Overlay__link Overlay__closebtn"
        onClick={setMenuOpen}
      >&times;
      </a>
      <div className="Overlay__content">
        {isConnected && <Link onClick={handleClick} type="button" className="Overlay__link">Déconnexion</Link>}
        <Link onClick={closeMenu} to="/about" className="Overlay__link">À propos</Link>
        <Link onClick={openMailbox} className="Overlay__link">Contact</Link>
        <Link onClick={closeMenu} to="/cgu" className="Overlay__link">CGU</Link>
      </div>
    </div>
  );
}

Overlay.propTypes = {
  menuOpen: PropTypes.bool.isRequired,
  setMenuOpen: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

export default Overlay;
