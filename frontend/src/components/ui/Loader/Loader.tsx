import clsx from 'clsx';
import styles from './Loader.module.scss';

interface LoaderProps {
  size?: number;
  className?: string;
  color?: string;
}

const Loader = ({ size, className, color="#FFF" }: LoaderProps) => {
  return (
    <span
      className={clsx(styles.loader, className)}
      style={{ width: size, height: size, border: `0.2em solid ${color}`, borderBottomColor:'transparent'}}
    />
  );
};

export default Loader;