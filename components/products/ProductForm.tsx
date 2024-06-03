"use client";
import { Separator } from "../ui/separator";
import { array, string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import CircularProgress from "@mui/material/CircularProgress";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import ImageUpload from "../custom ui/ImageUpload";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
import MultiText from "../custom ui/MultiText";
import { auth } from "@clerk/nextjs";
import { connectDB } from "@/lib/mongoDB";
import Collection from "@/lib/models/Collection";
import MultiSelect from "../custom ui/MultiSelect";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50).trim(),
  media: z.array(z.string()),
  category: z.string(),
  collections: z.array(z.string()),
  tags: z.array(z.string()),
  sizes: z.array(z.string()),
  colors: z.array(z.string()),
  price: z.coerce.number().min(0.1),
  expense: z.coerce.number().min(0.1),
});

interface ProductFormProps {
  inititalValue?: ProductType | null;
}

const ProductForm = ({ inititalValue }: ProductFormProps) => {
  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState<CollectionsTypes[]>([])
  const route = useRouter();
  const getCollections = async () => {
    try {
      const res = await fetch("/api/collections", {
        method: "GET"
      })
      const data = await res.json()
      setCollections(data)
      
      
    } catch (error) {
      console.log(error);
      
    }
  }

  useEffect(() => {
    getCollections()
    
    
  }, [])
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: inititalValue
      ? inititalValue
      : {
          title: "",
          description: "",
          media: [],
          category: "",
          collections: [],
          tags: [],
          sizes: [],
          colors: [],
          price: 0.1,
          expense: 0.1,
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = inititalValue
        ? `/api/products/${inititalValue._id}`
        : "/api/products";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Product ${inititalValue ? "updated" : "created"}`);
        route.push("/products");
      } else {
        setLoading(false);
        toast.error("Collection failed to create!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log("collections", collections);
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between items-center">
        <p className="text-heading2-bold">Collections</p>
        {inititalValue ? <Delete id={inititalValue._id} /> : ""}
      </div>

      <Separator className="bg-grey-1 w-full mt-4 mb-7" />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Description here..."
                    {...field}
                    rows={5}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="media"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange([...field.value, url])}
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((image) => image !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price $</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Price" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expense"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expense</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="expense" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <FormControl>
                    <Input placeholder="category" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <MultiText
                      placeholder="Tags"
                      value={field.value}
                      onChange={(tag) => field.onChange([...field.value, tag])}
                      onRemove = {(tagToRemove) =>  field.onChange([...field.value.filter((tag) => tag !== tagToRemove)])}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="collections"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Collections</FormLabel>
                  <FormControl>
                    <MultiSelect
                      placeholder="Collection"
                      collections={collections}
                      value={field.value}
                      onChange={(_id) => field.onChange([...field.value, _id])}
                      onRemove = {(idToRemove) =>  field.onChange([...field.value.filter((collectionId) => collectionId !== idToRemove)])}
                    />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
          </div>

          {loading ? (
            <CircularProgress />
          ) : (
            <Button className="bg-red-500 text-white" type="submit">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default ProductForm;
