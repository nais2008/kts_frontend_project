import React from 'react'

import Heading from 'components/ui/Heading'

import styles from './Card.module.scss'

export type CardProps = {
  className?: string
  image: string
  captionSlot?: React.ReactNode
  title: React.ReactNode
  subtitle: React.ReactNode
  contentSlot?: React.ReactNode
  onClick?: React.MouseEventHandler
  actionSlot?: React.ReactNode
}

const Card: React.FC<CardProps> = ({
  className,
  image,
  captionSlot,
  title,
  subtitle,
  contentSlot,
  onClick,
  actionSlot
}) => {
  return (
    <div className={`${styles.card} ${className}`} onClick={onClick}>
      <img src={image} alt={styles.card_image} className={styles.card__image}/>
      <div className={styles.card__content}>
        <div className={styles.card__text}>
          {
            captionSlot &&
            <Heading
              className={styles.card__captionSlot}
              view='p-14' color='secondary'
              weight='medium'
            >
                {captionSlot}
            </Heading>
          }
          <Heading
            className={styles.card__title}
            view='p-20'
            weight='medium'
            maxLines={2}
          >
            {title}
          </Heading>
          <Heading
            className={styles.card__subtitle}
            view='p-16'
            color='secondary'
            maxLines={3}
          >
            {subtitle}
          </Heading>
        </div>
        <div className={styles.card__footer}>
          {
            contentSlot &&
            <Heading
              className={styles.card__contentSlot}
              view='p-18'
              weight='bold'
            >
              {contentSlot}
            </Heading>
          }
          {
            actionSlot &&
            <div className={styles.card__actionSlot}>{actionSlot}</div>
          }
        </div>
      </div>
    </div>
  )
}

export default Card
