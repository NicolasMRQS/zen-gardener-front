import { useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import tag from 'src/assets/img/calendar.png';
import legume from 'src/assets/img/legume.png';
import notif from 'src/assets/img/notif.png';
import { useEffect, useState } from 'react';
import previewSheets from 'src/assets/img/preview-sheets.png';
import previewDashboard from 'src/assets/img/preview-dashboard.png';
import previewNotif from 'src/assets/img/preview-notif.png';
import Logo from '../../Logo';

import Card from '../../Card';
import Modal from '../../Modal';
import './styles.scss';
import Config from '../../../config';

const axios = require('axios');

function Homepage() {
  const { userIsLoggedIn } = useSelector((state) => state.session);
  const [randomSheets, setRandomSheets] = useState([]);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [imgModal, setImgModal] = useState('');

  useEffect(() => {
    axios.get(`${Config.API_URL_PUBLIC_SHEETS}n=3`).then((response) => {
      setRandomSheets(response.data);
    }).catch((error) => {
      throw error;
    });
  }, []);
  if (userIsLoggedIn) {
    return (<Navigate to="/tableau-de-bord" />);
  }

  const handleclickPreview = (imgToDisplay) => {
    setImgModal(imgToDisplay);
    setModalIsOpen(true);
  };

  return (
    <main className="Homepage">
      <Logo to="/" />
      <section className="Homepage__introduction">
        <h2 className="Homepage__subtitle">Zen-Gardener vous fait voir le jardinage sous un nouvel angle.</h2>
        <p className="Homepage__slogan-body">
          Créez, gérez votre jardin et atteignez de nouveaux sommets en
          matière de productivité. Que vous soyez débutant ou expérimenté, redécouvrez le jardinage.
          Accomplissez toutes vos tâches grâce à Zen-Gardener.
        </p>
        <Link className="Homepage__button" to="/register">Inscrivez-vous, c'est gratuit</Link>
      </section>
      <section className="Homepage__fonctionalites">
        <article className="Homepage__fonctionality">
          <img className="Homepage__tag" src={tag} alt="tag" />
          <h3 className="Homepage__fonctionality-title">Création de tâches</h3>
          <p className="Homepage__fonctionality-body">Accès à la création de tâches avec vu calendrier ou planning pour gérer votre organisation. Trouvez l'option qui vous correspond.</p>
          <Link
            className="Homepage__button Homepage__button--func"
            onClick={() => {
              handleclickPreview(previewDashboard);
            }}
          >Preview
          </Link>
        </article>
        <article className="Homepage__fonctionality">
          <img className="Homepage__tag" src={notif} alt="tag" />
          <h3 className="Homepage__fonctionality-title">Soyez notifiée</h3>
          <p className="Homepage__fonctionality-body">Système de notification qui vous alerte sur les tâches à venir par mail. Et c'est totalement paramétrable.</p>
          <Link
            className="Homepage__button Homepage__button--func"
            onClick={() => {
              handleclickPreview(previewNotif);
            }}
          >Preview
          </Link>
        </article>
        <article className="Homepage__fonctionality">
          <img className="Homepage__tag" src={legume} alt="tag" />
          <h3 className="Homepage__fonctionality-title">Découvrez nos fiches</h3>
          <p className="Homepage__fonctionality-body">Accédez à des fiches en illimité qui vous aideront au quotidien pour jardiner et pourront être lié à vos tâches.</p>
          <Link
            className="Homepage__button Homepage__button--func"
            onClick={() => {
              handleclickPreview(previewSheets);
            }}
          >Preview
          </Link>
        </article>
      </section>
      <section className="Homepage__sheet-example">
        <h2 className="Homepage__subtitle">Voici des exemples de fiches que nous proposons</h2>
        <ul className="Homepage__list">
          {randomSheets.map((randomSheet) => (
            <li key={randomSheet.id}><Card sheet={randomSheet} /></li>
          ))}
        </ul>
      </section>
      <Modal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen}>
        <img className="Homepage__preview_img" onClick={() => window.open(imgModal, '_blank')} style={{ width: '100%' }} src={imgModal} alt="preview sheets" />
      </Modal>
    </main>
  );
}

export default Homepage;
