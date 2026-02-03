import type { PersonalInfoFormValues } from '../pages/profile/types';

interface Props {
  label: string;
  name: keyof PersonalInfoFormValues;
  type: string;
  value?: string; 
  icon?: React.ReactNode;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
}

const FormField: React.FC<Props> = ({
  label,
  name,
  type,
  value,
  icon,
  onChange,
  readOnly = false,
}) => {
  return (
    <div className="relative">
      <label className="mb-1 block text-sm font-medium text-[#373737] font-montserrat">
        {label}
      </label>

      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}

        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={readOnly}
          className={`w-full rounded-lg border border-gray-200 px-10 py-2.5 text-sm font-poppins ${
            readOnly 
              ? 'bg-white cursor-default text-gray-500' 
              : 'bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }`}
        />
      </div>
    </div>
  );
};

export default FormField;