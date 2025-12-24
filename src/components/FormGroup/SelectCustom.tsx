// Select component - same structure as web
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectCustomProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  options: SelectOption[];
  placeholder?: string;
  disabled?: boolean;
  isClearable?: boolean;
}

export default function SelectCustom<T extends FieldValues>({
  control,
  name,
  label,
  isRequired = false,
  options,
  placeholder = 'Select...',
  disabled = false,
  isClearable = false,
}: Readonly<SelectCustomProps<T>>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <div className="mb-4">
          <div className="form-control w-full">
            <label className="block mb-1.5">
              <span className="text-sm font-medium text-foreground">
                {label}{' '}
                <span className="text-red-500">{isRequired && '*'}</span>
              </span>
            </label>
            <select
              className="w-full h-10 px-3 rounded-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
              onChange={(event) =>
                onChange(
                  event.target.value === '' ? undefined : event.target.value
                )
              }
              value={value || ''}
              disabled={disabled}
            >
              <option value="">{placeholder}</option>
              {options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            {error && (
              <p className="text-xs text-red-500 mt-1.5">
                * {error?.message?.toString()}
              </p>
            )}
          </div>
        </div>
      )}
    />
  );
}
