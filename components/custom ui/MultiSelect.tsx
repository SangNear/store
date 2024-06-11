"use client"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command"
import { Badge, X } from "lucide-react"
import { useState } from "react"
import { Button } from "../ui/button"
interface MultiSelectProps {
    placeholder: string,
    collections: CollectionsTypes[]
    value: string[],
    onChange: (value: string) => void
    onRemove: (Value: string) => void
}

const MultiSelect = ({ placeholder, collections, value, onChange, onRemove }: MultiSelectProps) => {
    const [open, setOpen] = useState(false)
    const [inputValue, setInputValue] = useState("")

    
    let selected: CollectionsTypes[]
    if (value.length === 0) {
        selected = []
    }
    else {
        selected = value.map((id) => collections.find((collection) => collection._id === id)) as CollectionsTypes[];
    }
    // console.log("collections from multiSelect:", collections);
    
    // console.log("value multiselect:", value);
    
    // console.log("selected:", selected);

    let selectable: CollectionsTypes[]
    selectable = collections.filter((collection) => !selected.includes(collection))


    return (
        <Command className="bg-white overflow-visible" >
            <div className="flex gap-1 flex-wrap border rounded-sm p-1">
                {selected.map((item) => (
                    <div key={item._id} className=" flex flex-wrap bg-blue-500 rounded-md gap-2 p-1 text-white h-fit">
                        {item.title}
                        <button
                            type="button"
                            className="ml-1 hover:text-red-1"
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => onRemove(item._id)}
                        >
                            <X className="h-3 w-3" />
                        </button>
                    </div>
                ))}

                <CommandInput
                    placeholder={`${selected ? "" : placeholder}`}
                    value={inputValue}
                    onValueChange={setInputValue}
                    onBlur={() => setOpen(false)}
                    onFocus={() => setOpen(true)}
                />
            </div>
            <div className="relative mt-2 ">
                {open &&
                    <CommandList>
                        <CommandGroup className="absolute bg-white top-0 w-full z-10 border shadow-md rounded-md">
                            {selectable.map((collection) => {
                                return (
                                    <CommandItem
                                        key={collection._id}
                                        onMouseDown={(e: { preventDefault: () => any }) => e.preventDefault()}
                                        onSelect={() => { onChange(collection._id); setInputValue("") }}
                                        className="hover:bg-grey-2 cursor-pointer "
                                    >
                                        {collection.title}
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>

                }
            </div>
        </Command>
    )
}

export default MultiSelect