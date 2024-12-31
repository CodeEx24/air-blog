import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { FormInputText } from "@/components/common/input/FormInputText";
import { Button } from "@/components/ui/button";
import { TOAST_TYPE } from "@/shared/constants/TOAST";
import { ErrorResponse } from "@/shared/interface/ErrorType";
import { Form } from "@/components/ui/form";
import FormDropdown from "@/components/common/input/FormDropdown";

import { PostFormProps } from "@/shared/interface/IDialogFormType";
import { useCustomToast } from "@/hooks/useCustomToast";
import {
  createPostSchema,
  PostFormData,
  updatePostSchema,
} from "@/shared/schema/postSchema";
import {
  useCreatePostMutation,
  useUpdatePostMutation,
} from "@/pages/api/postApiSlice";
import { STATUS } from "@/shared/constants/STATUS";
import "react-quill/dist/quill.snow.css";
import { FormRichTextEditor } from "../../common/input/FormRichTextEditor";
import { FormInputImageFile } from "@/components/common/input/FormInputImageFile";
import { convertToBase64 } from "@/lib/convertToBase64";

export function PostForm({ setShowDialog, post }: PostFormProps) {
  const { showToast } = useCustomToast();

  const [createPost] = useCreatePostMutation();
  const [updatePost] = useUpdatePostMutation();

  const postSchema = post ? updatePostSchema : createPostSchema;

  const postForm = useForm<PostFormData>({
    resolver: zodResolver(postSchema),
    defaultValues: {
      author: post?.author ?? "",
      author_image: "",
      title: post?.title ?? "",
      content: post?.content ?? "",
      slug: post?.slug ?? "",
      image: "",
      tags: post?.tags ?? "",
      status: post?.status ?? "Draft",
    },
  });

  postForm.register("author_image");

  const { control, setError } = postForm;

  const onSubmit = async (data: z.infer<typeof postSchema>) => {
    const authorImageFile = data.author_image?.[0] || null;
    const imageFile = data.image?.[0] || null;

    const [authorImageBase64, imageBase64] = await Promise.all([
      authorImageFile ? convertToBase64(authorImageFile) : null,
      imageFile ? convertToBase64(imageFile) : null,
    ]);

    const payload = {
      ...data,
      author_image: authorImageBase64 || null,
      image: imageBase64 || null,
    };

    try {
      if (!post) {
        const result = await createPost(payload).unwrap();
        if (result.success) {
          showToast(TOAST_TYPE.SUCCESS, result.message);
          setShowDialog(false);
        } else {
          showToast(TOAST_TYPE.ERROR, result?.message);

          Object.entries(result.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) =>
                setError(field as keyof PostFormData, {
                  type: "manual",
                  message,
                })
              );
            }
          });
        }
      } else {
        const result = await updatePost({
          id: post.id,
          updates: payload,
        }).unwrap();
        if (result.success) {
          showToast(TOAST_TYPE.SUCCESS, result?.message);
          setShowDialog(false);
        } else {
          Object.entries(result.data).forEach(([field, messages]) => {
            if (Array.isArray(messages)) {
              messages.forEach((message) =>
                setError(field as keyof PostFormData, {
                  type: "manual",
                  message,
                })
              );
            }
          });
          showToast(TOAST_TYPE.ERROR, result?.message);
        }
      }
    } catch (error: unknown) {
      const axiosError = error as ErrorResponse;
      if (!axiosError?.response) {
        showToast(
          TOAST_TYPE.ERROR,
          axiosError?.data?.message || "No server error response"
        );
      } else {
        showToast(TOAST_TYPE.ERROR, "Something went wrong");
      }
    }
  };

  return (
    <Form {...postForm}>
      <form onSubmit={postForm.handleSubmit(onSubmit)} className="space-y-4">
        <FormInputImageFile
          control={control}
          name="author_image"
          label="Author Image"
          isAvatar={true}
          imagePreview={post?.author_image || null}
        />

        <FormInputText
          label="Author Name"
          control={control}
          name="author"
          placeholder="Full Name"
        />

        <FormInputImageFile
          control={control}
          name="image"
          label="Featured Image"
          imagePreview={post?.image || null}
        />

        <FormInputText
          label="Title"
          control={control}
          name="title"
          placeholder="Title"
        />
        <FormRichTextEditor control={control} name="content" />
        <FormInputText
          label="Slug"
          control={control}
          name="slug"
          placeholder="Slug"
        />
        <FormInputText
          label="Tags (separated by commas)"
          control={control}
          name="tags"
          placeholder="Tags"
        />
        <FormDropdown
          choices={Object.values(STATUS)}
          label="Status"
          control={control}
          name="status"
          placeholder="Select a status"
        />
        <Button
          className="w-full"
          type="submit"
          disabled={Object.keys(postForm?.formState.errors || {}).length > 0}
        >
          {post ? `Update Post Details` : `Create a Post`}
        </Button>
      </form>
    </Form>
  );
}
