// Input with prefix component - same structure as web
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface InputWithPrefixFormProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
  prefix: string;
}

export default function InputWithPrefixForm<T extends FieldValues>({
  control,
  name,
  label,
  isRequired = false,
  placeholder,
  type = 'text',
  disabled = false,
  prefix,
}: Readonly<InputWithPrefixFormProps<T>>) {
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
            <div className="flex">
              <span className="inline-flex items-center px-3 text-sm text-muted-foreground bg-muted border border-r-0 border-input rounded-l-md">
                {prefix}
              </span>
              <input
                className="flex-1 h-10 px-3 rounded-r-md border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring disabled:opacity-50 disabled:cursor-not-allowed"
                onChange={(event) =>
                  onChange(
                    event.target.value === '' ? undefined : event.target.value
                  )
                }
                value={value || ''}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
              />
            </div>

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
