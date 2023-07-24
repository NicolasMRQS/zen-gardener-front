import PropTypes from 'prop-types';

import './styles.scss';

function Card({ sheet }) {
  const { title, photo } = sheet;
  let { description } = sheet;
  if (description.length > 50) {
    description = `${description.slice(0, 200)}...`;
  }
  return (
    <div className="Card">
      <h1 className="Card__title">{title}</h1>
      <div className="Card__img_container">
        <img className="Card__image" src={photo} alt={title} />
        <div className="Card__categories_container">
          {sheet.categories && sheet.categories.map((categorie) => (
            <div className="Card__categorie" style={{ backgroundColor: `${categorie.color}` }} key={categorie.id}>{categorie.label}</div>
          ))}
        </div>
      </div>
      <div className="Card__infos">
        <p className="Card__description">Description de la fiche:</p>
        <p className="Card__details">{description}</p>
      </div>
    </div>
  );
}

Card.propTypes = {
  sheet: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    photo: PropTypes.string,
    description: PropTypes.string,
    categories: PropTypes.array,
  }).isRequired,
};

export default Card;
