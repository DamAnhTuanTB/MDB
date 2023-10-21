import { AttributeFilterItem, productAttributeGroup } from '@/types/product/attribute'

import { SelectOption } from '@/components/form/select-field'

export const defaultFilterGroup: AttributeFilterItem[] = [
  { key: productAttributeGroup.SPF, type: 'checkbox', name: 'SPF Rating' },
  { key: productAttributeGroup.SUNSCREEN_TYPE, type: 'checkbox', name: 'Sunscreen Type' },
  { key: productAttributeGroup.PRICE, type: 'slider', name: 'Price' },
  { key: productAttributeGroup.TINTED, type: 'checkbox', name: 'Tinted' },
  { key: productAttributeGroup.BRAND, type: 'checkbox', name: 'Brands' },
  { key: productAttributeGroup.RATING, type: 'rating', name: 'Rating' },
  { key: productAttributeGroup.LOCATION, type: 'checkbox', name: 'Location' },
  { key: productAttributeGroup.SKIN_TYPE, type: 'checkbox', name: 'Skin Type' },
  { key: productAttributeGroup.CONCERN, type: 'checkbox', name: 'Concern' },
  { key: productAttributeGroup.PRODUCT_FORM, type: 'checkbox', name: 'Product Form' },
  { key: productAttributeGroup.PREFERENCES, type: 'checkbox', name: 'Preferences' }
  // { key: productAttributeGroup.in, type: 'checkbox', name: 'Special Ingredients' }
]

export const sortOptions: SelectOption[] = [
  { label: 'Price', value: 'price' },
  { label: 'Spf', value: 'spf' },
  { label: 'Average Rating', value: 'averageRating' },
  { label: 'Products Sold', value: 'productsSold' }
]
