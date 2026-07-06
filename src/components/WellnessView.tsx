import React from 'react';
import { Pill, Activity, Heart, Clock, CheckCircle2, ChevronRight, AlertCircle, HeartHandshake } from 'lucide-react';
import { Medication, UserProfile } from '../types';

interface WellnessViewProps {
  profile: UserProfile;
  medications: Medication[];
  onToggleMedication: (id: string) => void;
  onEnterChat: (prompt?: string) => void;
}

export default function WellnessView({
  profile,
  medications,
  onToggleMedication,
  onEnterChat,
}: WellnessViewProps) {
  // Calculate adherence based on current list
  const totalMeds = medications.length;
  const takenMeds = medications.filter((m) => m.status === 'taken').length;
  const adherencePercent = totalMeds > 0 ? Math.round((takenMeds / totalMeds) * 100) : 100;
  
  // Dynamic dots mapping
  const pendingCount = totalMeds - takenMeds;

  // Circle progress calculation
  // Radius = 86, Circumference = 2 * Math.PI * 86 = 540.35
  const radius = 86;
  const strokeWidth = 12;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (adherencePercent / 100) * circumference;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Welcome Header */}
      <section className="space-y-1">
        <p className="font-mono text-xs text-on-surface-variant/70 tracking-widest uppercase">
          {profile.dateStr}
        </p>
        <h2 className="text-3xl font-bold font-sans text-on-surface tracking-tight">
          {profile.welcomeGreeting}
        </h2>
      </section>

      {/* Progress Bento Card */}
      <div className="glass-layer rounded-[32px] p-8 flex flex-col items-center justify-center space-y-6 relative overflow-hidden shadow-spatial">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 blur-3xl rounded-full"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-secondary/10 blur-3xl rounded-full"></div>

        <div className="relative w-48 h-48 flex items-center justify-center">
          {/* Progress Ring */}
          <svg className="w-full h-full transform -rotate-90">
            {/* Background Circle */}
            <circle
              className="text-white/10 stroke-current"
              cx="96"
              cy="96"
              fill="transparent"
              r={radius}
              strokeWidth={strokeWidth}
            />
            {/* Animated Progress Circle */}
            <circle
              className="progress-ring-circle stroke-current transition-all duration-700 ease-out"
              cx="96"
              cy="96"
              fill="transparent"
              r={radius}
              strokeLinecap="round"
              strokeWidth={strokeWidth}
              style={{
                strokeDasharray: `${circumference} ${circumference}`,
                strokeDashoffset: strokeDashoffset,
                color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1',
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span 
              className="text-4xl font-extrabold tracking-tight font-sans transition-all duration-500"
              style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
            >
              {adherencePercent}%
            </span>
            <span className="font-mono text-[10px] text-on-surface-variant/60 tracking-wider uppercase mt-1">
              Daily Adherence
            </span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <p className="text-sm font-sans text-on-surface-variant font-medium">
            {pendingCount === 0 
              ? "Incredible! All goals completed for today." 
              : `Almost there! Just ${pendingCount} more for today.`}
          </p>
          <div className="flex gap-2 justify-center">
            {medications.map((med) => (
              <span
                key={med.id}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
                  med.status === 'taken'
                    ? (profile.theme === 'warm' ? 'bg-amber-500 scale-110' : 'bg-primary scale-110')
                    : 'bg-white/10'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Ask AI Entry Point */}
      <button
        onClick={() => onEnterChat("When should I take my Metformin?")}
        className="w-full glass-layer rounded-2xl p-4 flex items-center gap-4 group transition-all duration-300 hover:bg-white/10 active:scale-[0.98] text-left cursor-pointer shadow-sm hover:shadow-md"
      >
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105"
          style={{
            background: profile.theme === 'warm' 
              ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
              : 'linear-gradient(135deg, #6366f1, #a855f7)'
          }}
        >
          <span className="text-white animate-pulse">✨</span>
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm text-on-surface">Ask VitalSphere AI</p>
          <p className="text-xs text-on-surface-variant/70 italic mt-0.5">
            &ldquo;When should I take my Metformin?&rdquo;
          </p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-all" />
      </button>

      {/* Medication List Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h3 className="font-bold text-lg text-on-surface tracking-tight">Upcoming Today</h3>
          <span className="font-mono text-xs text-on-surface-variant/60 font-semibold uppercase">
            {takenMeds}/{totalMeds} Done
          </span>
        </div>
        
        <div className="space-y-3">
          {medications.map((med) => {
            const isTaken = med.status === 'taken';
            return (
              <div
                key={med.id}
                className={`glass-layer rounded-2xl p-5 flex items-center gap-4 transition-all duration-300 ${
                  isTaken 
                    ? 'opacity-65 scale-[0.99] bg-white/5' 
                    : 'hover:-translate-y-0.5 hover:shadow-md'
                }`}
              >
                {/* Icon Circle */}
                <div 
                  className={`w-14 h-14 rounded-full flex items-center justify-center border transition-colors ${
                    isTaken 
                      ? 'bg-emerald-500/10 border-emerald-500/20' 
                      : med.iconType === 'pill'
                        ? 'bg-red-500/10 border-red-500/20'
                        : med.iconType === 'medication'
                          ? 'bg-indigo-500/10 border-indigo-500/20'
                          : 'bg-amber-500/10 border-amber-500/20'
                  }`}
                >
                  {isTaken ? (
                    <CheckCircle2 className="w-7 h-7 text-emerald-500 animate-in zoom-in-50 duration-300" />
                  ) : (
                    <Pill 
                      className={`w-7 h-7 ${
                        med.iconType === 'pill' 
                          ? 'text-red-500' 
                          : med.iconType === 'medication'
                            ? 'text-indigo-400'
                            : 'text-amber-500'
                      }`} 
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-semibold text-base text-on-surface ${isTaken ? 'line-through text-on-surface-variant/60' : ''}`}>
                    {med.name}
                  </h4>
                  <p className="text-xs text-on-surface-variant flex items-center gap-1 mt-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{med.time}</span>
                    <span className="text-on-surface-variant/40">•</span>
                    <span className="truncate">{med.notes}</span>
                  </p>
                </div>

                {/* Action button */}
                {isTaken ? (
                  <button
                    onClick={() => onToggleMedication(med.id)}
                    className="font-mono text-[10px] uppercase font-bold tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2 rounded-full hover:bg-emerald-500/20 cursor-pointer"
                  >
                    Done
                  </button>
                ) : (
                  <button
                    onClick={() => onToggleMedication(med.id)}
                    className="font-mono text-xs uppercase font-bold tracking-wider px-6 py-2.5 rounded-full transition-all active:scale-95 duration-200 cursor-pointer shadow-sm hover:shadow"
                    style={{
                      background: profile.theme === 'warm' 
                        ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
                        : 'linear-gradient(135deg, #6366f1, #a855f7)',
                      color: '#ffffff'
                    }}
                  >
                    TAKE
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Insights Bento Mini */}
      <section className="grid grid-cols-2 gap-4">
        <div className="glass-layer rounded-3xl p-6 space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Heart className="w-6 h-6 text-red-500 animate-pulse" />
            <span className="font-mono text-[9px] text-on-surface-variant/50 tracking-wider uppercase">Active</span>
          </div>
          <div>
            <p className="font-mono text-xs text-on-surface-variant/70 uppercase tracking-widest">
              Heart Rate
            </p>
            <p className="text-2xl font-bold font-sans text-on-surface mt-1">
              {profile.restingHr}{' '}
              <span className="text-xs font-normal text-on-surface-variant">bpm</span>
            </p>
          </div>
        </div>
        
        <div className="glass-layer rounded-3xl p-6 space-y-2 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <Activity className="w-6 h-6 text-primary" />
            <span className="font-mono text-[9px] text-on-surface-variant/50 tracking-wider uppercase">Vitals</span>
          </div>
          <div>
            <p className="font-mono text-xs text-on-surface-variant/70 uppercase tracking-widest">
              Blood Pressure
            </p>
            <p className="text-2xl font-bold font-sans text-on-surface mt-1">
              {profile.bp}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
