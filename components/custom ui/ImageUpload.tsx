"use client";
import { CldUploadWidget } from "next-cloudinary";
import { Button } from "../ui/button";
import { Trash2, Upload } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const ImageUpload = ({ value, onChange, onRemove }: ImageUploadProps) => {
  const onUpload = (result: any) => {
    console.log("onchange result", result);
    
    onChange(result.info.secure_url);
  };
  console.log("images: ", value);

  return (
    <div className="flex flex-col gap-3 ">
      <CldUploadWidget uploadPreset="sg00bdhs" onSuccess={onUpload}>
        {({ open }) => {
          return (
            <Button
              className="bg-blue-2 text-grey-1 flex items-center gap-2"
              onClick={() => open()}
            >
              <p>Upload an Image</p>
              <Upload />
            </Button>
          );
        }}
      </CldUploadWidget>
      <div className="flex items-center gap-3">
        {value &&
          value.map((item, index) => {
            return (
              <div key={index} className="relative w-[200px] h-[200px]">
                <Trash2
                  onClick={() => onRemove(item)}
                  className="absolute top-0 right-0 w-9 h-9 bg-red-500 z-10 text-white-1 cursor-pointer p-2 rounded-lg hover:p-1 ease-linear duration-200 "
                />
                <Image
                  src={item}
                  fill
                  alt="collections"
                  className="object-cover rounded-md"
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ImageUpload;
