import bannerImg from '../../assets/074_MAQUINAS_69cmX19cm.png'

import styles from './herobanner.module.css'  // sem o 's'

function Banner() {
  return (
    <section className={styles.heroBanner}>
      <div className={styles.heroBannerImgContainer}>
        <img src={bannerImg} className={styles.heroBannerImg} alt="074 Diversão" />
      </div>
    </section>
  )
}

export default Banner;