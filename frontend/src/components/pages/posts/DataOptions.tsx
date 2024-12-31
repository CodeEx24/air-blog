import { STATUS } from "@/shared/constants/STATUS";
import {
  CheckCircledIcon,
  CrossCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: STATUS.Draft,
    label: STATUS.Draft,
    icon: CheckCircledIcon,
  },
  {
    value: STATUS.Published,
    label: STATUS.Published,
    icon: CrossCircledIcon,
  },
  {
    value: STATUS.Archived,
    label: STATUS.Archived,
    icon: StopwatchIcon,
  },
];
