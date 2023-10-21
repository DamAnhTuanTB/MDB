// import styles from '@/styles/modules/product/quick-review-modal.module.scss'
// import { Product } from '@/types/product'

// import Button from '../button'
// import HtmlRender from '../html-render'
// import Modal from '../modal'
// import RatingCommon from '../rating'

// type Props = {
//   data?: Product
//   open: boolean
//   onClose: () => void
// }

// export default function QuickReviewModal({ open, data, onClose }: Props) {
//   return (
//     <Modal open={open} onClose={onClose}>
//       <div className={styles.body}>
//         <div className={styles.pc}>
//           <div className={styles.image} style={{ backgroundImage: `url(${data?.img})` }}></div>
//           <Button variant="outlined" className={styles.content__viewmore}>
//             View More Details
//           </Button>
//         </div>
//         <div className={styles.content}>
//           <div className={styles.image__sp} style={{ backgroundImage: `url(${data?.img})` }} />
//           <h3 className={styles.content__name}>{data?.name}</h3>
//           <p className={styles.content__brand}>{data?.brand}</p>
//           <div className={styles.content__group}>
//             <RatingCommon score={data?.rating || 1} /> <span>{data?.rating}</span> ({data?.reviewCount} reviews)
//           </div>
//           <div className={styles.content__group}>
//             <h4>
//               {data?.price} <span> | </span> {data?.isInStock ? ' In Stock' : ' Out of stock'} <span> | </span> SKU: {data?.sku}
//             </h4>
//           </div>
//           <h4 className={styles.content__description__title}>Product Description</h4>
//           <div className={styles.content__description}>
//             <HtmlRender htmlString={data?.description || ''} />
//           </div>
//           <div className={styles.content__group}>
//             <Button variant="outlined" className={styles.content__viewmore__sp}>
//               View More Details
//             </Button>
//             <Button className={styles.content__addtocart}>Add to cart</Button>
//           </div>
//         </div>
//       </div>
//     </Modal>
//   )
// }
