"use client";
import { columns } from "@/components/collections/CollectionsColumn";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Collections = () => {
  const [loading, setLoading] = useState(true);
  const [collections, setCollections] = useState([]);

  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET",
      });
      const data = await res.json();
      setCollections(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCollections();
  }, []);
  console.log("du lieu collections", collections);

  return (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <h2 className="text-heading2-bold">Collections</h2>
        <Button className="bg-blue-1 text-white hover:opacity-70">
          <Link href="/collections/new">+ Add Collection</Link>
        </Button>
      </div>
      <Separator className="bg-grey-1 my-4" />

      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
};

export default Collections;
