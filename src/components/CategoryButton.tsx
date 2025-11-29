import type {Category} from "../types/category";

type Props = {
  label: string;
  value: Category;
  active: boolean;
  onClick: (c: Category) => void;
};

export default function CategoryButton({label, value, active, onClick}: Props) {
  return (
    <button
      className={`rounded-full px-3 py-1 ${
        active
          ? "bg-brand-600 text-white hover:bg-brand-600"
          : "bg-white border border-brand-200 hover:bg-brand-50"
      }`}
      aria-pressed={active}
      onClick={() => onClick(value)}
      type="button"
    >
      {label}
    </button>
  );
}
