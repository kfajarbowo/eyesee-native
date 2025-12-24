// Helmet Form Element - same structure as web
import { useEffect, useState } from "react";
import InputForm from "@/components/FormGroup/InputForm";
import InputWithPrefixForm from "@/components/FormGroup/InputWithPrefixForm";
import SelectCustom from "@/components/FormGroup/SelectCustom";
import ToggleForm from "@/components/FormGroup/ToggleForm";
import { useAllRegion } from "@/services/api/region/get/get.hooks";

interface FormElementProps {
  control: any;
  onSubmit: any;
  handleSubmit?: any;
  isSubmitting?: boolean;
}

export default function FormElement({
  control,
  onSubmit,
  handleSubmit,
  isSubmitting = false,
}: Readonly<FormElementProps>) {
  const [optionRegion, setOptionRegion] = useState<
    { value: string; label: string }[]
  >([]);
  const { data, isLoading } = useAllRegion();

  useEffect(() => {
    if (!isLoading && data?.data) {
      const optionsParse = data.data.map((region: any) => ({
        value: region.id!.toString(),
        label: region.name!,
      }));
      setOptionRegion(optionsParse);
    }
  }, [data, isLoading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="bg-card rounded-xl border border-border p-6">
        <InputForm
          control={control}
          name="name"
          type="text"
          isRequired={true}
          label="Nama"
          placeholder="Nama Helmet"
        />
        <InputWithPrefixForm
          control={control}
          name="path_slug"
          type="text"
          isRequired={true}
          label="Stream ID"
          placeholder="stream_id"
          prefix="helmet_"
        />
        <InputForm
          control={control}
          name="rtsp_url"
          type="text"
          isRequired={true}
          label="RTSP URL"
          placeholder="rtsp://..."
        />
        <ToggleForm
          control={control}
          name="need_convert"
          label="Need Convert"
        />
        <SelectCustom
          control={control}
          name="region_id"
          label="Region"
          isRequired={true}
          options={optionRegion}
          placeholder="Pilih Region"
        />
        
        <div className="mt-6">
          <button 
            type="submit" 
            className="btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menyimpan...' : 'Simpan'}
          </button>
        </div>
      </div>
    </form>
  );
}
