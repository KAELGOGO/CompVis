import React, { useState, useEffect } from "react";
import {
  AlertTriangle,
  Car,
  Navigation,
  ShieldCheck,
  Sun,
  Moon,
} from "lucide-react";

const LaneGuardDashboard = () => {
  const [offset, setOffset] = useState(0.0);
  const [curvature, setCurvature] = useState(850);
  const [isWarning, setIsWarning] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  // SIMULASI DATA
  useEffect(() => {
    const interval = setInterval(() => {
      const newOffset = (Math.random() * 1.6 - 0.8).toFixed(2);
      setOffset(parseFloat(newOffset));
      setCurvature(Math.floor(Math.random() * 500) + 500);
      setIsWarning(Math.abs(newOffset) > 0.5);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className={`${isDarkMode ? "dark" : ""} min-h-screen w-full`}>
      <div className="min-h-screen w-full bg-slate-100 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col font-sans transition-colors duration-300">
        {/* --- HEADER --- */}
        {/* Padding diperkecil (p-3) untuk layar mobile, p-4 untuk layar md ke atas */}
        <header className="p-3 md:p-4 bg-white dark:bg-slate-900 flex justify-between items-center shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
          <div className="flex items-center gap-2 md:gap-3">
            <ShieldCheck
              className={
                isWarning
                  ? "text-red-500 animate-pulse"
                  : "text-emerald-500 dark:text-emerald-400"
              }
              size={28} // Ukuran sedikit diperkecil untuk mobile
            />
            {/* Teks dikecilkan di mobile (text-xl), kembali besar (text-2xl) di md */}
            <h1 className="text-xl md:text-2xl font-bold tracking-wider text-slate-800 dark:text-white">
              LANE-GUARD
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Status teks disembunyikan di layar HP paling kecil (hidden sm:flex) biar header gak penuh */}
            <div className="hidden sm:flex items-center gap-2 text-xs md:text-sm font-semibold text-slate-500 dark:text-slate-400 font-mono">
              <span className="flex h-3 w-3 relative">
                <span
                  className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${isWarning ? "bg-red-400" : "bg-emerald-400"}`}
                ></span>
                <span
                  className={`relative inline-flex rounded-full h-3 w-3 ${isWarning ? "bg-red-500" : "bg-emerald-500"}`}
                ></span>
              </span>
              Active
            </div>

            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors"
              title="Toggle Theme"
            >
              {isDarkMode ? (
                <Moon size={20} className="text-blue-200" />
              ) : (
                <Sun size={20} className="text-yellow-500" />
              )}
            </button>
          </div>
        </header>

        {/* --- MAIN CONTENT AREA --- */}
        {/* Padding lebih rapat (p-2) di mobile, kembali lega (p-4) di desktop */}
        <main className="flex-1 flex flex-col p-2 md:p-4 gap-4 relative">
          {/* Banner Peringatan - Penyesuaian ukuran teks dan padding */}
          {isWarning && (
            <div className="absolute top-4 md:top-8 left-1/2 -translate-x-1/2 z-10 w-11/12 md:w-auto max-w-sm bg-red-600 text-white px-4 md:px-8 py-2 md:py-3 rounded-full flex justify-center items-center gap-2 md:gap-3 shadow-lg shadow-red-600/50 animate-pulse">
              <AlertTriangle size={24} />
              <span className="font-bold text-sm md:text-xl uppercase tracking-widest whitespace-nowrap text-center">
                Lane Departure
              </span>
            </div>
          )}

          {/* --- VIDEO FEED AREA --- */}
          {/* Lebar video otomatis full, melingkar lebih sedikit di mobile (rounded-xl vs rounded-2xl) */}
          <div
            className={`w-full max-w-5xl mx-auto aspect-video bg-black rounded-xl md:rounded-2xl overflow-hidden border-2 md:border-4 relative transition-colors duration-300 ${isWarning ? "border-red-500 shadow-lg shadow-red-500/50" : "border-slate-300 dark:border-slate-800"}`}
          >
            <video
              src="/jalan.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/40 pointer-events-none"></div>
          </div>

          {/* --- METRICS DASHBOARD --- */}
          {/* PENTING: grid-cols-1 untuk mobile (atas bawah), md:grid-cols-2 untuk desktop (kanan kiri) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 flex-1">
            {/* 1. Radius of Curvature Metric */}
            <div className="bg-white dark:bg-slate-900 rounded-xl md:rounded-2xl p-4 flex flex-col justify-center border border-slate-200 dark:border-slate-800 shadow-sm transition-colors duration-300 min-h-[100px]">
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Navigation size={18} />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  Curvature Radius
                </span>
              </div>
              <div className="text-3xl md:text-4xl font-mono font-bold text-slate-800 dark:text-white">
                {curvature}{" "}
                <span className="text-lg md:text-xl text-slate-400">m</span>
              </div>
            </div>

            {/* 2. Lateral Offset Metric */}
            <div
              className={`rounded-xl md:rounded-2xl p-4 flex flex-col justify-center border transition-all duration-300 shadow-sm min-h-[100px] ${
                isWarning
                  ? "bg-red-50 dark:bg-red-900/20 border-red-400 dark:border-red-500"
                  : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 mb-2">
                <Car size={18} />
                <span className="text-xs md:text-sm font-bold uppercase tracking-wider">
                  Vehicle Offset
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                {/* Ukuran angka dikecilkan sedikit di mobile */}
                <span
                  className={`text-4xl md:text-5xl font-mono font-bold ${
                    isWarning
                      ? "text-red-600 dark:text-red-400"
                      : "text-emerald-600 dark:text-emerald-400"
                  }`}
                >
                  {Math.abs(offset).toFixed(2)}
                </span>
                <span className="text-lg md:text-xl text-slate-400 font-mono">
                  m
                </span>
                <span
                  className={`ml-auto text-xl md:text-2xl font-bold uppercase ${
                    offset > 0
                      ? "text-blue-500 dark:text-blue-400"
                      : offset < 0
                        ? "text-amber-500 dark:text-amber-400"
                        : "text-slate-400"
                  }`}
                >
                  {offset > 0 ? "Right" : offset < 0 ? "Left" : "Center"}
                </span>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LaneGuardDashboard;
