import { useMemo, useState } from 'react'

import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { findObjectByName } from '@/utils/helper'

import { SelectOption } from '@/components/form/select-field'

export const useProductDetail = (data?: Product) => {
  const unit = findObjectByName(data?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value

  const [selectedSize, setSelectedSize] = useState<string>(String(data?.sizes[0].size))
  const [price, setPrice] = useState<number>(data?.sizes[0].price || 0)
  const [quantity, setQuantity] = useState<number>(data?.sizes[0].quantity || 0)

  const sizeOptions: SelectOption[] = useMemo(() => data?.sizes.map((item) => ({ label: item.size + ' ' + unit, value: String(item.size) })), [data?.sizes, unit]) || []

  const handleUpdateSize = (value: string) => {
    setSelectedSize(value)
    const size = data?.sizes.find((item) => item.size == Number(value))
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
