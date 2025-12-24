// Toggle/Switch component - same structure as web
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface ToggleFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  disabled?: boolean;
}

export default function ToggleForm<T extends FieldValues>({
  control,
  name,
  label,
  disabled = false,
}: Readonly<ToggleFormProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="mb-4">
          <div className="flex items-center gap-3">
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={value || false}
                onChange={(e) => onChange(e.target.checked)}
                disabled={disabled}
              />
              <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-ring rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
            </label>
            {label && (
              <span className="text-sm font-medium text-foreground">{label}</span>
            )}
          </div>

          {error && (
            <p className="text-xs text-red-500 mt-1.5">
              * {error?.message?.toString()}
            </p>
          )}
        </div>
      )}
    />
  );
}
