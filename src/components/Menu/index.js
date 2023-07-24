import { useState } from 'react';
import {
  LogIn,
  Layers,
  User,
  Calendar,
  MoreHorizontal,
  PenTool,
  Home,
} from 'react-feather';
import { useSelector } from 'react-redux';

import { Link, NavLink } from 'react-router-dom';
import Overlay from '../Overlay';

import './styles.scss';

function Menu() {
  const userIsLoggedIn = useSelector((state) => state.session.userIsLoggedIn);

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {
        userIsLoggedIn
        && (
          <nav className="Menu">
            <NavLink
              to="/tableau-de-bord"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <Calendar />
                <p>Tâches</p>
              </div>
            </NavLink>
            <NavLink
              to="/fiches"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <Layers />
                <p>Fiches</p>
              </div>
            </NavLink>
            <NavLink
              to="/profil"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <User />
                <p>Profil</p>
              </div>
            </NavLink>
            <Link
              onClick={() => {
                setMenuOpen(true);
              }}
              className="Menu__item"
            >
              <div className="Menu__item-content">
                <MoreHorizontal />
                <p>Plus</p>
              </div>
            </Link>
          </nav>
        )
      }
      {
        !userIsLoggedIn
        && (
          <nav className="Menu">
            <NavLink
              end
              to="/"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <Home />
                <p>Accueil</p>
              </div>
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <LogIn />
                <p>Se connecter</p>
              </div>
            </NavLink>
            <NavLink
              to="/register"
              className={({ isActive }) => (isActive ? 'Menu__item Menu__item--active' : 'Menu__item')}
            >
              <div className="Menu__item-content">
                <PenTool />
                <p>S'inscrire</p>
              </div>
            </NavLink>
            <Link
              onClick={() => {
                setMenuOpen(true);
              }}
              className="Menu__item"
            >
              <div className="Menu__item-content">
                <MoreHorizontal />
                <p>Plus</p>
              </div>
            </Link>
          </nav>
        )
      }
      <Overlay
        isConnected={userIsLoggedIn}
        menuOpen={menuOpen}
        setMenuOpen={() => {
          setMenuOpen(false);
        }}
      />
    </>
  );
}

export default Menu;
