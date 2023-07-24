import './styles.scss';
import carrot from 'src/assets/img/carrot.svg';

function Loading() {
  return (
    <div className="loader">
      <div className="box-1" />
      <img className="loader-img" alt="loading" src={carrot} />
    </div>
  );
}

export default Loading;
