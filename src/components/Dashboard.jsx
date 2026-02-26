import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  Area,
} from "recharts";

const fmt = (n) =>
  Number.isFinite(Number(n)) ? Number(n).toLocaleString() : "-";

const Card = ({ title, right, children }) => (
  <div className="card">
    <div className="cardTop">
      <div className="cardTitle">{title}</div>
      {right}
    </div>
    {children}
  </div>
);

export default function Dashboard({ data }) {
  return (
    <>
      <div className="hint">
        {data.pieces} units · ฿{data.sellPerPieceTHB}/pc sell · ฿
        {data.costPerPieceTHBRound}/pc cost
      </div>

      <section className="grid3">
        {/* Totals THB */}
        <Card title="Totals (THB ฿)">
          <div className="chartH220">
            <ResponsiveContainer>
              <BarChart data={data.totalsTHB}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                  tickFormatter={fmt}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmt(v)}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.totalsTHB.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Totals KIP */}
        <Card title="Totals (KIP ₭)">
          <div className="chartH220">
            <ResponsiveContainer>
              <BarChart data={data.totalsKIP}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                  tickFormatter={fmt}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmt(v)}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.totalsKIP.map((d, i) => (
                    <Cell key={i} fill={d.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Revenue split + Get profit % */}
        <Card
          title="Revenue Split (THB)"
          right={
            <div className="rightStat">
              <div className="rightStatLabel">Margin</div>
              <div className="rightStatValue">
                {data.marginPercent.toFixed(0)}%
              </div>
            </div>
          }
        >
          <div className="split">
            <div className="chartH220">
              <ResponsiveContainer>
                <PieChart>
                  <Pie
                    data={data.revenueSplitTHB}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={2}
                  >
                    {data.revenueSplitTHB.map((d, i) => (
                      <Cell key={i} fill={d.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: "var(--panel2)",
                      border: "1px solid var(--edge)",
                      color: "var(--text)",
                    }}
                    formatter={(v) => fmt(v)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="miniCard">
              <div className="miniTitle">Get profit %</div>
              <div className="chartH160">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data.profitPctSplit}
                      dataKey="value"
                      innerRadius={45}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      paddingAngle={1}
                    >
                      {data.profitPctSplit.map((d, i) => (
                        <Cell key={i} fill={d.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="centerBig">
                {data.getProfitPercent.toFixed(2)}%
              </div>
              <div className="miniSub">Profit ÷ Cost</div>
            </div>
          </div>
        </Card>
      </section>

      {/* KPI cards */}
      <section className="grid6 mt12">
        {[
          ["Cost/piece (THB, rounded)", `฿${fmt(data.costPerPieceTHBRound)}`],
          ["Cost/piece (KIP, rounded)", `₭${fmt(data.costPerPieceKIPRound)}`],

          ["Set price/piece (THB)", `฿${fmt(data.sellPerPieceTHB)}`],
          ["Set price/piece (KIP)", `₭${fmt(data.sellPerPieceKIP)}`],

          ["Profit/piece (THB)", `฿${fmt(data.profitPerPieceTHB)}`],
          ["Profit/piece (KIP)", `₭${fmt(data.profitPerPieceKIP)}`],
        ].map(([k, v]) => (
          <div key={k} className="kpi">
            <div className="kpiLabel">{k}</div>
            <div className="kpiValue">{v}</div>
          </div>
        ))}
      </section>

      {/* Cumulative */}
      <section className="mt12">
        <Card
          title="Cumulative P&L by Unit (THB ฿)"
          right={
            <div className="rightStat">
              <div className="rightStatLabel">Total Profit</div>
              <div className="rightStatValue">฿{fmt(data.profitTotalTHB)}</div>
              {data.breakEven && data.breakEven > 0 ? (
                <div className="rightStatHint">
                  B/E ≈ {data.breakEven.toFixed(0)} pcs
                </div>
              ) : null}
            </div>
          }
        >
          <div className="chartH320">
            <ResponsiveContainer>
              <LineChart data={data.cumulative}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis
                  dataKey="unit"
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                />
                <YAxis
                  tick={{ fill: "var(--subtext)", fontSize: 11 }}
                  tickFormatter={fmt}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmt(v)}
                />

                <Area
                  type="monotone"
                  dataKey="cumCost"
                  stroke="var(--coral)"
                  fill="var(--coral)"
                  fillOpacity={0.08}
                />
                <Area
                  type="monotone"
                  dataKey="cumRev"
                  stroke="var(--teal)"
                  fill="var(--teal)"
                  fillOpacity={0.06}
                />

                <Line
                  type="monotone"
                  dataKey="cumRev"
                  stroke="var(--teal)"
                  strokeWidth={2}
                  dot={false}
                  name="Cumulative Revenue"
                />
                <Line
                  type="monotone"
                  dataKey="cumCost"
                  stroke="var(--coral)"
                  strokeWidth={2}
                  dot={false}
                  name="Cumulative Cost"
                />
                <Line
                  type="monotone"
                  dataKey="cumProfit"
                  stroke="var(--amber)"
                  strokeWidth={2.5}
                  dot={false}
                  strokeDasharray="6 4"
                  name="Cumulative Profit"
                />
                <Legend />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </section>
    </>
  );
}
