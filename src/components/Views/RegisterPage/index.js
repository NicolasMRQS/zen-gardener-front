import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { actionRegister, actionRemoveRegisterErrorMessage } from '../../../redux/user/userActions';
import Message from '../../Form/Message';

import SubmitButton from '../../Form/SubmitButton';
import './style.scss';

function RegisterPage() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const { registerFailed } = useSelector((state) => state.user);

  // Clear error message when changing route
  useEffect(() => {
    if (registerFailed) {
      dispatch(actionRemoveRegisterErrorMessage());
    }
  }, []);

  const onSubmit = (data) => {
    dispatch(actionRegister(data));
  };

  // Watch password to confirm password confirmation
  const password = watch('password', '');

  return (
    <>
      <main className="Register">
        <section className="Register__container">

          <h1 className="Register__title">Inscription</h1>
          <form className="Register__form" onSubmit={handleSubmit(onSubmit)}>

            {/* EMAIL */}
            <input
              className="Register__input"
              name="email"
              type="text"
              placeholder="Email*"
              aria-label="Email"
              autoComplete="off"
              {...register('email', {
                // Validation list
                required: true,
                pattern: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/,
              })}
              aria-invalid={errors.email ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.email?.type === 'required' && <p className="Register__error">⚠ Adresse email requise</p>}
            {errors.email?.type === 'pattern' && <p className="Register__error">⚠ Adresse email incorrect</p>}

            {/* USERNAME */}
            <input
              className="Register__input"
              name="pseudo"
              type="text"
              placeholder="Pseudo*"
              aria-label="Pseudo"
              autoComplete="off"
              maxLength="10"
              {...register('pseudo', {
                // Validation list
                required: true,
                maxLength: 16,
              })}
              aria-invalid={errors.pseudo ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.pseudo?.type === 'required' && <p className="Register__error">⚠ Pseudo requis</p>}
            {errors.pseudo?.type === 'max' && <p className="Register__error">⚠ Pseudo de maximum 16 caractère</p>}

            {/* PASSWORD */}
            <input
              className="Register__input"
              name="password"
              type="password"
              placeholder="Mot de passe*"
              aria-label="Mot de passe"
              autoComplete="off"
              maxLength="64"
              {...register('password', {
                // Validation list
                required: true,
                minLength: 8,
                maxLength: 64,
              })}
              aria-invalid={errors.password ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.password?.type === 'required' && <p className="Register__error">⚠ Mot de passe requis</p>}
            {errors.password?.type === 'minLength' && <p className="Register__error">⚠ Minimum 8 caractères</p>}
            {errors.password?.type === 'maxLength' && <p className="Register__error">⚠ Maximum 64 caractères</p>}

            {/* PASSWORD CONFIRM */}
            <input
              className="Register__input"
              name="repeat_password"
              type="password"
              placeholder="Confirmer mot de passe*"
              aria-label="Confirmer mot de passe"
              autoComplete="off"
              {...register('repeat_password', {
                // Validation list
                validate: (value) => value === password,

              })}
              aria-invalid={errors.repeat_password ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.repeat_password?.type === 'validate' && <p className="Register__error">⚠ Les mots de passes ne correspondent pas</p>}

            {/* ADDRESS */}
            <input
              className="Register__input"
              label="Adresse"
              name="address"
              type="text"
              placeholder="Adresse"
              aria-label="Adresse"
              autoComplete="off"
              {...register('address')}
            />

            {/* CITY */}
            <input
              className="Register__input"
              label="Ville"
              name="city"
              type="text"
              placeholder="Ville"
              aria-label="Ville"
              autoComplete="off"
              {...register('city')}
            />

            {/* POSTAL CODE */}
            <input
              className="Register__input"
              label="Code Postal"
              name="zip_code"
              type="text"
              placeholder="Code Postal"
              aria-label="Code postal"
              autoComplete="off"
              {...register('zip_code', {
                // Validation list
                pattern: /^[0-9]{5}$/,
              })}
              aria-invalid={errors.zip_code ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.zip_code?.type === 'pattern' && <p className="Register__error">⚠ Code postale incorrect</p>}

            {/* PHONE */}
            <input
              className="Register__input"
              label="Téléphone"
              name="phone"
              type="text"
              placeholder="Téléphone"
              aria-label="Téléphone"
              autoComplete="off"
              {...register('phone', {
                // Validation list
                pattern: /^([+]33\s?|0)\d((\s|.|-|_|)?\d{2}){3}(\3[0-9]{2})$/,
              })}
              aria-invalid={errors.phone ? 'true' : 'false'}
            />
            {/* Errors messages */}
            {errors.phone?.type === 'pattern' && <p className="Register__error">⚠ Numéro de téléphone incorrect</p>}
            <SubmitButton
              label="Accepter les CGU et valider"
              className="button"
            />
          </form>
          <div className="links_container">
            <Link to="/login" className="Register__login">Déjà inscrit ?</Link>
          </div>
        </section>
      </main>
      {registerFailed && <Message message="Erreur lors de l'inscription, veuillez réessayer" isError actionRemove={actionRemoveRegisterErrorMessage} />}
    </>
  );
}

export default RegisterPage;
