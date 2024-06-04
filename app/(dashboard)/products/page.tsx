import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import React from 'react'

const ProductsPage = () => {
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