import { RotatingLines } from 'react-loader-spinner';
import css from '../Loader/Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <RotatingLines
        visible={true}
        height="32"
        width="32"
        strokeColor="yellow"
      />
    </div>
  );
}
