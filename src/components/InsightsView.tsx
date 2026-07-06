import React, { useState } from 'react';
import { Sparkles, Moon, Heart, Droplets, Timer, Check, ArrowRight, Activity, Flame, ShieldAlert } from 'lucide-react';
import { UserProfile } from '../types';

interface InsightsViewProps {
  profile: UserProfile;
  onEnterChat: (prompt?: string) => void;
}

export default function InsightsView({ profile, onEnterChat }: InsightsViewProps) {
  const [expandedRec, setExpandedRec] = useState<string | null>(null);

  // Profile-specific data tuning
  const isWang = profile.id === 'grandma';
  const vitalityScore = isWang ? 74 : 88;
  const sleepDuration = isWang ? "6h 55m" : "7h 42m";
  const sleepDiff = isWang ? "+2% vs avg" : "+12% vs avg";
  const stepsCount = isWang ? "4,152" : "12,402";
  const exerciseMins = isWang ? "15" : "45";
  const standHours = isWang ? "8" : "11";
  const energyKcal = isWang ? "1,320" : "2,140";
  const restingHr = isWang ? 72 : 62;

  // Concentric circle radius values
  const ringParams = [
    { r: 80, stroke: '#f43f5e', progress: isWang ? 0.45 : 0.85 }, // Movement/Steps (Rose-500)
    { r: 62, stroke: '#a855f7', progress: isWang ? 0.35 : 0.75 }, // Exercise (Purple-500)
    { r: 44, stroke: '#6366f1', progress: isWang ? 0.65 : 0.90 }, // Stand (Indigo-500)
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Page Title */}
      <section className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight font-sans text-on-surface">
          Your Vital <span className="text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}>Insights</span>
        </h1>
        <p className="text-on-surface-variant text-sm font-sans leading-relaxed max-w-xl">
          Real-time physiological synthesis. Your body is communicating; here is the translation.
        </p>
      </section>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Vitality Quotient Score Card */}
        <div className="glass-card rounded-[32px] p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-primary uppercase tracking-widest font-bold" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}>
                  Vitality Quotient
                </span>
                <h2 className="text-4xl font-extrabold text-on-surface font-sans mt-1">
                  {vitalityScore}
                  <span className="text-base font-normal text-on-surface-variant/70">/100</span>
                </h2>
              </div>
              <div 
                className="p-3 rounded-full bg-primary/10 text-primary"
                style={{ backgroundColor: profile.theme === 'warm' ? 'rgba(245, 158, 11, 0.15)' : 'rgba(99, 102, 241, 0.15)', color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
              >
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
            </div>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Your recovery, cardiac health, and sleep architecture are balancing optimally. {isWang ? 'Great job taking regular brief walks!' : 'Expect peak cognitive and physical performance today.'}
            </p>
          </div>

          {/* SVG Sparkline chart */}
          <div className="relative h-24 mt-4 overflow-visible">
            <svg className="w-full h-full overflow-visible" viewBox="0 0 400 100">
              <defs>
                <linearGradient id="gradient-primary" x1="0%" x2="100%" y1="0%" y2="0%">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="1" />
                  <stop offset="50%" stopColor="#a855f7" stopOpacity="1" />
                  <stop offset="100%" stopColor="#6366f1" stopOpacity="1" />
                </linearGradient>
              </defs>
              <path
                className="chart-flow animate-in fade-in duration-1000 ease-in-out"
                d={isWang 
                  ? "M0 70 Q 50 85, 100 60 T 200 75 T 300 55 T 400 65" 
                  : "M0 80 Q 50 10, 100 70 T 200 40 T 300 80 T 400 20"
                }
                fill="none"
                stroke="url(#gradient-primary)"
                strokeLinecap="round"
                strokeWidth="4"
              />
              {/* Point highlights */}
              <circle cx="100" cy={isWang ? "60" : "70"} r="5" fill="#a855f7" className="shadow-lg animate-bounce" />
              <circle cx="400" cy={isWang ? "65" : "20"} r="6" fill="#6366f1" className="shadow-xl" />
            </svg>
          </div>
        </div>

        {/* Sleep Architecture card */}
        <div className="glass-card rounded-[32px] p-6 flex flex-col justify-between min-h-[300px] relative overflow-hidden group">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                <Moon className="w-5 h-5" />
              </div>
              <span className="font-mono text-xs text-on-surface-variant font-bold tracking-wider uppercase">
                Sleep Architecture
              </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-3xl font-extrabold font-sans text-on-surface">{sleepDuration}</span>
              <span className="text-emerald-600 font-bold text-xs">{sleepDiff}</span>
            </div>
            <p className="text-on-surface-variant text-sm">
              Your deep sleep and REM durations were well balanced. No sleep disturbances were detected overnight.
            </p>
          </div>

          {/* Simple Histogram representing phases */}
          <div className="flex gap-1.5 h-16 items-end mt-4">
            <div className="flex-1 bg-red-400/30 rounded-t-md hover:bg-red-400/50 transition-all cursor-help h-[35%]" title="Awake: 15m" />
            <div className="flex-1 bg-red-400/40 rounded-t-md hover:bg-red-400/60 transition-all cursor-help h-[55%]" title="REM: 1h 22m" />
            <div className="flex-1 bg-indigo-500/30 rounded-t-md hover:bg-indigo-500/50 transition-all cursor-help h-[80%]" title="Light: 4h 10m" />
            <div className="flex-1 bg-indigo-600/50 rounded-t-md hover:bg-indigo-600/70 transition-all cursor-help h-[100%]" title="Deep: 1h 55m" />
            <div className="flex-1 bg-red-400/40 rounded-t-md hover:bg-red-400/50 transition-all cursor-help h-[45%]" title="REM: 30m" />
            <div className="flex-1 bg-red-400/20 rounded-t-md hover:bg-red-400/30 transition-all cursor-help h-[25%]" title="Awake: 5m" />
          </div>
        </div>

        {/* Resting Heart Rate */}
        <div className="glass-card rounded-[32px] p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4">
            <span className="font-mono text-xs text-on-surface-variant font-bold tracking-wider uppercase">
              Resting HR
            </span>
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-4xl font-extrabold text-on-surface">{restingHr}</span>
              <span className="text-on-surface-variant font-mono text-[10px] tracking-wider font-semibold">BPM</span>
            </div>
            {/* Simple progress metric */}
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-4 overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-700" 
                style={{ 
                  width: `${(restingHr / 120) * 100}%`,
                  backgroundColor: profile.theme === 'warm' ? '#F59E0B' : '#6366f1'
                }} 
              />
            </div>
          </div>
        </div>

        {/* Concentric Circle Activity System */}
        <div className="glass-card rounded-[32px] p-6">
          <div className="flex flex-col sm:flex-row gap-6 items-center">
            {/* Concentric rings illustration */}
            <div className="relative w-40 h-40 flex-shrink-0 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                {ringParams.map((ring, index) => {
                  const circ = 2 * Math.PI * ring.r;
                  const offset = circ - ring.progress * circ;
                  return (
                    <React.Fragment key={index}>
                      <circle
                        className="text-white/10"
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r={ring.r}
                        stroke="currentColor"
                        strokeWidth="10"
                      />
                      <circle
                        cx="80"
                        cy="80"
                        fill="transparent"
                        r={ring.r}
                        stroke={ring.stroke}
                        strokeDasharray={`${circ} ${circ}`}
                        strokeDashoffset={offset}
                        strokeLinecap="round"
                        strokeWidth="10"
                        style={{ transition: 'stroke-dashoffset 1s ease-out' }}
                      />
                    </React.Fragment>
                  );
                })}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-lg font-bold text-on-surface">{isWang ? '65%' : '82%'}</span>
                <span className="font-mono text-[8px] text-on-surface-variant uppercase tracking-wider font-bold">Goal</span>
              </div>
            </div>

            {/* Metrics lists */}
            <div className="flex-grow grid grid-cols-2 gap-3 w-full">
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-rose-500" />
                  <span className="font-mono text-[9px] text-on-surface-variant/80 font-bold uppercase">Movement</span>
                </div>
                <span className="text-sm font-bold text-on-surface font-sans">
                  {stepsCount} <span className="text-[10px] font-normal text-on-surface-variant">Steps</span>
                </span>
              </div>
              
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-purple-500" />
                  <span className="font-mono text-[9px] text-on-surface-variant/80 font-bold uppercase">Exercise</span>
                </div>
                <span className="text-sm font-bold text-on-surface font-sans">
                  {exerciseMins} <span className="text-[10px] font-normal text-on-surface-variant">Mins</span>
                </span>
              </div>
              
              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <div className="w-2 h-2 rounded-full bg-indigo-500" />
                  <span className="font-mono text-[9px] text-on-surface-variant/80 font-bold uppercase">Stand</span>
                </div>
                <span className="text-sm font-bold text-on-surface font-sans">
                  {standHours} <span className="text-[10px] font-normal text-on-surface-variant">Hrs</span>
                </span>
              </div>

              <div className="p-3 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-1.5 mb-1">
                  <Flame className="w-3 h-3 text-amber-500" />
                  <span className="font-mono text-[9px] text-on-surface-variant/80 font-bold uppercase">Energy</span>
                </div>
                <span className="text-sm font-bold text-on-surface font-sans">
                  {energyKcal} <span className="text-[10px] font-normal text-on-surface-variant">kCal</span>
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Recommendations Feed Card */}
      <div className="glass-card rounded-[32px] overflow-hidden">
        <div className="p-6 border-b border-white/10 flex justify-between items-center">
          <h3 className="font-bold text-lg text-on-surface tracking-tight">Smart Recommendations</h3>
          <button 
            onClick={() => onEnterChat("Tell me more about VitalSphere's smart health recommendations")}
            className="text-primary font-mono text-[10px] font-bold tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all cursor-pointer"
            style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
          >
            Ask AI <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="divide-y divide-white/10">
          
          {/* Recommendation 1 */}
          <div 
            onClick={() => setExpandedRec(expandedRec === 'hydrate' ? null : 'hydrate')}
            className="p-6 flex gap-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center flex-shrink-0 text-sky-600">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-on-surface text-base">Increase Hydration</h4>
                <span className="text-[10px] font-mono font-semibold text-sky-600 bg-sky-500/10 px-2 py-0.5 rounded">High Priority</span>
              </div>
              <p className="text-on-surface-variant text-sm mt-1">
                Your core temperature was 0.3° higher than usual during sleep. Aim for 500ml extra water today.
              </p>
              
              {expandedRec === 'hydrate' && (
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-on-surface-variant space-y-2 animate-in fade-in duration-300">
                  <p className="font-medium text-on-surface">Physiological Breakdown:</p>
                  <p>Elevated core temperature during sleep phases often correlates with minor dehydration, as your cardiovascular system works harder to thermoregulate. Consuming 500ml of electrolytes or water early in the day will help restore homeostatic levels.</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterChat("Can you expand on how core temperature and hydration are connected during sleep?");
                    }}
                    className="mt-2 text-primary font-semibold flex items-center gap-1 cursor-pointer"
                    style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
                  >
                    Discuss with VitalSphere AI <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recommendation 2 */}
          <div 
            onClick={() => setExpandedRec(expandedRec === 'focus' ? null : 'focus')}
            className="p-6 flex gap-4 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center flex-shrink-0 text-amber-500">
              <Timer className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-on-surface text-base">Focus Opportunity</h4>
                <span className="text-[10px] font-mono font-semibold text-amber-600 bg-amber-500/10 px-2 py-0.5 rounded">Optimal</span>
              </div>
              <p className="text-on-surface-variant text-sm mt-1">
                Current heart rate variability indicates high sympathetic readiness. Perfect time for deep work.
              </p>

              {expandedRec === 'focus' && (
                <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-on-surface-variant space-y-2 animate-in fade-in duration-300">
                  <p className="font-medium text-on-surface">Autonomic Context:</p>
                  <p>Your Parasympathetic Autonomic nervous activity shows optimal balance. High heart rate variability (HRV) is associated with high cognitive resilience, rapid processing speed, and mental focus. We advise embarking on high-intensity mental tasks now.</p>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnterChat("My sympathetic readiness is high. Can you outline a 10-minute mental exercise or stretching routine to leverage this focus?");
                    }}
                    className="mt-2 text-primary font-semibold flex items-center gap-1 cursor-pointer"
                    style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
                  >
                    Discuss with VitalSphere AI <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recommendation 3 - Elderly-friendly suggestions */}
          {isWang && (
            <div 
              onClick={() => setExpandedRec(expandedRec === 'circulation' ? null : 'circulation')}
              className="p-6 flex gap-4 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <Activity className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h4 className="font-bold text-on-surface text-base">Gentle Leg Elevation</h4>
                  <span className="text-[10px] font-mono font-semibold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded">Circulation</span>
                </div>
                <p className="text-on-surface-variant text-sm mt-1">
                  Lower limb circulation indicators suggest a brief 10-minute elevation during afternoon rest will optimize vascular return.
                </p>

                {expandedRec === 'circulation' && (
                  <div className="mt-4 p-4 bg-white/5 border border-white/10 rounded-2xl text-xs text-on-surface-variant space-y-2 animate-in fade-in duration-300">
                    <p className="font-medium text-on-surface">Circulation Advise:</p>
                    <p>Elevating your feet slightly above heart level on a soft cushion reduces venous pressure, reducing ankle swelling and supporting your heart rate steadiness.</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onEnterChat("Can you write a detailed, gentle relaxation plan for an afternoon break with leg elevation?");
                      }}
                      className="mt-2 text-primary font-semibold flex items-center gap-1 cursor-pointer"
                      style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
                    >
                      Discuss with VitalSphere AI <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
