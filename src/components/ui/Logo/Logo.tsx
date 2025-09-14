import { Link } from 'react-router'

import React from 'react'
import Heading from 'components/ui/Heading'

import styles from './Logo.module.scss'
import { routes } from 'config/routes'

interface LogoProps {
  isAddText?: boolean
}

const Logo: React.FC<LogoProps> = ({
  isAddText = false,
}: LogoProps) => {
  return (
    <Link to={routes.main.create()} className={styles.logo}>
      <img src='/github.svg' alt='github icon' />
      {
        isAddText &&
        <Heading
          view='p-24'
          weight='medium'
        >
          GitHub Client
        </Heading>
      }
    </Link>
  )
}

export default Logo

