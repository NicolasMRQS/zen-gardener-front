import PropTypes from 'prop-types';

import './styles.scss';

function Modal({
  modalIsOpen, setModalIsOpen, children,
}) {
  const handleClick = () => {
    setModalIsOpen(false);
  };

  return (
    <div className={modalIsOpen ? 'Modal Modal--open' : 'Modal'}>
      <div className="Modal__content">
        <span onClick={handleClick} className="Modal__close">&times;</span>
        {children}
      </div>
    </div>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  modalIsOpen: PropTypes.bool.isRequired,
  setModalIsOpen: PropTypes.func.isRequired,
};

export default Modal;
