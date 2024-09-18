import { Component } from "solid-js";
import { Mortgage } from "~/lib/mortgage";

const NumberField: Component<{
  label: string;
  value: number;
  onChange: (v: number) => void;
}> = ({ label, value, onChange }) => {
  return (
    <label class="flex flex-col">
      <span class="text-xs">{label}</span>
      <input
        class="rounded border-1 border-neutral-300 border-solid p-1"
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.valueAsNumber)}
      />
    </label>
  );
};

export default NumberField;
