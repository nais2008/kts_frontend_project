import React from "react"

import classNames from "classnames"

import styles from "./Loader.module.scss"

export type LoaderProps = {
  className?: string
  size: "s" | "l"
}

const Loader: React.FC<LoaderProps> = ({ className, size }) => {
  return (
    <div
      className={classNames(className, styles.loader, {
        [styles.loader_small]: size === "s",
        [styles.loader_large]: size === "l",
      })}
    >
      <div className={styles.loader__image}></div>
      <div className={styles.loader__container}>
        <div className={styles.loader__title}></div>
        <div className={styles.loader__text}></div>
      </div>
    </div>
  )
}

export default Loader
