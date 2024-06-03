"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiTextProps {
  placeholder: string;
  value: string[];
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
}

const MultiText = ({
  placeholder,
  value,
  onChange,
  onRemove,
}: MultiTextProps) => {
  const [inputvalue, setInputvalue] = useState("");
  const addTag = (tag: string) => {
    onChange(tag);
    setInputvalue("");
  };
  return (
    <>
      <Input
        placeholder={placeholder}
        value={inputvalue}
        onChange={(e) => setInputvalue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            addTag(inputvalue);
          }
        }}
      />
      <div>
        {value.map((tag,index) => {
          return (
            <Badge className="bg-blue-1 text-white-1 mr-1 mt-1" key={index}>
              {tag}
              <Button className="p-0  hover:text-red-500" size="sm" type="button" onClick={() => onRemove(tag)}>
                <X className="text-base-medium" />
              </Button>
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default MultiText;
