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
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Delete from "../custom ui/Delete";
const formSchema = z.object({
  title: z.string().min(2).max(50),
  description: z.string().min(2).max(50).trim(),
  image: z.string(array(string())),
});

interface CollectionFormProps {
  inititalValue?: CollectionsTypes | null;
}

const CollectionForm = ({ inititalValue }: CollectionFormProps) => {
  const [loading, setLoading] = useState(false);
  const route = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: inititalValue
      ? inititalValue
      : {
          title: "",
          description: "",
          image: "",
        },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const url = inititalValue
        ? `/api/collections/${inititalValue._id}`
        : "/api/collections";
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (res.ok) {
        setLoading(false);
        toast.success(`Collection ${inititalValue? "updated" : "created"}`);
        route.push("/collections");
      } else {
        setLoading(false);
        toast.error("Collection failed to create!");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="p-10 w-full">
      <div className="flex justify-between items-center">
        <p className="text-heading2-bold">{inititalValue? "Update Collection" : "Create Collection"}</p>
        {inititalValue ? <Delete item="collection" id={inititalValue._id} /> : ""}
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
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <ImageUpload
                    value={field.value ? [field.value] : []}
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
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

export default CollectionForm;
