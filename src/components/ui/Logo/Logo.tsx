import React from "react"

import { ROUTES } from "config/routes"
import { Link } from "react-router"

import Heading from "components/ui/Heading"

import styles from "./Logo.module.scss"

interface LogoProps {
  withTitle?: boolean
}

const Logo: React.FC<LogoProps> = ({ withTitle = false }: LogoProps) => {
  return (
    <Link to={ROUTES.main.create()} className={styles.logo}>
      <img src="/github.svg" alt="github icon" />
      {withTitle && (
        <Heading view="p-24" weight="medium">
          GitHub Client
        </Heading>
      )}
    </Link>
  )
}

export default Logo
