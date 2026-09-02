import { useMemo, useState } from 'react';

import { BRIDGE_PERIODS, EBITDA_BRIDGE, PEER_COMPANIES } from '@/data/dummyData';

const POSITIVE_COLOR = '#2E7D32';
const NEGATIVE_COLOR = '#C62828';

/**
 * Walks the steps left-to-right, tracking a running total. `total` steps
 * always draw from 0; `delta` steps float between the running total before
 * and after the step is applied — a standard waterfall/bridge layout,
 * oriented as vertical columns.
 */
function useBridgeBars() {
  return useMemo(() => {
    let running = 0;
    return EBITDA_BRIDGE.steps.map((step) => {
      let bottom: number;
      let height: number;
      let color = EBITDA_BRIDGE.barColor;

      if (step.type === 'total') {
        running = step.value;
        bottom = 0;
        height = step.value;
      } else {
        const next = running + step.value;
        bottom = Math.min(running, next);
        height = Math.abs(step.value);
        color = step.value >= 0 ? POSITIVE_COLOR : NEGATIVE_COLOR;
        running = next;
      }

      return {
        ...step,
        bottomPct: (bottom / EBITDA_BRIDGE.scaleMax) * 100,
        heightPct: (height / EBITDA_BRIDGE.scaleMax) * 100,
        color,
      };
    });
  }, []);
}

function SelectBox({
  value,
  onChange,
  options,
  disabled,
}: {
  value: string;
  onChange?: (v: string) => void;
  options: string[];
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      disabled={disabled}
      onChange={(e) => onChange?.(e.target.value)}
      className="w-full rounded-md border border-[#E0E0E0] bg-white px-2 py-1.5 text-[12px] text-gray-800 disabled:bg-[#F5F5F3] disabled:text-gray-400"
    >
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

export function BridgeChart() {
  const [peer, setPeer] = useState(EBITDA_BRIDGE.defaultPeer);
  const [period, setPeriod] = useState(EBITDA_BRIDGE.defaultPeriod);
  const bars = useBridgeBars();
  const first = bars[0];
  const last = bars[bars.length - 1];

  return (
    <section className="rounded-lg border border-[#E5E5E0] bg-white p-6 shadow-sm">
      <h3 className="text-[15px] font-semibold text-gray-900">EBITDA Bridge</h3>

      <div className="mt-5 flex items-stretch gap-2">
        {bars.map((bar) => {
          return (
            <div key={bar.label} className="flex flex-1 flex-col">
              <div className="relative h-80 rounded bg-[#F0F0EE]">
                <div
                  className="absolute inset-x-0 flex items-center justify-center whitespace-nowrap rounded px-1 text-[13px] font-semibold text-white"
                  style={{
                    bottom: `${bar.bottomPct}%`,
                    height: `${bar.heightPct}%`,
                    minHeight: '28px',
                    backgroundColor: bar.color,
                  }}
                >
                  {bar.display}
                </div>
              </div>

              <div className="mt-2 flex flex-col gap-1.5">
                {bar === first && (
                  <>
                    <SelectBox value={peer} onChange={setPeer} options={PEER_COMPANIES} />
                    <SelectBox value={period} onChange={setPeriod} options={BRIDGE_PERIODS} />
                  </>
                )}
                {bar === last && (
                  <>
                    <SelectBox value="DRL EBITDA" options={['DRL EBITDA']} disabled />
                    <SelectBox value={period} options={[period]} disabled />
                  </>
                )}
                {bar !== first && bar !== last && (
                  <div className="px-1 text-center text-[13px] text-gray-700">{bar.label}</div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[12px] text-gray-500">{EBITDA_BRIDGE.note}</p>
    </section>
  );
}
