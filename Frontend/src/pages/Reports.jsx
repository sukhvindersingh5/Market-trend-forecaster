// src/pages/Reports.jsx
import React, { useState, useEffect } from "react";
import {
  FileText,
  TrendingUp,
  AlertTriangle,
  MessageSquare,
  BarChart3,
  Layout,
  Download,
  Eye,
  Calendar,
  Layers,
  ChevronDown,
  X,
  Plus
} from "lucide-react";
import "../styles/reports.css";
import { generateReport } from "../services/reportsService";
import { getDashboardOverview } from "../services/dashboardService";

const DatePresetCard = ({ label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all duration-300 ${active
        ? "bg-blue-500/20 text-blue-400 border border-blue-500/50"
        : "bg-white/5 text-slate-500 border border-white/5 hover:bg-white/10"
      }`}
  >
    {label}
  </button>
);

const Reports = () => {
  const [brand, setBrand] = useState("all");
  const [channel, setChannel] = useState("all");
  const [dateRange, setDateRange] = useState("30d");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [previewReport, setPreviewReport] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    // Set default dates for 30d
    handlePresetClick("30d");
    loadPreviewData();
  }, []);

  const loadPreviewData = async () => {
    try {
      const data = await getDashboardOverview();
      setDashboardData(data);
    } catch (err) {
      console.error("Failed to load preview data", err);
    }
  };

  const handlePresetClick = (preset) => {
    setDateRange(preset);
    if (preset === "custom") return;

    const end = new Date();
    const start = new Date();
    const days = preset === "7d" ? 7 : preset === "30d" ? 30 : 90;
    start.setDate(end.getDate() - days);

    setFromDate(start.toISOString().split("T")[0]);
    setToDate(end.toISOString().split("T")[0]);
  };

  const handleDownload = async (type, format) => {
    try {
      setError("");
      setLoading(true);

      await generateReport({
        type,
        format,
        brand,
        channel,
        fromDate,
        toDate,
      });

    } catch (err) {
      console.error(err);
      setError("Failed to download report. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const openPreview = (report) => {
    setPreviewReport(report);
  };

  const closePreview = () => {
    setPreviewReport(null);
  };

  const reports = [
    {
      id: "summary",
      title: "Campaign Summary",
      description: "Comprehensive overview of sentiment, volume and platform KPIs.",
      icon: <FileText className="text-blue-400" size={20} />,
      elements: ["Charts", "Trends", "Insights"]
    },
    {
      id: "trend",
      title: "Trend & Forecast",
      description: "Historical sentiment analysis with predictive growth modeling.",
      icon: <TrendingUp className="text-emerald-400" size={20} />,
      elements: ["Charts", "Trends"]
    },
    {
      id: "alerts",
      title: "Alerts & Risk",
      description: "Deep dive into critical sentiment drops and brand reputation risks.",
      icon: <AlertTriangle className="text-amber-400" size={20} />,
      elements: ["Insights", "KPIs"]
    },
    {
      id: "topics",
      title: "Topics & Themes",
      description: "Granular breakdown of top positive and negative conversation themes.",
      icon: <MessageSquare className="text-purple-400" size={20} />,
      elements: ["Charts", "Insights"]
    }
  ];

  return (
    <div className="reports-container p-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-2">Advanced Reports</h1>
          <p className="text-slate-400 font-medium">Export high-fidelity intelligence as PDF or Excel for internal stakeholders.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-xl">
          <Layers size={16} className="text-blue-400" />
          <span className="text-sm font-bold text-blue-400">Enterprise Mode</span>
        </div>
      </div>

      {/* ADVANCED FILTER BAR */}
      <div className="glass-card mb-8 p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Plus size={12} /> Target Brand
            </label>
            <div className="relative group">
              <select
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white appearance-none focus:border-blue-500/50 transition-all outline-none"
              >
                <option value="all">All Products</option>
                <option value="echo-dot">Echo Dot</option>
                <option value="nest-mini">Nest Mini</option>
                <option value="homepod-mini">HomePod Mini</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-blue-400 transition-colors" />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Layers size={12} /> Distribution Channel
            </label>
            <div className="relative group">
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2.5 text-sm font-bold text-white appearance-none focus:border-blue-500/50 transition-all outline-none"
              >
                <option value="all">All Channels</option>
                <option value="social">Social Media</option>
                <option value="reviews">Product Reviews</option>
                <option value="news">News & PR</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none group-hover:text-blue-400 transition-colors" />
            </div>
          </div>

          <div className="md:col-span-2 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 flex items-center gap-2">
                <Calendar size={12} /> Analysis Timeframe
              </label>
              <div className="flex gap-1">
                <DatePresetCard label="7D" active={dateRange === "7d"} onClick={() => handlePresetClick("7d")} />
                <DatePresetCard label="30D" active={dateRange === "30d"} onClick={() => handlePresetClick("30d")} />
                <DatePresetCard label="90D" active={dateRange === "90d"} onClick={() => handlePresetClick("90d")} />
                <DatePresetCard label="Custom" active={dateRange === "custom"} onClick={() => handlePresetClick("custom")} />
              </div>
            </div>

            <div className={`grid grid-cols-2 gap-3 transition-all duration-300 ${dateRange === "custom" ? "opacity-100 translate-y-0" : "opacity-30 pointer-events-none"}`}>
              <div className="relative">
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white outline-none focus:border-blue-500/50 appearance-none"
                />
              </div>
              <div className="relative">
                <input
                  type="date"
                  value={toDate}
                  onChange={(e) => setToDate(e.target.value)}
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white outline-none focus:border-blue-500/50 appearance-none transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-8 animate-in slide-in-from-top-2">
          <AlertTriangle size={18} />
          <p className="text-sm font-bold">{error}</p>
        </div>
      )}

      {/* REPORT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="glass-card p-6 flex flex-col justify-between hover:border-blue-500/30 transition-all duration-500 group">
            <div className="flex gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all duration-500">
                {report.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-xl font-black text-white mb-1">{report.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed">{report.description}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mb-8">
              {report.elements.map(el => (
                <div key={el} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                  {el === "Charts" && <BarChart3 size={10} />}
                  {el === "Trends" && <TrendingUp size={10} />}
                  {el === "Insights" && <Layout size={10} />}
                  {el === "KPIs" && <Plus size={10} />}
                  {el}
                </div>
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => openPreview(report)}
                className="flex-[1.5] flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 text-xs font-black text-white uppercase tracking-widest transition-all"
              >
                <Eye size={14} /> Preview
              </button>
              <button
                onClick={() => handleDownload(report.id, "pdf")}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 px-4 rounded-xl py-3 text-xs font-black text-white hover:bg-blue-400 disabled:opacity-50 transition-all shadow-lg shadow-blue-500/20"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={14} />} PDF
              </button>
              <button
                onClick={() => handleDownload(report.id, "xlsx")}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 px-4 rounded-xl py-3 text-xs font-black text-white hover:bg-emerald-400 disabled:opacity-50 transition-all shadow-lg shadow-emerald-500/20"
              >
                {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Download size={14} />} XLXS
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* REPORT PREVIEW MODAL */}
      {previewReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300" onClick={closePreview} />

          <div className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                  {previewReport.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-white">{previewReport.title}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none">Report Preview Overlay</p>
                </div>
              </div>
              <button onClick={closePreview} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 text-slate-400 transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="glass-card p-4 rounded-xl border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Overall Sentiment</p>
                  <p className="text-2xl font-black text-accent">{dashboardData?.summary?.overallSentiment * 100}%</p>
                  <div className="mt-2 h-1 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-accent" style={{ width: `${dashboardData?.summary?.overallSentiment * 100}%` }} />
                  </div>
                </div>
                <div className="glass-card p-4 rounded-xl border-white/10">
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Mentions Volume</p>
                  <p className="text-2xl font-black text-white">{dashboardData?.summary?.mentions?.toLocaleString()}</p>
                  <p className="text-[10px] font-bold text-accent">↑ 12.4% vs prev</p>
                </div>
              </div>

              <div className="mb-8">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <BarChart3 size={14} className="text-blue-400" /> Visualization Snapshot
                </h5>
                <div className="h-48 w-full bg-white/5 rounded-xl border border-white/5 flex flex-col items-center justify-center text-slate-600 gap-3">
                  <BarChart3 size={32} />
                  <p className="text-xs font-bold uppercase tracking-widest">Generating Trend View...</p>
                </div>
              </div>

              <div>
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Layout size={14} className="text-blue-400" /> Executive Insights
                </h5>
                <div className="space-y-3">
                  <div className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-1" />
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Customer sentiment for <span className="text-white font-bold">{brand === 'all' ? 'All Brands' : brand}</span> shows a strong upward trend in <span className="text-white">"Sound Quality"</span> discussions.</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1" />
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Platform volume on <span className="text-white font-bold">{channel === 'all' ? 'All Channels' : channel}</span> has increased by 8% compared to the previous timeframe.</p>
                  </div>
                  <div className="flex gap-3 p-3 bg-white/5 border border-white/5 rounded-xl">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1" />
                    <p className="text-sm text-slate-400 leading-relaxed font-medium">Risk of negative sentiment identified in the <span className="text-white font-bold">"Connectivity"</span> topic segment for the Echo Dot.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-slate-950/50 flex gap-3">
              <button
                onClick={() => handleDownload(previewReport.id, "pdf")}
                className="flex-1 bg-blue-500 hover:bg-blue-400 text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Confirm PDF Export
              </button>
              <button
                onClick={closePreview}
                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-all"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reports;
