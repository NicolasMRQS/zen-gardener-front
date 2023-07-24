/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect, useState } from 'react';
import {
  Edit,
  // Framer, Mail, Map, MapPin, Phone, Tag,
} from 'react-feather';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { actionUpdateUserData, actionUserDataUpdated } from '../../../redux/user/userActions';
import Logo from '../../Logo';
import './styles.scss';

function Profile() {
  const dispatch = useDispatch();
  const info = useSelector((state) => state.user);

  const [inputDisabled, setInputDisbled] = useState(true);

  const {
    pseudo, address, city, zip_code, phone, email, task_notification, week_notification,
  } = info;

  const {
    register, handleSubmit, reset,
  } = useForm();

  const onSubmit = handleSubmit((data) => {
    const date = new Date(Date.now());
    date.toString();

    dispatch(actionUpdateUserData(data));
    dispatch(actionUserDataUpdated(date));

    setInputDisbled(true);
  });

  const handleClickEdit = () => {
    setInputDisbled(!inputDisabled);
  };

  useEffect(() => {
    reset({
      pseudo,
      email,
      address,
      zip_code,
      city,
      phone,
      task_notification,
      week_notification,
    });
  }, [info]); // à chaque changement du state user les champs se remet à jour

  return (
    <main className="Profile">
      <section className="Profile__container">
        <Logo to="/tableau-de-bord" />
        <h1 className="Profile__title">Page de profil de : {pseudo}</h1>
        <form onSubmit={onSubmit}>
          <div className="Profile__input-container">
            <section className="Profile__infos-container">
              <h3 className="Profile__my-infos">Mes infos</h3>
              <Edit
                className="Profile__edit"
                onClick={handleClickEdit}
              />

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="pseudo">Pseudo:</label>
                <input disabled={inputDisabled} className="Profile__input" id="pseudo" {...register('pseudo')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="address">Adresse:</label>
                <textarea disabled={inputDisabled} className="Profile__input" id="address" {...register('address')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="city">Ville:</label>
                <input disabled={inputDisabled} className="Profile__input" id="city" {...register('city')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="zip_code">Code postal:</label>
                <input disabled={inputDisabled} className="Profile__input" id="zip_code" {...register('zip_code')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="phone">Téléphone:</label>
                <input disabled={inputDisabled} className="Profile__input" id="phone" {...register('phone')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="email">Mail:</label>
                <input disabled={inputDisabled} className="Profile__input" id="email" {...register('email')} />
              </article>
            </section>

            <section className="Profile__infos-container">
              <h3 className="Profile__my-infos">Paramètres de notifications</h3>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="task_notification">Envoyez moi un email par tâches</label>
                <input disabled={inputDisabled} type="checkbox" className="Profile__input" id="task_notification" {...register('task_notification')} />
              </article>

              <article className="Profile__item">
                <label className="Profile__label" htmlFor="week_notification">Envoyez moi un email par semaine</label>
                <input disabled={inputDisabled} type="checkbox" className="Profile__input" id="week_notification" {...register('week_notification')} />
              </article>

            </section>
          </div>
          <button disabled={inputDisabled} className="Profile__submit" type="submit">Valider</button>
        </form>
      </section>
    </main>
  );
}

export default Profile;
