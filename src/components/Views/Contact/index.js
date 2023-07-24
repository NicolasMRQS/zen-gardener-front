import { useForm } from 'react-hook-form';

// import { init, sendForm } from 'emailjs-com';
import SubmitButton from '../../Form/SubmitButton';

// import publicKey from '../../../../email.json';

import './styles.scss';

// const { YOUR_PUBLIC_KEY, SERVICE_ID, TEMPLATE_ID } = publicKey;
// // Public key from EmailJS
// init(YOUR_PUBLIC_KEY);

function Conntact() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    // Config to send email with preset
    sendForm(SERVICE_ID, TEMPLATE_ID, '#contactForm')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      }, (error) => {
        console.log('FAILED...', error);
      });
  };

  return (
    <section className="Contact">
      <form id="contactForm" className="Contact__form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="Contact__title">Besoin d'aide ?</h1>

        <div className="Contact__field">
          <label className="Contact__label" htmlFor="inputEmail">
            <p className="Contact__body">Veuillez renseiger votre adresse mail ici</p>
            <input type="email" {...register('inputEmail', { required: true })} className="Contact__input" id="inputEmail" placeholder="example@example.com" />
            {errors.inputDetails && <span role="alert">Ce champs ne peut être vide</span>}
          </label>
        </div>

        <div className="Contact__field">
          <label className="Contact__label" htmlFor="subject">
            <p className="Contact__body">Sur quel sujet avez vous besoin d'aide ?</p>
            <select name="subject" {...register('subject', { required: true })} id="subject" className="Contact__select" defaultValue="default">
              <option value="" disabled>Choississez un sujet</option>
              <option value="grapefruit">Pamplemousse</option>
              <option value="lime">Citron vert</option>
              <option value="coconut">Noix de coco</option>
              <option value="mango">Mangue</option>
            </select>
            {errors.subject && <span role="alert">Veuillez selectionez un sujet</span>}
          </label>
        </div>

        <div className="Contact__field">
          <label className="Contact__label" htmlFor="message">
            <p className="Contact__body">Mettez ci-dessous les détails de votre demande</p>
            <textarea {...register('message', { required: true })} name="message" className="Contact__textarea" id="message" placeholder="Merci de renseigner le maximum d'information que possible..." />
            {errors.message && <span role="alert">Ce champs ne peut être vide</span>}
          </label>
        </div>
        <SubmitButton className="Contact__submit" label="Envoyer votre demande" />
      </form>
    </section>
  );
}

export default Conntact;
