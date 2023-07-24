/* eslint-disable jsx-a11y/label-has-associated-control */
import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

import ROUTES from '../../../config/routes.json';

import './style.scss';

function PageNotFound() {
  const { userIsLoggedIn } = useSelector((state) => state.session);

  if (userIsLoggedIn) {
    return (<Navigate to={ROUTES.dashboard} />);
  }

  return (
    <main className="PageNotFound">
      <section className="PageNotFound__container">
        <h1 className="PageNotFound__title">404: Page not found</h1>
        <div className="links_container">
          {!userIsLoggedIn && <Link to={ROUTES.index} className="PageNotFound__nopassword">Redirection vers la page d'accueil</Link>}
          {/* // TODO: En attente de la persistance pour êtrer fonctionnel */}
          {userIsLoggedIn && <Link to={ROUTES.dashboard} className="PageNotFound__nopassword">Redirection vers le tableau de bord</Link>}
        </div>
      </section>
    </main>
  );
}

export default PageNotFound;
