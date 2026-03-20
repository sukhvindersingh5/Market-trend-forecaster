// src/pages/Forecast.jsx
import React, { useState, useEffect, useRef } from "react";
import "../styles/forecast.css";
import {
    ComposedChart, Line, Area, XAxis, YAxis, CartesianGrid,
    Tooltip, ReferenceLine, ResponsiveContainer, Legend
} from "recharts";
import {
    TrendingUp, TrendingDown, Minus, AlertTriangle,
    Zap, ChevronDown, ChevronUp, RefreshCw, Info
} from "lucide-react";

const API = "http://localhost:8000/api/forecast";

const BRAND_COLORS = {
    "echo-dot": { solid: "#3b82f6", light: "rgba(59,130,246,0.15)" },
    "nest-mini": { solid: "#10b981", light: "rgba(16,185,129,0.15)" },
    "homepod-mini": { solid: "#8b5cf6", light: "rgba(139,92,246,0.15)" },
};

// ── Helper: format sentiment as percentage ─────────────────────────
const fmtPct = (v) => `${(v * 100).toFixed(1)}%`;

// ── War Room Card ──────────────────────────────────────────────────
const WarCard = ({ brand, index }) => {
    const [barWidth, setBarWidth] = useState(0);
    const dir = brand.direction.toLowerCase(); // gaining | holding | losing
    const color = BRAND_COLORS[brand.id]?.solid || "#6366f1";
    const barValue = Math.abs(brand.current_sentiment) * 100;

    useEffect(() => {
        const t = setTimeout(() => setBarWidth(Math.min(barValue, 95)), 300 + index * 150);
        return () => clearTimeout(t);
    }, [barValue, index]);

    const dirConfig = {
        gaining: { label: "↗ GAINING", textColor: "#10b981", icon: <TrendingUp size={16} /> },
        losing: { label: "↘ LOSING", textColor: "#ef4444", icon: <TrendingDown size={16} /> },
        holding: { label: "→ HOLDING", textColor: "#f59e0b", icon: <Minus size={16} /> },
    }[dir] || { label: "→ HOLDING", textColor: "#f59e0b", icon: <Minus size={16} /> };

    return (
        <div className={`war-card ${dir}`}>
            <div className={`war-pulse ${dir}`} />

            <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{brand.name}</div>

            <div className="flex items-center justify-between mb-2">
                <span className="text-2xl font-black text-white">{fmtPct(brand.current_sentiment)}</span>
                <span style={{ color: dirConfig.textColor }} className="text-xs font-bold flex items-center gap-1">
                    {dirConfig.icon}{dirConfig.label}
                </span>
            </div>

            <div className="text-xs text-slate-400 mb-3">
                {fmtPct(brand.current_sentiment)} → <span style={{ color: dirConfig.textColor }}>{fmtPct(brand.predicted_sentiment)}</span>
                <span className="ml-2 opacity-60">({brand.change_pct > 0 ? "+" : ""}{brand.change_pct}%)</span>
            </div>

            <div className="war-bar-track">
                <div
                    className="war-bar-fill"
                    style={{ width: `${barWidth}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
                />
            </div>

            <div className="mt-3 flex justify-between items-center">
                <span style={{
                    background: brand.risk.color + "22",
                    color: brand.risk.color,
                    border: `1px solid ${brand.risk.color}44`,
                    borderRadius: "999px", padding: "2px 10px", fontSize: "0.7rem", fontWeight: 700
                }}>
                    {brand.risk.emoji} {brand.risk.label}
                </span>
                <span className="text-xs text-slate-500">{brand.confidence}% confidence</span>
            </div>
        </div>
    );
};

// ── SVG Gauge ─────────────────────────────────────────────────────
const RiskGauge = ({ brand }) => {
    const color = brand.risk.color;
    const size = 110;
    const r = 38;
    const cx = size / 2;
    const cy = size / 2;
    const circumference = 2 * Math.PI * r;
    const arcLength = circumference * 0.65;
    const fillRatio = brand.confidence / 100;
    const filled = fillRatio * arcLength;

    return (
        <div className="gauge-container">
            <svg width={size} height={size} className="gauge-svg" style={{ transform: "rotate(126deg)" }}>
                <circle cx={cx} cy={cy} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={10}
                    strokeDasharray={`${arcLength} ${circumference}`} strokeLinecap="round" />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={10}
                    strokeDasharray={`${filled} ${circumference}`} strokeLinecap="round"
                    style={{ transition: "stroke-dasharray 1.5s cubic-bezier(0.4,0,0.2,1)" }} />
            </svg>
            <div className="text-center -mt-2">
                <div className="text-lg font-black text-white">{brand.confidence}%</div>
                <div className="text-xs font-bold" style={{ color }}>{brand.risk.emoji} {brand.risk.label}</div>
                <div className="text-xs text-slate-500 mt-1">{brand.name}</div>
            </div>
        </div>
    );
};

// ── Forecast Chart with animated draw ─────────────────────────────
const ForecastChart = ({ data, brandColors, todayDate }) => {
    if (!data || data.length === 0) return null;

    const CustomTooltip = ({ active, payload, label }) => {
        if (!active || !payload?.length) return null;
        return (
            <div className="bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-xs shadow-xl">
                <div className="text-slate-400 mb-1">{label}</div>
                {payload.map((p, i) => p.value != null && (
                    <div key={i} className="flex items-center gap-2" style={{ color: p.color }}>
                        <span className="font-bold">{p.name}:</span>
                        <span>{(p.value * 100).toFixed(1)}%</span>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.04)" strokeDasharray="3 3" />
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 10 }}
                    tickFormatter={(d) => d?.slice(5)} interval={Math.floor(data.length / 6)} />
                <YAxis tick={{ fill: "#64748b", fontSize: 10 }}
                    tickFormatter={(v) => `${(v * 100).toFixed(0)}%`} domain={["auto", "auto"]} />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x={todayDate} stroke="#3b82f6" strokeDasharray="4 4"
                    label={{ value: "Today", fill: "#3b82f6", fontSize: 10, position: "top" }} />

                {brandColors.map(({ id, color }) => (
                    <React.Fragment key={id}>
                        <Area dataKey={`${id}_upper`} fill={color + "15"} stroke="none" stackId={`band_${id}`} />
                        <Area dataKey={`${id}_lower`} fill="transparent" stroke="none" stackId={`band_${id}`} />
                        <Line dataKey={`${id}_actual`} stroke={color} strokeWidth={2} dot={false} name={`${id} Actual`} connectNulls={false} />
                        <Line dataKey={`${id}_forecast`} stroke={color} strokeWidth={2} strokeDasharray="6 3"
                            dot={false} name={`${id} Forecast`} connectNulls={false} />
                    </React.Fragment>
                ))}
            </ComposedChart>
        </ResponsiveContainer>
    );
};

// ── What Could Change Factor Card ──────────────────────────────────
const FactorCard = ({ factor, type }) => {
    const [open, setOpen] = useState(false);
    const [barWidth, setBarWidth] = useState(0);

    useEffect(() => {
        const t = setTimeout(() => setBarWidth(factor.probability), 500);
        return () => clearTimeout(t);
    }, [factor.probability]);

    const isPositive = type === "driver" ? factor.impact === "positive" : factor.impact_pct > 0;
    const color = isPositive ? "#10b981" : type === "driver" && factor.impact === "neutral" ? "#f59e0b" : "#ef4444";

    return (
        <div className="factor-card bg-slate-900/40">
            <button
                className="w-full flex items-center justify-between p-4 text-left hover:bg-white/5 transition-colors"
                onClick={() => setOpen(!open)}
            >
                <div className="flex items-center gap-3">
                    <span className="text-lg">{isPositive ? "📈" : type === "driver" && factor.impact === "neutral" ? "📰" : "⚠️"}</span>
                    <div>
                        <div className="text-sm font-semibold text-white">{factor.factor}</div>
                        <div className="text-xs text-slate-500">{factor.probability}% probability</div>
                    </div>
                </div>
                <div className="flex items-center gap-3">
                    <span className="text-sm font-bold" style={{ color }}>
                        {type === "risk" && factor.impact_pct > 0 ? "+" : ""}
                        {type === "risk" ? `${factor.impact_pct}%` : factor.impact === "positive" ? "Positive" : "Neutral"}
                    </span>
                    {open ? <ChevronUp size={14} className="text-slate-500" /> : <ChevronDown size={14} className="text-slate-500" />}
                </div>
            </button>

            {open && (
                <div className="px-4 pb-4 text-sm text-slate-400 border-t border-white/5 pt-3">
                    {factor.detail}
                    <div className="factor-bar-track mt-3">
                        <div className="factor-bar-fill" style={{ width: `${barWidth}%`, background: color }} />
                    </div>
                    <div className="text-xs text-slate-500 mt-1">Probability: {factor.probability}%</div>
                </div>
            )}
        </div>
    );
};

// ── Main Forecast Page ─────────────────────────────────────────────
const Forecast = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [horizon, setHorizon] = useState(30);
    const [chartData, setChartData] = useState([]);
    const todayRef = useRef("2026-03-16");

    const fetchForecast = async (h) => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API}?horizon=${h}`);
            if (!res.ok) throw new Error("Failed to fetch forecast");
            const json = await res.json();
            setData(json);
            todayRef.current = json.as_of;
            buildChartData(json.brands);
        } catch (e) {
            setError(e.message);
        } finally {
            setLoading(false);
        }
    };

    const buildChartData = (brands) => {
        const allDates = {};
        brands.forEach((b) => {
            [...(b.historical || []), ...(b.forecast || [])].forEach((row) => {
                if (!allDates[row.date]) allDates[row.date] = { date: row.date };
                if (row.actual != null) allDates[row.date][`${b.id}_actual`] = row.actual;
                if (row.predicted != null) allDates[row.date][`${b.id}_forecast`] = row.predicted;
                if (row.upper != null) allDates[row.date][`${b.id}_upper`] = row.upper;
                if (row.lower != null) allDates[row.date][`${b.id}_lower`] = row.lower;
            });
        });
        setChartData(Object.values(allDates).sort((a, b) => a.date.localeCompare(b.date)));
    };

    useEffect(() => { fetchForecast(horizon); }, []);

    const handleHorizonChange = (val) => {
        setHorizon(val);
        fetchForecast(val);
    };

    if (loading) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
                <div className="w-14 h-14 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-slate-400 font-medium">Generating forecast model&hellip;</p>
            </div>
        </div>
    );

    if (error) return (
        <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center text-red-400">
                <AlertTriangle className="mx-auto mb-3" size={40} />
                <p className="font-bold">Forecast unavailable</p>
                <p className="text-sm text-slate-500 mt-1">{error}</p>
                <button onClick={() => fetchForecast(horizon)}
                    className="mt-4 px-4 py-2 rounded-lg bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-bold hover:bg-blue-500/30 transition-colors flex items-center gap-2 mx-auto">
                    <RefreshCw size={14} /> Retry
                </button>
            </div>
        </div>
    );

    const brandColorList = (data?.brands || []).map((b) => ({
        id: b.id,
        color: BRAND_COLORS[b.id]?.solid || "#6366f1",
    }));

    const horizonLabels = [7, 14, 30, 60, 90];

    return (
        <div className="forecast-page space-y-8 animate-in fade-in duration-700">

            {/* ── Section 1: WAR ROOM ────────────────────────────────────── */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                            <Zap size={18} className="text-yellow-400" /> Sentiment War Room
                        </h2>
                        <p className="text-xs text-slate-500 mt-0.5">Predicted brand battle over next {horizon} days</p>
                    </div>
                    <button onClick={() => fetchForecast(horizon)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/5">
                        <RefreshCw size={14} />
                    </button>
                </div>

                <div className="war-room-grid">
                    {data.brands.map((brand, i) => (
                        <React.Fragment key={brand.id}>
                            <WarCard brand={brand} index={i} />
                            {i < data.brands.length - 1 && (
                                <div className="vs-badge">VS</div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* ── Section 2: RISK METER ──────────────────────────────────── */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-6">
                    <AlertTriangle size={18} className="text-amber-400" />
                    <h2 className="text-lg font-black text-white tracking-tight">Forecast Risk Meter</h2>
                    <div className="ml-auto flex gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />Safe</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />Volatile</span>
                        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-500 inline-block" />Warning</span>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                    {data.brands.map((brand) => (
                        <div key={brand.id} className="bg-slate-900/40 border border-white/5 rounded-2xl p-5 flex flex-col items-center gap-2">
                            <RiskGauge brand={brand} />
                            <div className="text-xs text-slate-400 text-center mt-1">
                                {brand.direction === "GAINING" ? "Confident upward trend" :
                                    brand.direction === "LOSING" ? "Declining trajectory" : "Stable, low momentum"}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ── Section 3: TIME MACHINE ────────────────────────────────── */}
            <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">⏱️</span>
                    <h2 className="text-lg font-black text-white tracking-tight">Time Machine</h2>
                    <span className="ml-auto text-sm font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full px-3 py-0.5">
                        +{horizon} day forecast
                    </span>
                </div>
                <p className="text-xs text-slate-500 mb-5">Drag the slider to move the forecast horizon</p>

                <div className="flex items-center gap-4 mb-4 px-2">
                    {horizonLabels.map((h) => (
                        <span key={h} className={`text-xs font-bold cursor-pointer transition-colors ${horizon === h ? "text-blue-400" : "text-slate-600 hover:text-slate-400"}`}
                            onClick={() => handleHorizonChange(h)}>+{h}d</span>
                    ))}
                </div>

                <input type="range" min="7" max="90" step="1" value={horizon}
                    className="time-slider mb-6"
                    onChange={(e) => handleHorizonChange(Number(e.target.value))} />

                <ForecastChart data={chartData} brandColors={brandColorList} todayDate={todayRef.current} />

                <div className="flex gap-4 mt-4 justify-center">
                    {data.brands.map((b) => (
                        <span key={b.id} className="text-xs text-slate-400 flex items-center gap-2">
                            <span className="w-4 h-[2px] inline-block rounded" style={{ background: BRAND_COLORS[b.id]?.solid }} />
                            {b.name}
                        </span>
                    ))}
                    <span className="text-xs text-slate-500 flex items-center gap-2">
                        <span className="w-4 inline-block border-t border-dashed border-slate-500" />
                        Forecast
                    </span>
                </div>
            </div>

            {/* ── Section 4: AI ANALYST SUMMARY ─────────────────────────── */}
            <div className="glass-card p-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-transparent pointer-events-none" />
                <div className="relative">
                    <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm">🤖</div>
                        <div>
                            <h2 className="text-sm font-black text-white">AI Analyst Report</h2>
                            <p className="text-xs text-slate-500">Generated by Market Intelligence Model</p>
                        </div>
                        <span className="ml-auto text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-3 py-0.5 font-bold">● LIVE</span>
                    </div>
                    <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-5">
                        <p className="text-sm text-slate-300 leading-relaxed font-medium italic">"{data.ai_summary}"</p>
                    </div>
                    <div className="flex gap-6 mt-4">
                        {data.brands.map((b) => (
                            <div key={b.id} className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full" style={{ background: BRAND_COLORS[b.id]?.solid }} />
                                <span className="text-xs text-slate-400">
                                    {b.name} <span className="font-bold" style={{ color: b.change_pct >= 0 ? "#10b981" : "#ef4444" }}>
                                        {b.change_pct > 0 ? "+" : ""}{b.change_pct}%
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* ── Sections 5 & 6 side-by-side ──────────────────────────────── */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Section 5: Key Drivers */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <TrendingUp size={16} className="text-emerald-400" />
                        <h2 className="text-base font-black text-white tracking-tight">Key Drivers</h2>
                        <span className="text-xs text-slate-500 ml-1">— what's shaping the forecast</span>
                    </div>
                    <div className="space-y-3">
                        {(data.drivers || []).map((d, i) => (
                            <FactorCard key={i} factor={d} type="driver" />
                        ))}
                    </div>
                </div>

                {/* Section 6: What Could Change This */}
                <div className="glass-card p-6">
                    <div className="flex items-center gap-2 mb-5">
                        <Info size={16} className="text-blue-400" />
                        <h2 className="text-base font-black text-white tracking-tight">What Could Change This?</h2>
                    </div>
                    <div className="space-y-3">
                        {(data.risk_factors || []).map((f, i) => (
                            <FactorCard key={i} factor={f} type="risk" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Forecast;
