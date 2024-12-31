import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { modules } from "@/shared/constants/QUILL_MODULES";
import { FormRichTextEditorType } from "@/shared/interface/IFormTypes";
import ReactQuill from "react-quill";

export const FormRichTextEditor = ({
  label,
  control,
  name,
  classname,
}: FormRichTextEditorType) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem>
            {" "}
            {label && <Label className={`${classname}`}>{label}</Label>}
            <FormControl>
              <ReactQuill
                theme="snow"
                value={field.value || ""}
                onChange={(content) => field.onChange(content)}
                modules={modules}
                className="h-[100%] pb-0"
              />
            </FormControl>
            <FormMessage className="p-0" />
          </FormItem>
        );
      }}
    />
  );
};
