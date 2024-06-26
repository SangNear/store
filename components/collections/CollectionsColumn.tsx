"use client";

import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom ui/Delete";
import Link from "next/link";

export const columns: ColumnDef<CollectionsTypes>[] = [
  {
    accessorKey: "title",
    header: "Title",
    cell: ({row}) => <Link href={`/collections/${row.original._id}`} className="hover:text-blue-1">{row.original.title}</Link>
  },
  {
    accessorKey: "products",
    header: "Products",
    cell: ({row}) => <p>{row.original.product.length}</p>
  },
  {
    id: "actions",
    cell: ({ row }) => <Delete item="products" id={row.original._id} />,
  },
];
