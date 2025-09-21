import React from "react"

import classNames from "classnames"

import Button from "../Button"
import styles from "./Pagination.module.scss"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onChange: (page: number) => void
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
}) => {
  if (totalPages <= 1) return null

  const buildPages = () => {
    const delta = 1
    const result = []

    const range = []
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i)
    }

    if (currentPage - delta > 2) range.unshift("...")
    if (currentPage + delta < totalPages - 1) range.push("...")

    result.push(1, ...range, totalPages)
    return result
  }

  const pages = buildPages()

  return (
    <div className={styles.pagination}>
      <Button
        className={styles.pagination__navBtn}
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
      >
        &lt;
      </Button>

      {pages.map((p, idx) =>
        typeof p === "number" ? (
          <Button
            key={idx}
            onClick={() => onChange(p)}
            disabled={p === currentPage}
            className={classNames(styles.pagination__pageBtn, {
              [styles.active]: p === currentPage,
            })}
          >
            {p}
          </Button>
        ) : (
          <span key={idx} className={styles.dots}>
            {p}
          </span>
        )
      )}

      <Button
        className={styles.pagination__navBtn}
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
      >
        &gt;
      </Button>
    </div>
  )
}

export default Pagination
