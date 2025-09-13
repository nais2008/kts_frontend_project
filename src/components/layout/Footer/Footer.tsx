import { Link } from 'react-router'

import Heading from 'components/ui/Heading'

import { routes } from 'config/routes'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footer__container}`}>
        <Heading view='p-16' weight='medium' color='secondary'>
          © GitHubClient 2025 - {new Date().getFullYear()}
        </Heading>
        <Link to={routes.repositories.create()}>Go to Repo</Link>
      </div>
    </footer>
  )
}

export default Footer
