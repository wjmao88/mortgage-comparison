import { useSearchParams } from "@solidjs/router";
import { Accessor, createEffect, createMemo, For } from "solid-js";
import { createStore } from "solid-js/store";
import { CustomPartial } from "solid-js/store/types/store.js";
import MortgageTable from "~/components/table/MortgageTable";
import {
  calcMonthlyPayment,
  calcTable,
  Mortgage,
  MortgageBase,
} from "~/lib/mortgage";
import { encodeData, decodeData } from "~/lib/paramCodec";

export const route = {};

const BASE_MORTGAGE_DEFAULT: MortgageBase = {
  principal: 750000,
  yearlyInterest: 0.0675,
  months: 360,
  extraMonthlyPayment: 0,
  investmentYearlyInterest: 0.07,
};

export default function App() {
  const [searchParams, setSearchParams] = useSearchParams<{ data: string }>();

  const [mortgageBases, setMortgageBases] = createStore<MortgageBase[]>(
    decodeData<MortgageBase[]>(searchParams.data) || [BASE_MORTGAGE_DEFAULT]
  );

  createEffect(() => {
    setSearchParams({ data: encodeData(mortgageBases) });
  });

  const addNew = () =>
    setMortgageBases(mortgageBases.length, { ...mortgageBases[0] });

  const remove = (index: Accessor<number>) => () => {
    setMortgageBases(mortgageBases.toSpliced(index(), 1));
  };

  const update =
    (index: Accessor<number>) => (update: CustomPartial<MortgageBase>) => {
      setMortgageBases(index(), update);
    };

  const highestPrincipal = createMemo(() => {
    return Math.max(...mortgageBases.map((m) => m.principal));
  });

  const monthlies = createMemo(() =>
    mortgageBases.map((m) => calcMonthlyPayment(m) + m.extraMonthlyPayment)
  );

  const highestMonthly = createMemo(() => {
    return Math.max(...monthlies());
  });

  const highestPeriod = createMemo(() =>
    Math.max(...mortgageBases.map((m) => m.months))
  );

  const mortgages = createMemo(() => {
    return mortgageBases.map<Mortgage>((m, index) => {
      const monthlyPayment = monthlies()[index];
      return {
        ...m,
        monthlyPayment,
        monthlyInvested: monthlyPayment + m.extraMonthlyPayment,
        initialInvested: highestPrincipal() - m.principal,
      };
    });
  });

  const tables = createMemo(() => {
    return mortgages().map((m) =>
      calcTable(m, highestPrincipal(), highestMonthly(), highestPeriod())
    );
  });

  return (
    <section>
      <header class="header">
        <h1>Mortgage Compare</h1>
      </header>

      <div class="flex gap-4">
        <For each={mortgages()}>
          {(mortgage, index) => (
            <div class="flex flex-col align-center">
              {index() === 0 ? (
                <button onClick={addNew}>Add</button>
              ) : (
                <button onClick={remove(index)}>Remove {index()}</button>
              )}
              <MortgageTable
                mortgage={mortgage}
                onChange={update(index)}
                highestPrincipal={highestPrincipal}
                highestMonthly={highestMonthly}
                table={() => tables()[index()]}
                baseTable={() => tables()[0]}
              />
            </div>
          )}
        </For>
      </div>
    </section>
  );
}
