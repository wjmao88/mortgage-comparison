import { ParentComponent, VoidComponent } from "solid-js";
import { CustomPartial } from "solid-js/store/types/store.js";
import { MortgageBase } from "~/lib/mortgage";
import NumberField from "../fields/NumberField";

const EditRow: ParentComponent = ({ children }) => (
  <div class="p-1 mb-2 border border-neutral-300">{children}</div>
);

const MortgageEdit: VoidComponent<{
  mortgage: MortgageBase;
  onChange: (m: CustomPartial<MortgageBase>) => void;
}> = ({ mortgage, onChange }) => {
  return (
    <div>
      <EditRow>
        <NumberField
          label="Principal"
          value={mortgage.principal}
          onChange={(v) => onChange({ principal: v })}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Interest (Yearly)"
          value={mortgage.yearlyInterest}
          onChange={(v) => onChange({ yearlyInterest: v })}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Periods (Months)"
          value={mortgage.months}
          onChange={(v) => onChange({ months: v })}
        />
      </EditRow>
      <EditRow>
        <NumberField
          label="Extra Payment (Monthly)"
          value={mortgage.extraMonthlyPayment}
          onChange={(v) => onChange({ extraMonthlyPayment: v })}
        />
      </EditRow>
    </div>
  );
};

export default MortgageEdit;
