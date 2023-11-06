import { useMemo, useState } from 'react'

import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { findObjectByName } from '@/utils/helper'

import { SelectOption } from '@/components/form/select-field'

export const useProductDetail = (data?: Product) => {
  const unit = findObjectByName(data?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value

  const sizeDef = data?.sizes?.[0]
  const [selectedSize, setSelectedSize] = useState<string>(sizeDef?.id || '')
  const [price, setPrice] = useState<number>(sizeDef?.price || 0)
  const [quantity, setQuantity] = useState<number>(sizeDef?.quantity || 0)

  const sizeOptions: SelectOption[] =
    useMemo(
      () =>
        data?.sizes?.map((item) => ({
          label: item.size + ' ' + unit,
          value: item.id
        })),
      [data?.sizes, unit]
    ) || []

  const handleUpdateSize = (value: string) => {
    setSelectedSize(value)
    const size = data?.sizes.find((item) => item.id == value)
    setPrice(Number(size?.price))
    setQuantity(Number(size?.quantity))
  }

  return {
    unit,
    selectedSize,
    setSelectedSize,
    price,
    setPrice,
    quantity,
    setQuantity,
    sizeOptions,
    handleUpdateSize
  }
}
