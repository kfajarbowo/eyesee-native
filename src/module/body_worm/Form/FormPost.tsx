// Body Worm Form Post - same structure as web
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FormElement from "./FormElement";
import { PostBodyWormFunction } from "@/services/api/body_worm/post/PostBodyWormFunction";
import { BodyWormSchema, BodyWormValidation } from "../Validation";

export default function FormPostBodyWorm() {
  const navigate = useNavigate();

  const postBodyWorm = useMutation({
    mutationFn: PostBodyWormFunction,
  });

  const { control, handleSubmit } = useForm<BodyWormSchema>({
    resolver: zodResolver(BodyWormValidation),
  });

  const onSubmit: SubmitHandler<BodyWormSchema> = (values: BodyWormSchema) => {
    postBodyWorm.mutate(values, {
      onSuccess() {
        toast.success("Berhasil ditambahkan!");
        navigate(`/manage/body-worm`);
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
      isSubmitting={postBodyWorm.isPending}
    />
  );
}
