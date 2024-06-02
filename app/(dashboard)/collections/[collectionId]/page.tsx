"use client";

import CollectionForm from "@/components/collections/CollectionForm";
import Loader from "@/components/custom ui/Loader";
import React, { useEffect, useState } from "react";

const CollectionDetail = ({ params }: { params: { collectionId: string } }) => {
  const [collectionDetail, setcollectionDetail] =
    useState<CollectionsTypes | null>(null);
  const [loading, setLoading] = useState(true);
  const getColletionDetail = async () => {
    try {
      const res = await fetch(`/api/collections/${params.collectionId}`);
      const data = await res.json();
      setcollectionDetail(data);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getColletionDetail();
  }, []);
  console.log("detail", collectionDetail);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        
        <CollectionForm inititalValue={collectionDetail} />
      )}
    </div>
  );
};

export default CollectionDetail;
