"use client"
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Product from '@/lib/models/Product'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const ProductsPage = () => {
  const [products, setProducts] = useState<ProductType[]>([])
  const getAllProducts = async () => {
    try {
      const res = await fetch("/api/products", {
        method: "GET"
      })
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.log(error);

    }
  }
  useEffect(() => {
    getAllProducts()
  }, [])

  console.log("data product:", products);
  
  return (
    <div className='px-10 py-5'>
      <div className='flex justify-between'>
        <h2 className='text-heading2-bold'>Products</h2>
        <Button className='bg-blue-1 text-white-1 hover:text-gray-400'>
          <Link href="/products/new">+ Add Product</Link>
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />
    </div>
  )
}

export default ProductsPage