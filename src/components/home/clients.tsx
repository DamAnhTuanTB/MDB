import Image from 'next/image'

import styles from '@/styles/modules/home/client.module.scss'

export default function Clients() {
  return (
    <div className={styles.wrapper}>
      <div className="container mx-auto">
        <div className={styles.content}>
          <Image src={'/images/home/clients/elemis.png'} width={218} height={125} alt="elemis" />
          <Image src={'/images/home/clients/loreal.png'} width={218} height={125} alt="loreal" />
          <Image src={'/images/home/clients/olay.png'} width={218} height={125} alt="olay" />
          <Image src={'/images/home/clients/clinique.png'} width={218} height={125} alt="clinique" />
          <Image src={'/images/home/clients/careve.png'} width={218} height={125} alt="careve" />
          <Image src={'/images/home/clients/drunk_elephant.png'} width={218} height={125} alt="drunk elephant" />
          <Image src={'/images/home/clients/sk_II.png'} width={218} height={125} alt="skII" />
          <Image src={'/images/home/clients/elta_md.png'} width={218} height={125} alt="elta_md" />
          <Image src={'/images/home/clients/skinceuticals.png'} width={218} height={125} alt="skinceuticals" />
          <Image src={'/images/home/clients/estee.png'} width={218} height={125} alt="estee" />
        </div>
      </div>
    </div>
  )
}
