import React, { useState } from 'react'
import styles from './Image.module.css'

export default function Image(props) {
  const [fullImage, setFullImage] = useState(false)

  return (
    <div >


      {<img alt='' src={props.src} className={props.className} onClick={() => { setFullImage(true) }} /> || ''}

      {fullImage && props.src &&
        <div className={styles.backdrop} onClick={() => { setFullImage(false) }}>
          <div className={styles.close}>Close</div>
          <div className={styles.imageContainer}>
            <img alt='no img' src={props.src} className={styles.image} />
          </div>
        </div>
      }
    </div>
  )
}
