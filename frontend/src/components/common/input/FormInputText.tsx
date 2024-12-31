import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormInputTextType } from "@/shared/interface/IFormTypes";

export const FormInputText = ({
  label,
  control,
  name,
  placeholder,
  classname,
}: FormInputTextType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {label && <Label className={`${classname}`}>{label}</Label>}
            <FormControl>
              <Input
                type="text"
                placeholder={placeholder}
                className={`border-[#E4E4E7] ${classname}`}
                {...field}
              />
            </FormControl>
            <FormMessage className={`${classname} p-0`} />
          </FormItem>
        );
      }}
    />
  );
};
