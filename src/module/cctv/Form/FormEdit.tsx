// CCTV Form Edit - same structure as web
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import FormElement from "./FormElement";
import { UpdateCctvFunction } from "@/services/api/cctv/update/UpdateCctvFunction";
import { CctvSchema, CctvValidation } from "../Validation";
import { useDetailCctv } from "@/services/api/cctv/get/get.hooks";

interface FormCctvProps {
  id: string;
}

export default function FormEditCctv({ id }: Readonly<FormCctvProps>) {
  const navigate = useNavigate();

  const updateCctv = useMutation({
    mutationFn: UpdateCctvFunction,
  });

  const { control, handleSubmit, reset } = useForm<CctvSchema>({
    resolver: zodResolver(CctvValidation),
  });

  const { data, isLoading, error } = useDetailCctv({ id });

  useEffect(() => {
    if (!isLoading && data?.data) {
      reset({
        name: data.data.name,
        path_slug: data.data.path_slug?.replace("cctv_", "") || "",
        rtsp_url: data.data.rtsp_url,
        lat: data.data.lat,
        long: data.data.long,
        region_id: data.data.region_id?.toString(),
      });
    }
  }, [data, isLoading, reset]);

  const onSubmit: SubmitHandler<CctvSchema> = (values: CctvSchema) => {
    updateCctv.mutate(
      { id, data: values },
      {
        onSuccess() {
          toast.success("Berhasil diupdate!");
          navigate(`/manage/cctv`);
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
      isSubmitting={updateCctv.isPending}
    />
  );
}
