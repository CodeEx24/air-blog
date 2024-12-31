import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormInputNumberType } from "@/shared/interface/IFormTypes";

export const FormInputNumber = ({
  label,
  control,
  name,
  placeholder,
  classname,
  isNegativeAllowed = false,
  isPhoneNumber = false,
}: FormInputNumberType) => {
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
                type="number"
                placeholder={placeholder}
                className={`border-[#E4E4E7] ${classname}`}
                onKeyDown={(e) =>
                  ["e", "E", "+", "-", "."].includes(e.key) &&
                  e.preventDefault()
                }
                {...field}
                value={
                  isPhoneNumber
                    ? field.value
                    : field.value !== undefined
                    ? Number(field.value).toString()
                    : ""
                }
                onChange={(e) => {
                  let value = e.target.value;

                  if (isPhoneNumber) {
                    field.onChange(value);
                  } else {
                    value = value.replace(/[^0-9.]/g, "");

                    const trimValue = value.replace(/^0+(?!$)/, "") || "0";

                    const numericValue = parseFloat(trimValue);

                    if (isNegativeAllowed || numericValue >= 0) {
                      field.onChange(numericValue);
                    }
                  }
                }}
              />
            </FormControl>
            <FormMessage className={`${classname} p-0`} />
          </FormItem>
        );
      }}
    />
  );
};
