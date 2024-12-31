import { useToast } from "@/hooks/use-toast";
import { ToastType } from "@/shared/constants/TOAST";

const getEmojiForType = (type: ToastType): string => {
  switch (type) {
    case "Success":
      return "✅";
    case "Error":
      return "❌";
    case "Info":
      return "ℹ️";
    case "Warning":
      return "⚠️";
    default:
      return "";
  }
};

export const useCustomToast = () => {
  const { toast } = useToast();

  const showToast = (type: ToastType, description: string, title?: string) => {
    const emoji = getEmojiForType(type);
    toast({
      title: `${emoji} ${title ? title : type}`,
      description,
    });
  };

  return { showToast };
};
