import { useRef, useState } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { ACCEPTED_IMAGE_TYPES } from "@/shared/constants/IMAGE_TYPE";
import { FormInputImageFileProps } from "@/shared/interface/IFormTypes";

export function FormInputImageFile({
  control,
  name,
  label,
  isAvatar,
  imagePreview,
}: FormInputImageFileProps) {
  const [preview, setPreview] = useState<string | null>(imagePreview);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  return (
    <FormField
      control={control}
      name={name}
      render={(field) => {
        return (
          <FormItem className={`${isAvatar ? "flex gap-4" : ""}`}>
            {isAvatar && (
              <Avatar className="w-20 h-20 object-cover rounded-full border-spacing-1 border-gray-200 border-2">
                <AvatarImage
                  src={preview || undefined}
                  alt="Author Image"
                  className=" rounded-full"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            )}
            <div className="flex flex-grow flex-col gap-3">
              <FormLabel>{label}</FormLabel>
              {!isAvatar && (
                <div
                  className={`max-w-full h-[250px] object-cover flex justify-center items-center  border-gray-300 border-2 rounded-lg cursor-pointer ${
                    preview ? "h-[250px]" : "h-[200px] border-dashed"
                  }`}
                  onClick={() => fileInputRef.current?.click()}
                >
                  {preview ? (
                    <LazyLoadImage
                      alt={label}
                      src={preview || undefined}
                      className="w-full h-[250px] object-cover border-solid border-gray-300 border-2 rounded-lg"
                      effect="blur"
                    />
                  ) : (
                    <span>No Image Selected</span>
                  )}
                </div>
              )}
              <FormControl>
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept={ACCEPTED_IMAGE_TYPES.join(",")}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      field.field.onChange(e.target.files);
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setPreview(reader.result as string);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        );
      }}
    ></FormField>
  );
}
