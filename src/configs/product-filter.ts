import { FilterGroup } from '@/components/products/filter'

export const filterList: FilterGroup[] = [
  {
    title: 'SPF Rating',
    type: 'checkList',
    checkList: [
      { label: '0 - 15', key: '0_15' },
      { label: '15 - 30', key: '15_30' },
      { label: '30 - 50', key: '30_50' },
      { label: '70+', key: '70' }
    ]
  },
  {
    title: 'Sunscreen Type',
    type: 'checkList',
    checkList: [
      { label: 'Physical', key: 'physical' },
      { label: 'Chemical', key: 'chemical' },
      { label: 'Physical & Chemical', key: 'physical_and_chemical' }
    ]
  },
  {
    title: 'Price',
    type: 'range',
    range: [0, 100]
  },
  {
    title: 'Tinted',
    type: 'checkList',
    checkList: [
      { label: 'Tinted', key: 'tinted' },
      { label: 'Non-Tinted', key: 'non-tinted' }
    ]
  },
  {
    title: 'Brands',
    type: 'checkList',
    checkList: [
      { label: 'EltaMD', key: 'EltaMD' },
      { label: 'Skin Medica', key: 'Skin Medica' },
      { label: 'DefenAge', key: 'DefenAge' },
      { label: 'CLn', key: 'CLn' },
      { label: 'Epionce', key: 'Epionce' },
      { label: 'ISDIN', key: 'ISDIN' },
      { label: 'Neocutis', key: 'Neocutis' }
    ]
  },
  {
    title: 'Rating',
    type: 'rating'
  },
  {
    title: 'Location',
    type: 'checkList',
    checkList: [
      { label: 'Face', key: 'Face' },
      { label: 'Neck', key: 'Neck' },
      { label: 'Body', key: 'Body' },
      { label: 'Hands', key: 'Hands' },
      { label: 'Lips', key: 'Lips' },
      { label: 'Feet', key: 'Feet' },
      { label: 'Hair', key: 'Hair' }
    ]
  },
  {
    title: 'Skin Type',
    type: 'checkList',
    checkList: [
      { label: 'Normal', key: 'Normal' },
      { label: 'Oily', key: 'Oily' },
      { label: 'Dry', key: 'Dry' },
      { label: 'Combination', key: 'Combination' },
      { label: 'Acne-Prone', key: 'Acne-Prone' },
      { label: 'Sensitive', key: 'Sensitive' }
    ]
  },
  {
    title: 'Concern',
    type: 'checkList',
    checkList: [
      { label: 'Acne', key: 'Acne' },
      { label: 'Dark Circles', key: 'Dark Circles' },
      { label: 'Dark Spots', key: 'Dark Spots' },
      { label: 'Discoloration', key: 'Discoloration' },
      { label: 'Redness', key: 'Redness' },
      { label: 'Sensitive Skin', key: 'Sensitive Skin' },
      { label: 'Dry Skin', key: 'Dry Skin' }
    ]
  },
  {
    title: 'Product Form',
    type: 'checkList',
    checkList: [
      { label: 'Ointment', key: 'Ointment' },
      { label: 'Cream', key: 'Cream' },
      { label: 'Lotion', key: 'Lotion' },
      { label: 'Gel', key: 'Gel' },
      { label: 'Serum', key: 'Serum' },
      { label: 'Oral Supplement', key: 'Oral Supplement' },
      { label: 'Oil', key: 'Oil' }
    ]
  },
  {
    title: 'Preferences',
    type: 'checkList',
    checkList: [
      { label: 'Non-Comedogenic', key: 'Non-Comedogenic' },
      { label: 'Reef Safe', key: 'Reef Safe' },
      { label: 'Sulfate Free', key: 'Sulfate Free' },
      { label: 'Paraben Free', key: 'Paraben Free' },
      { label: 'Water Resistant', key: 'Water Resistant' },
      { label: 'Pregnancy Caution', key: 'Pregnancy Caution' }
    ]
  },
  {
    title: 'Special Ingredients',
    type: 'checkList',
    checkList: [
      { label: 'Antioxidant', key: 'Antioxidant' },
      { label: 'Arnica', key: 'Arnica' },
      { label: 'Sulfate Free', key: 'Sulfate Free' },
      { label: 'Ascorbic Acid', key: 'Ascorbic Acid' },
      { label: 'Azalaic Acid', key: 'Azalaic Acid' },
      { label: 'Bakuchiol', key: 'Bakuchiol' },
      { label: 'Caffeine', key: 'Caffeine' },
      { label: 'Ceramides', key: 'Ceramides' }
    ]
  }
]
