"use client"
import Loader from '@/components/custom ui/Loader'
import ProductForm from '@/components/products/ProductForm'

import { NextRequest } from 'next/server'
import React, { useEffect, useState } from 'react'

const ProductDetail = ({ params }: { params: { productId: string } }) => {
  const [loading, setLoading] = useState(true)
  const [productDetail, setProductDetail] = useState<ProductType | null>(null)

  const getProduct = async () => {
    try {
      const res = await fetch(`/api/products/${params.productId}`, {
        method: "GET"
      })
      const data = await res.json()
      setProductDetail(data)
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  console.log("update product:", productDetail);
  console.log("params", params.productId);
  useEffect(() => {
    getProduct()
  }, [])
  return (
    loading ? <Loader /> : <ProductForm inititalValue={productDetail} />
      

      
  )


}

export default ProductDetail