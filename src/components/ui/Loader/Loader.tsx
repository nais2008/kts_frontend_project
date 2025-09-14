import React from 'react';

import styles from './Loader.module.scss'

export type LoaderProps = {
  className?: string;
};

const Loader: React.FC<LoaderProps> = ({ className }) => {
  return (
    <span className={`${styles.loader} ${className}`}></span>
  )
}

export default Loader;
