import Image from 'next/image'

import styles from '@/styles/modules/product/description.module.scss'

export default function DescriptionDetail() {
  return (
    <div className={styles.content_wrapper}>
      <div className={styles.table}>
        <div>
          <h3>Product Features</h3>
          <p>UVA/UVB sun protection</p>
          <p>Moisturizing lotion for the whole body</p>
          <p>Safe for all skin types</p>
        </div>
        <div className={styles.icons}>
          <Image src={'/images/products/icon.png'} width={100} height={100} alt="icon" />
          <Image src={'/images/products/icon.png'} width={100} height={100} alt="icon" />
          <Image src={'/images/products/icon.png'} width={100} height={100} alt="icon" />
          <Image src={'/images/products/icon.png'} width={100} height={100} alt="icon" />
        </div>
      </div>
      <hr />
      <h3>Awards</h3>
      <p>InStyle - Best Beauty Buys 2022, Women's Health Magazine - Skincare Awards 2022</p>
      <hr />
      <h3>Ingredients</h3>
      <h4>Active Ingredients:</h4>
      <p>Zinc Oxide 7.0%, Octinoxate 7.5%</p>
      <h4>Inactive Ingredients: </h4>
      <p>
        Purified Water, Petrolatum, Isopropyl Palmitate, Octyl Stearate, Glyceryl Stearate, Cetearyl Glucoside, Dimethicone, PEG-100 Stearate, Hydroxyethyl Acrylate/Sodium Acryloyldimethyl Taurate
        Copolymer, Polyisobutene, PEG-7 Trimethylolpropane Coconut Ether, Sodium Hyaluronate, Tocopheryl Acetate, Polyether-1, Citric Acid, Oleth-3 Phosphate, Phenoxyethanol, Butylene Glycol,
        Iodopropynyl Butylcarbamate, Triethoxycaprylylsilane.
      </p>
    </div>
  )
}
