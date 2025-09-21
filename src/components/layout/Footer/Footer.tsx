import { ROUTES } from "config/routes"
import { Link } from "react-router"

import Heading from "components/ui/Heading"

import styles from "./Footer.module.scss"

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__container}>
        <Heading view="p-16" weight="medium" color="secondary">
          © GitHubClient 2025 - {new Date().getFullYear()}
        </Heading>
        <nav>
          <ul>
            <li>
              <Link to={ROUTES.repositories.create()}>Go to Repo</Link>
            </li>
            <li>
              <Link to={ROUTES.favorite.create()}>Go to Favorite</Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
