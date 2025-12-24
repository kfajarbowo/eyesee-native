// Body Worm Form Edit - same structure as web
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FormElement from "./FormElement";
import { UpdateBodyWormFunction } from "@/services/api/body_worm/update/UpdateBodyWormFunction";
import { BodyWormSchema, BodyWormValidation } from "../Validation";
import { useDetailBodyWorm } from "@/services/api/body_worm/get/get.hooks";

interface FormBodyWormProps {
  id: string;
}

export default function FormEditBodyWorm({ id }: Readonly<FormBodyWormProps>) {
  const navigate = useNavigate();

  const updateBodyWorm = useMutation({
    mutationFn: UpdateBodyWormFunction,
  });

  const { control, handleSubmit, reset } = useForm<BodyWormSchema>({
    resolver: zodResolver(BodyWormValidation),
  });

  const { data, isLoading, error } = useDetailBodyWorm({ id });

  useEffect(() => {
    if (!isLoading && data?.data) {
      reset({
        name: data.data.name,
        path_slug: data.data.path_slug?.replace("bwc_", "") || "",
        rtsp_url: data.data.rtsp_url,
        need_convert: data.data.need_convert || false,
        region_id: data.data.region_id?.toString(),
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<BodyWormSchema> = (values: BodyWormSchema) => {
    updateBodyWorm.mutate(
      { id, data: values },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          navigate(`/manage/body-worm`);
        },
        onError(error: any) {
          const message =
            error?.response?.data?.message ?? "Telah terjadi kesalahan!";
          toast.error(message);
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 text-red-700 px-4 py-3 rounded">
        Data tidak ditemukan
      </div>
    );
  }

  return (
    <FormElement
      control={control}
      onSubmit={onSubmit}
      handleSubmit={handleSubmit}
      isSubmitting={updateBodyWorm.isPending}
    />
  );
}
