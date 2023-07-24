import PropTypes from 'prop-types';

import './style.scss';

function SubmitButton({ label }) {
  return (
    <button className="SubmitButton" type="submit">{label}</button>
  );
}

SubmitButton.propTypes = {
  label: PropTypes.string.isRequired,
};

export default SubmitButton;
