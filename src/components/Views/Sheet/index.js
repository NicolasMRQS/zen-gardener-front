/* eslint-disable jsx-a11y/control-has-associated-label */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { Heart } from 'react-feather';
import { actionFetchSheetById, actionAddToFavorites, actionDeleteFromFavorites } from '../../../redux/sheets/sheetsActions';

import Loading from '../../Loading';
import './style.scss';
import Action from './Action';

function Sheet() {
  let { id } = useParams();
  id = parseInt(id, 10);

  const dispatch = useDispatch();
  const { sheets, favoriteIds } = useSelector((state) => state.sheets);

  // Check if sheet is already in state
  const sheetDisplay = sheets.find((sheet) => sheet.id === id);

  // Loading if sheet is not in state

  useEffect(() => {
    if (!sheetDisplay) {
      dispatch(actionFetchSheetById(id));
    }
  }, [sheetDisplay]);

  if (!sheetDisplay) {
    return (<Loading />);
  }

  // Check if this sheet is in favorite
  const isFavorite = favoriteIds.includes(id);

  const {
    title,
    photo,
    description,
    caracteristique,
    categories,
    actions,
  } = sheetDisplay;

  // Shaping caracteristics
  const turnCaracteristiquesInArray = (caract) => {
    let caractSplit = caract.split(']');
    caractSplit.pop();
    caractSplit = caractSplit.map((c) => c.substring(1));
    return caractSplit;
  };

  const caracteristiqueArray = turnCaracteristiquesInArray(caracteristique);

  const handleClickFavorite = () => {
    if (!isFavorite) {
      dispatch(actionAddToFavorites(id));
    }
    else {
      dispatch(actionDeleteFromFavorites(id));
    }
  };

  return (
    <section className="Sheet">
      <section className="Sheet__container">
        <h1 className="Sheet__title">{title}</h1>
        <section className="Sheet__globale">
          <div className="Sheet__main-block">
            <div className="Sheet__links">
              <NavLink to="/fiches">
                <span className="Sheet__links--retour">← Retour à la recherche</span>
              </NavLink>
              <div className="Sheet__links--buttons">
                <Heart onClick={handleClickFavorite} className={isFavorite ? 'Sheet__heart--full' : 'Sheet__heart'} />
                {/* </button> */}
              </div>
            </div>
            <article className="Sheet__img-container">
              <div className="Sheet__categories_container">
                {categories && categories.map((categorie) => (
                  <div className="Sheet__categorie" style={{ backgroundColor: `${categorie.color}` }} key={categorie.id}>{categorie.label}</div>
                ))}
              </div>
              <img className="Sheet__img" alt={title} src={photo} />
            </article>
            <div className="Sheet__actions_container">
              {actions.map((action) => <Action key={action.id} action={action} sheetId={id} />)}
            </div>
            <div className="Sheet__description">
              <h2>Description :</h2>
              <p>{description}</p>
            </div>
          </div>
          <div className="Sheet__carac-list">
            <h2>Caractéristiques :</h2>
            <section>
              {caracteristiqueArray.map((carac) => <div key={carac} className="Sheet__carac">{carac}</div>)}
            </section>
          </div>
        </section>
      </section>
    </section>
  );
}

export default Sheet;
