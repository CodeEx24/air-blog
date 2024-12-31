import { z } from "zod";
import { tablePostSchema } from "../schema/postSchema";

export interface PostFormProps {
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>;
  post?: z.infer<typeof tablePostSchema>;
}
