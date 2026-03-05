// Dashboard.jsx
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
import { useLanguage } from "../contexts/LanguageContext";

// ✅ Smart formatter: ถ้าเลขยาว/ใหญ่ -> ใส่ K/M/B, ถ้าไม่ยาว -> แสดงปกติ
const fmtSmart = (n) => {
  const num = Number(n);
  if (!Number.isFinite(num)) return "-";

  const abs = Math.abs(num);

  // ถ้าต่ำกว่า 10,000 แสดงแบบเดิม (คอมม่า)
  if (abs < 10000) return num.toLocaleString();

  // ถ้าใหญ่ แสดง K/M/B
  const units = [
    { v: 1e9, s: "B" },
    { v: 1e6, s: "M" },
    { v: 1e3, s: "K" },
  ];

  const u = units.find((x) => abs >= x.v) || units[2];
  const value = num / u.v;

  // ปัดให้สวย
  const rounded = Math.abs(value) >= 100 ? value.toFixed(0) : value.toFixed(1);

  // ตัด .0 ทิ้ง เช่น 12.0K -> 12K
  return `${Number(rounded).toString()}${u.s}`;
};

// (ถ้าต้องการเลขแบบเดิมสำหรับที่ไม่ใช่ chart)
const fmtNormal = (n) =>
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
  const { t } = useLanguage();
  if (!data) return null;

  return (
    <>
      <div className="hint">
        {data.pieces} {t("hintUnits")} · ฿{fmtNormal(data.sellPerPieceTHB)}/{t("pc")}{" "}
        {t("hintSell")} · ฿{fmtNormal(data.costPerPieceTHBRound)}/{t("pc")}{" "}
        {t("hintCost")}
      </div>

      <section className="grid3">
        {/* Totals THB */}
        <Card title={t("totalsTHB")}>
          <div className="chartH220">
            <ResponsiveContainer>
              <BarChart data={data.totalsTHB}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--subtext)", fontSize: 11 }} tickFormatter={fmtSmart} />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmtSmart(v)}
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
        <Card title={t("totalsKIP")}>
          <div className="chartH220">
            <ResponsiveContainer>
              <BarChart data={data.totalsKIP}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fill: "var(--subtext)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--subtext)", fontSize: 11 }} tickFormatter={fmtSmart} />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmtSmart(v)}
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
          title={t("revenueSplitTHB")}
          right={
            <div className="rightStat">
              <div className="rightStatLabel">{t("margin")}</div>
              <div className="rightStatValue">{Number(data.marginPercent || 0).toFixed(0)}%</div>
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
                    formatter={(v) => fmtSmart(v)}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="miniCard">
              <div className="miniTitle">{t("getProfitPct")}</div>
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
              <div className="centerBig">{Number(data.getProfitPercent || 0).toFixed(2)}%</div>
              <div className="miniSub">{t("profitDividedByCost")}</div>
            </div>
          </div>
        </Card>
      </section>

      {/* KPI cards */}
      <section className="grid6 mt12">
        {[
          [t("costPieceTHB"), `฿${fmtNormal(data.costPerPieceTHBRound)}`],
          [t("costPieceKIP"), `₭${fmtNormal(data.costPerPieceKIPRound)}`],
          [t("setPricePieceTHBLabel"), `฿${fmtNormal(data.sellPerPieceTHB)}`],
          [t("setPricePieceKIPLabel"), `₭${fmtNormal(data.sellPerPieceKIP)}`],
          [t("profitPieceTHB"), `฿${fmtNormal(data.profitPerPieceTHB)}`],
          [t("profitPieceKIP"), `₭${fmtNormal(data.profitPerPieceKIP)}`],
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
          title={t("cumulativePL")}
          right={
            <div className="rightStat">
              <div className="rightStatLabel">{t("totalProfit")}</div>
              <div className="rightStatValue">฿{fmtNormal(data.profitTotalTHB)}</div>
              {data.breakEven && data.breakEven > 0 ? (
                <div className="rightStatHint">
                  {t("be")} {Number(data.breakEven).toFixed(0)} {t("pcs")}
                </div>
              ) : null}
            </div>
          }
        >
          <div className="chartH320">
            <ResponsiveContainer>
              <LineChart data={data.cumulative}>
                <CartesianGrid stroke="var(--edge)" strokeDasharray="3 3" />
                <XAxis dataKey="unit" tick={{ fill: "var(--subtext)", fontSize: 11 }} />
                <YAxis tick={{ fill: "var(--subtext)", fontSize: 11 }} tickFormatter={fmtSmart} />
                <Tooltip
                  contentStyle={{
                    background: "var(--panel2)",
                    border: "1px solid var(--edge)",
                    color: "var(--text)",
                  }}
                  formatter={(v) => fmtSmart(v)}
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
                  name={t("cumRevenue")}
                />
                <Line
                  type="monotone"
                  dataKey="cumCost"
                  stroke="var(--coral)"
                  strokeWidth={2}
                  dot={false}
                  name={t("cumCost")}
                />
                <Line
                  type="monotone"
                  dataKey="cumProfit"
                  stroke="var(--amber)"
                  strokeWidth={2.5}
                  dot={false}
                  strokeDasharray="6 4"
                  name={t("cumProfit")}
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