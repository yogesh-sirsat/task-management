export interface InputProps {
  name: string;
  placeholder: string;
  type: string;
}

export default function Input({ name, placeholder, type }: InputProps) {
  return (
    <input
      required
      name={name}
      placeholder={placeholder}
      type={type}
      className="w-full bg-[#EBEBEB] px-4 py-3 rounded-lg focus:outline-[#999999] focus:outline-none"
    />
  );
}
