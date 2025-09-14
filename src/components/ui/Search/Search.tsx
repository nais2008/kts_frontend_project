import React from 'react'
import { Search as IconSearch } from 'lucide-react'

import Button from '../Button'
import Input from '../Input'

import styles from './Search.module.scss'

const Search: React.FC = () => {
  return (
    <div className={styles.search_contant}>
      <Input
        type='text'
        placeholder='Search...'
        value=''
        onChange={(e) => console.log(e.valueOf)}
      />
      <Button><IconSearch size={24} /></Button>
    </div>
  )
}

export default Search

