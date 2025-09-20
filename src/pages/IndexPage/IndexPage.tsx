import React from "react"

import classNames from "classnames"
import { ROUTES } from "config/routes"
import { useNavigate } from "react-router"

import Button from "components/ui/Button"
import Heading from "components/ui/Heading"

import styles from "./IndexPage.module.scss"

const IndexPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className={classNames(styles.index__container, styles.index)}>
      <Heading view="title" tag="h1" className={styles.index__title}>
        Welcome to <span>GitHub Client</span>
      </Heading>

      <Button onClick={() => navigate(ROUTES.repositories.create())}>
        Go to Repo
      </Button>
    </div>
  )
}

export default IndexPage
