import { useEffect, useMemo, useState } from 'react'

import { PRODUCT_ATTRIBUTE, Product } from '@/types/product'
import { findObjectByName } from '@/utils/helper'

import { SelectOption } from '@/components/form/select-field'

export const useProductDetail = (data?: Product) => {
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [price, setPrice] = useState<number>(0)
  const [quantity, setQuantity] = useState<number>(0)
  const [unit, setUnit] = useState<string>('')

  const sizeOptions: SelectOption[] =
    useMemo(
      () =>
        data?.sizes?.map((item) => ({
          label: item.size + ' ' + unit,
          value: item.id
        })),
      [data?.sizes, unit]
    ) || []

  useEffect(() => {
    if (data) {
      setSelectedSize(String(data?.sizes[0].size))
      setPrice(data?.sizes[0].price)
      setQuantity(data?.sizes[0].quantity || 0)
      setUnit(findObjectByName(data?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value || '')
    }
  }, [data])

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
