import { useEffect, useState } from 'react';
import { Search } from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { actionFetchSheetsByQuery, actionClearSearchResult } from '../../../redux/sheets/sheetsActions';

import Card from '../../Card';

import './styles.scss';

function SheetsSearch() {
  const dispatch = useDispatch();
  const { register, handleSubmit, getValues } = useForm();

  const [page, setPage] = useState(1);
  const { searchResultIds, sheets, noMorePageInSearch } = useSelector((state) => state.sheets);

  // eslint-disable-next-line max-len
  const sheetsOnScreen = sheets.filter((sheet) => searchResultIds.includes(sheet.id)).sort((a, b) => a.id - b.id);

  // Search 6 first on first render
  useEffect(() => {
    dispatch(actionFetchSheetsByQuery('', 6, 1));
  }, []);

  // Search request
  const onSubmit = (data) => {
    dispatch(actionClearSearchResult());
    dispatch(actionFetchSheetsByQuery(data.sheets_search, 6, 1));
    setPage(1);
  };

  // Request more sheet
  const loadMore = () => {
    if (!noMorePageInSearch) {
      const query = getValues('sheets_search');
      const nextPage = page + 1;
      dispatch(actionFetchSheetsByQuery(query, 6, nextPage));
      setPage(nextPage);
    }
  };

  return (
    <main className="SheetsSearch">
      <section className="SheetsSearch__container">
        <article className="SheetsSearch__header">
          <h1 className="SheetsSearch__title">Rechercher une fiche</h1>
          <form className="SheetsSearch__form" onSubmit={handleSubmit(onSubmit)}>
            <input
              className="SheetsSearch__form__input"
              name="sheets_search"
              type="texte"
              aria-label="Recherche de fiche"
              placeholder="Recherche..."
              autoComplete="off"
              {...register('sheets_search')}
            />
            <button
              className="SheetsSearch__form__button"
              type="submit"
            >
              <Search />
            </button>
          </form>
        </article>
        <ul className="SheetsSearch__list">
          {sheetsOnScreen.length === 0 && <p>Aucun résultat !</p>}
          {sheetsOnScreen.map((sheet) => (
            <NavLink key={sheet.id} to={`/fiches/${sheet.id}`}>
              <Card sheet={sheet} />
            </NavLink>
          ))}
        </ul>
        {searchResultIds.length > 0
          && (
            <button
              onClick={loadMore}
              type="button"
              className={noMorePageInSearch ? 'SheetsSearch__button_more SheetsSearch__button_more--end' : 'SheetsSearch__button_more'}
            >
              {noMorePageInSearch ? 'Vous êtes à la fin !' : 'Voir plus'}
            </button>
          )}
      </section>
    </main>
  );
}

export default SheetsSearch;
