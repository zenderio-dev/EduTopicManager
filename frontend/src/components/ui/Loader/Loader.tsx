import clsx from 'clsx';
import styles from './Loader.module.scss';

interface LoaderProps {
  size: number;
  className?: string;
}

const Loader = ({ size, className }: LoaderProps) => {
  return (
    <span
      className={clsx(styles.loader, className)}
      style={{ width: size, height: size }}
    />
  );
};

export default Loader;