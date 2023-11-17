import { useCallback, useEffect, useMemo, useState } from 'react'

import { useProduct } from '@/hooks/pages/use-product'
import { Product, PRODUCT_ATTRIBUTE } from '@/types/product'
import { findObjectByName } from '@/utils/helper'

export const useProductDetail = (data?: Product) => {
  const [selectedSize, setSelectedSize] = useState<string | number>('')
  const [unit, setUnit] = useState<string>('')

  const { data: sizeOptionsData, getProductList } = useProduct()

  const sizeOptions = useMemo(() => {
    return sizeOptionsData?.results?.map((i) => ({ value: i.size, label: `${i.size} ${unit}` })) || []
  }, [sizeOptionsData, unit])

  const getSizes = () => {
    getProductList({ where: { identifier: data?.identifier } })
  }

  useEffect(() => {
    getSizes()
    setSelectedSize(data?.size || '')
  }, [data])

  useEffect(() => {
    if (data && sizeOptionsData?.results) {
      setUnit(findObjectByName(sizeOptionsData?.results[0]?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value || '')
    }
  }, [data, sizeOptionsData?.results])

  const handleUpdateSize = useCallback(
    (value: string) => {
      setSelectedSize(value)
      const productSize = sizeOptionsData?.results?.find((item) => item.size == Number(value))
      setUnit(findObjectByName(productSize?.attributeGroups || [], 'key', PRODUCT_ATTRIBUTE.UNIT)?.attributes[0]?.value || '')
    },
    [selectedSize, sizeOptionsData?.results]
  )

  return {
    unit,
    selectedSize,
    setSelectedSize,
    sizeOptions,
    sizeOptionsData,
    handleUpdateSize
  }
}
