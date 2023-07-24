/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { X } from 'react-feather';
import { useDispatch } from 'react-redux';

import './style.scss';

function Message({
  message, isError, actionRemove, setState,
}) {
  const dispatch = useDispatch();
  const messageElm = useRef('messageElm');

  const handleClick = () => {
    if (actionRemove) {
      dispatch(actionRemove());
    }
    else if (setState) {
      setState(false);
    }
  };

  const fadeOut = () => {
    if (messageElm.current) {
      messageElm.current.classList.add('fade-out');
      setTimeout(handleClick, 500);
    }
  };

  setTimeout(fadeOut, 3000);

  return (
    <div ref={messageElm} className={isError ? 'Message Message--error' : 'Message'}>
      <X className="alert-logo" onClick={handleClick} />
      {message}
    </div>
  );
}

Message.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  actionRemove: PropTypes.func,
  setState: PropTypes.func,
};

Message.defaultProps = {
  isError: false,
  actionRemove: null,
  setState: null,
};

export default Message;
