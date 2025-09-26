import Logo from "components/ui/Logo"

import styles from "./Header.module.scss"

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.header__container}>
        <Logo withTitle />
        <img
          src="https://picsum.photos/32"
          alt="avatar"
          className={styles.header__avatar}
        />
      </div>
    </header>
  )
}

export default Header
