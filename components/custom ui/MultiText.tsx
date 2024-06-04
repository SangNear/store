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
  const addValue = (item: string) => {
    onChange(item);
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
            addValue(inputvalue);
          }
        }}
      />
      <div>
        {value.map((item,index) => {
          return (
            <Badge className="bg-blue-1 text-white-1 mr-1 mt-1" key={index}>
              {item}
              <button className="p-0  hover:text-red-500" type="button" onClick={() => onRemove(item)}>
                <X className="text-base-medium" />
              </button>
            </Badge>
          );
        })}
      </div>
    </>
  );
};

export default MultiText;
