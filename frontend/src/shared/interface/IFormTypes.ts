import { Control } from "react-hook-form";

// Common properties interface
interface FormFieldProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  label?: string;
  defaultValue?: string;
  classname?: string;
}

// Generic form input type with common properties
export interface FormInputImageFileProps extends FormFieldProps {
  imagePreview: string | null;
  isAvatar?: boolean;
}

interface DropdownConfig<T> {
  displayField?: keyof T;
  valueField?: keyof T;
}

// Dropdown props extending common properties
export interface FormDropdownProps<T> extends FormFieldProps {
  placeholder: string;
  choices: (T | string)[];
  config?: DropdownConfig<T>;
  index?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  remove?: any;
  fieldsLength?: number;
}

// Number input type extending common properties
export type FormInputNumberType = FormFieldProps & {
  isNegativeAllowed?: boolean;
  isPhoneNumber?: boolean;
  placeholder: string;
};

// Text input type extending common properties
export type FormInputTextType = FormFieldProps & {
  placeholder: string;
};

// Rich text editor extending common properties
export type FormRichTextEditorType = FormFieldProps & {
  placeholder?: string;
};
