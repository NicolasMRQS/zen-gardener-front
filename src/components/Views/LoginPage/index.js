/* eslint-disable jsx-a11y/label-has-associated-control */
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { actionLogin, actionRemoveLoginErrorMessage } from '../../../redux/session/sessionActions';
import Message from '../../Form/Message';
import SubmitButton from '../../Form/SubmitButton';

import './style.scss';

function LoginPage() {
  const dispatch = useDispatch();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { lastLoginFailed } = useSelector((state) => state.session);

  useEffect(() => {
    if (lastLoginFailed) {
      dispatch(actionRemoveLoginErrorMessage());
    }
  }, []);

  const onSubmit = ({ email, password }) => {
    dispatch(actionLogin(email, password));
  };

  return (
    <>
      <main className="LoginPage">
        <section className="LoginPage__container">
          <h1 className="LoginPage__title">Connexion</h1>
          <form className="LoginPage__form" onSubmit={handleSubmit(onSubmit)} noValidate>

            <input
              className="LoginPage__input"
              name="email"
              type="text"
              placeholder="Email"
              aria-label="Email"
              autoComplete="off"
              {...register('email', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.email && <p className="LoginPage__error">Adresse email requise</p>}
            <input
              className="LoginPage__input"
              name="password"
              type="password"
              placeholder="Mot de passe"
              aria-label="Mot de passe"
              autoComplete="off"
              {...register('password', { required: true })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {errors.password && <p className="LoginPage__error">Mot de passe requis</p>}
            <SubmitButton
              label="Se connecter"
              className="button"
            />
          </form>
          <div className="links_container">
            <Link className="LoginPage__nopassword">Mot de passe oublié ?</Link>
          </div>
        </section>
      </main>
      {lastLoginFailed && <Message message="Combinaison email / mot de passe incorrecte" isError actionRemove={actionRemoveLoginErrorMessage} />}
    </>
  );
}

export default LoginPage;
