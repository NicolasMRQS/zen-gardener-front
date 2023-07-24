/* eslint-disable jsx-a11y/control-has-associated-label */
import { Link } from 'react-router-dom';
import { GitHub, Linkedin } from 'react-feather';

import './styles.scss';
import dimitriPP from 'src/assets/img/dimitri.jpg';
import nicolasPP from 'src/assets/img/nicolas.jpg';
import clothildePP from 'src/assets/img/clothilde.jpg';
import jeanPP from 'src/assets/img/jean.png';
import olivierPP from 'src/assets/img/olivier.jpg';

function About() {
  return (
    <section className="About">
      <h1 className="About__title">La Team Zen-Gardener</h1>
      <ul className="About__list">
        <li className="About__card">
          <img className="About__image" src={clothildePP} alt="dimitri" />
          <h2 className="About__name">Clothilde Drouot</h2>
          <em className="About__role">Product Owner</em>
          <p className="About__speciality">Back-end</p>
          <article className="About__link">
            <a href="https://www.linkedin.com/in/clothilde-drouot-001090b5/" className="About__linkedin" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://github.com/ClothildeDrouot" target="_blank" rel="noreferrer"><GitHub /></a>
          </article>
        </li>
        <li className="About__card">
          <img className="About__image" src={nicolasPP} alt="dimitri" />
          <h2 className="About__name">Nicolas Marques</h2>
          <em className="About__role">Scrum Master</em>
          <p className="About__speciality">Front-end</p>
          <article className="About__link">
            <a href="https://www.linkedin.com/in/nicolas-marques-412229248/" className="About__linkedin" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://github.com/NicolasMRQS" className="About__github" target="_blank" rel="noreferrer"><GitHub /></a>
          </article>
        </li>
        <li className="About__card">
          <img className="About__image" src={jeanPP} alt="dimitri" />
          <h2 className="About__name">Jean Leherle</h2>
          <em className="About__role">Lead Dev Back</em>
          <p className="About__speciality">Back-end</p>
          <article className="About__link">
            <a href="https://www.linkedin.com/in/jean-leherle/" className="About__linkedin" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://github.com/Jean-Leherle" className="About__github" target="_blank" rel="noreferrer"><GitHub /></a>
          </article>
        </li>

        <li className="About__card">
          <img className="About__image" src={olivierPP} alt="dimitri" />
          <h2 className="About__name">Olivier Battini</h2>
          <em className="About__role">Lead Dev Front</em>
          <p className="About__speciality">Front-end</p>
          <article className="About__link">
            <a href="https://www.linkedin.com/in/olivier-battini/" className="About__linkedin" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://github.com/OlivierBattini" className="About__github" target="_blank" rel="noreferrer"><GitHub /></a>
          </article>
        </li>
        <li className="About__card">
          <img className="About__image" src={dimitriPP} alt="dimitri" />
          <h2 className="About__name">Dimitri Ligdamis</h2>
          <em className="About__role">Git Master</em>
          <p className="About__speciality">Front-end</p>
          <article className="About__link">
            <a href="https://www.linkedin.com/in/dimitriligdamis/" className="About__linkedin" target="_blank" rel="noreferrer"><Linkedin /></a>
            <a href="https://github.com/dimitriligdamis" className="About__github" target="_blank" rel="noreferrer"><GitHub /></a>
          </article>
        </li>
      </ul>
    </section>
  );
}

export default About;
