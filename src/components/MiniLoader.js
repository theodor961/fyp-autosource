import React from 'react'
import {RiLoader4Line} from 'react-icons/ri'
import miniLoaderCss from './MiniLoader.module.css'

function MiniLoader() {
  return (
    <div>
        <RiLoader4Line  className={miniLoaderCss.uploadIcon}/></div>
  )
}

export default MiniLoader