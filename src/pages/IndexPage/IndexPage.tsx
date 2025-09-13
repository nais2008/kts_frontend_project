import React from 'react'
import { useNavigate } from 'react-router'

import Heading from 'components/ui/Heading'
import Button from 'components/ui/Button'

import { routes } from 'config/routes'

import styles from './IndexPage.module.scss'

const IndexPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className='container'>
      <div className={styles.index}>

        <Heading view='title' tag='h1' className={styles.index__title}>
          Welcome to <span>GitHub Client</span>
        </Heading>

        <Button
          onClick={
            () => navigate(routes.repositories.create())
          }
        >
          Go to Repo
        </Button>

      </div>
    </div>
  )
}

export default IndexPage
