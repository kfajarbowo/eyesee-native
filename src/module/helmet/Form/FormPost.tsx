// Helmet Form Post - same structure as web
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormElement from "./FormElement";
import { PostHelmetFunction } from "@/services/api/helmet/post/PostHelmetFunction";
import { HelmetSchema, HelmetValidation } from "../Validation";

export default function FormPostHelmet() {
  const navigate = useNavigate();

  const postHelmet = useMutation({
    mutationFn: PostHelmetFunction,
  });

  const { control, handleSubmit } = useForm<HelmetSchema>({
    resolver: zodResolver(HelmetValidation),
  });

  const onSubmit: SubmitHandler<HelmetSchema> = (values: HelmetSchema) => {
    postHelmet.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        navigate(`/manage/helmet`);
      },
      onError(error: any) {
        const message =
          error?.response?.data?.message ?? "Telah terjadi kesalahan!";
        toast.error(message);
      },
    });
  };

  return (
    <FormElement
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isSubmitting={postHelmet.isPending}
    />
  );
}
