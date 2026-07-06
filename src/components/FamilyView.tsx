import React, { useState } from 'react';
import { Users, Heart, MessageSquare, Plus, PartyPopper, Footprints, Smile, X, Send, Image as ImageIcon } from 'lucide-react';
import { FamilyMoment, UserProfile } from '../types';

interface FamilyViewProps {
  profile: UserProfile;
  moments: FamilyMoment[];
  onAddMoment: (moment: Omit<FamilyMoment, 'id'>) => void;
  onToggleCheer: (id: string) => void;
}

export default function FamilyView({
  profile,
  moments,
  onAddMoment,
  onToggleCheer,
}: FamilyViewProps) {
  const [showPostModal, setShowPostModal] = useState(false);
  const [text, setText] = useState('');
  const [mood, setMood] = useState('Energetic ⚡');
  const [steps, setSteps] = useState('6,200');
  const [momentType, setMomentType] = useState<'check-in' | 'activity'>('check-in');
  const [activityType, setActivityType] = useState('Walking');
  const [distance, setDistance] = useState('3.1');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    onAddMoment({
      author: profile.id === 'grandma' ? 'Grandma Wang' : 'Alex',
      avatarUrl: profile.avatarUrl,
      timeAgo: 'Just now',
      type: momentType,
      steps: momentType === 'check-in' ? parseInt(steps.replace(/,/g, ''), 10) || 4000 : undefined,
      mood: momentType === 'check-in' ? mood : undefined,
      text: text,
      image: momentType === 'activity' 
        ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhjh8gNxxfI_tsqt4xzaxZ_rzTf-ZlzchTOcBK-gpq-7YaFObqU1G2uKKwsTZ3x5Znahqwk5ePfKsbSAIVrlsVIyuT8wGahGdIfSFRJrkxM4KnbRqvNVw3n3-onSOxVPwqg4PbCl-d0agqxZIml3EEilEFjuTyc_JFGb2WWrE0BfS48KpuxbCQkE9JyYrXA_hcsRc8kgRIPa7gAomGIrSvg5KfSanKYGqkGtFW-5lVKhCF6TZOf8U' 
        : undefined,
      cheeredByMe: false,
      cheerCount: 0,
      cheeredByNames: [],
    });

    // Reset fields
    setText('');
    setMood('Energetic ⚡');
    setSteps('6,200');
    setMomentType('check-in');
    setShowPostModal(false);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      {/* Welcome Section */}
      <section className="space-y-2">
        <h2 className="text-3xl font-extrabold tracking-tight font-sans text-on-surface">Family Circle</h2>
        <p className="text-on-surface-variant font-sans text-sm">Stay connected with your loved ones' wellness journey.</p>
      </section>

      {/* Bento Grid Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Active Members Card */}
        <div className="glass-layer rounded-3xl p-6 md:col-span-1 flex flex-col justify-between min-h-[160px] shadow-spatial">
          <div className="flex justify-between items-start">
            <Users className="text-primary text-3xl" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }} />
            <span className="px-3 py-1 rounded-full text-[10px] font-extrabold font-mono bg-amber-500/10 text-amber-400 uppercase tracking-wider animate-pulse">
              5 Active
            </span>
          </div>
          <div>
            <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Circle Health</p>
            <p className="text-xl font-bold font-sans text-on-surface">Steady &amp; Vibrant</p>
          </div>
        </div>

        {/* Group Goal Card */}
        <div className="glass-layer rounded-3xl p-6 md:col-span-2 shadow-spatial flex items-center gap-6">
          <div className="relative w-24 h-24 flex-shrink-0 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90">
              <circle
                className="text-white/10"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeWidth="8"
              />
              <circle
                className="text-primary"
                cx="48"
                cy="48"
                fill="transparent"
                r="40"
                stroke="currentColor"
                strokeDasharray="251.2"
                strokeDashoffset="62" // 75% progress
                strokeLinecap="round"
                strokeWidth="8"
                style={{
                  color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1',
                  transition: 'stroke-dashoffset 1s ease-out'
                }}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center font-extrabold text-sm text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}>
              75%
            </div>
          </div>
          <div className="space-y-1">
            <p className="font-mono text-[9px] text-on-surface-variant uppercase tracking-widest font-bold">Weekly Steps Challenge</p>
            <h3 className="text-lg font-bold font-sans text-on-surface">152k / 200k steps</h3>
            <p className="text-xs text-on-surface-variant font-medium">The Miller family is crushing it today!</p>
          </div>
        </div>

      </div>

      {/* Feed Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold text-on-surface tracking-tight px-1">Recent Moments</h3>
        
        {moments.map((mom) => {
          return (
            <article
              key={mom.id}
              className="glass-card rounded-[32px] overflow-hidden shadow-spatial border-tertiary-fixed transition-all duration-300"
            >
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-white/10 shadow-sm">
                      <img className="w-full h-full object-cover" src={mom.avatarUrl} alt={mom.author} />
                    </div>
                    <div>
                      <h4 className="font-bold text-base text-on-surface">{mom.author}</h4>
                      <p className="text-xs text-on-surface-variant">{mom.timeAgo} • {mom.type === 'check-in' ? 'Check-in' : 'Activity'}</p>
                    </div>
                  </div>
                  {/* Glowing heart/celebration icon */}
                  <Heart 
                    onClick={() => onToggleCheer(mom.id)}
                    className={`w-5 h-5 cursor-pointer transition-all duration-300 ${
                      mom.cheeredByMe ? 'text-rose-500 fill-rose-500 scale-125' : 'text-slate-400 hover:text-rose-400'
                    }`} 
                  />
                </div>

                {/* Sub info grid if check-in */}
                {mom.type === 'check-in' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 p-4 rounded-2xl flex flex-col gap-1 border border-white/10 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Steps Today</span>
                      <span className="text-lg font-extrabold text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}>
                        {mom.steps?.toLocaleString()}
                      </span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-2xl flex flex-col gap-1 border border-white/10 shadow-sm">
                      <span className="text-[10px] font-mono text-slate-400 uppercase font-bold tracking-wider">Mood</span>
                      <span className="text-lg font-extrabold text-tertiary">
                        {mom.mood}
                      </span>
                    </div>
                  </div>
                )}

                {/* Visual moment image if activity */}
                {mom.type === 'activity' && mom.image && (
                  <div className="relative rounded-[24px] overflow-hidden aspect-[16/10] shadow-md group border border-white/10">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      src={mom.image}
                      alt="Moment capture"
                    />
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-white text-xs font-bold border border-white/10 shadow-lg">
                      🚴 Cycling • 12.4 miles
                    </div>
                  </div>
                )}

                <p className="text-on-surface-variant text-sm leading-relaxed px-1 font-medium">
                  {mom.text}
                </p>

                {/* Micro social bar */}
                <div className="flex items-center justify-between border-t border-white/10 pt-4 px-1">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => onToggleCheer(mom.id)}
                      className={`flex items-center gap-1.5 text-xs font-bold font-mono tracking-wide px-4 py-2 rounded-full cursor-pointer transition-all ${
                        mom.cheeredByMe 
                          ? 'bg-rose-500 text-white shadow-sm' 
                          : 'bg-white/5 text-primary border border-white/10 hover:bg-white/10'
                      }`}
                      style={!mom.cheeredByMe ? { color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' } : {}}
                    >
                      <PartyPopper className="w-4 h-4" />
                      {mom.cheeredByMe ? 'Cheered!' : 'Cheer'}
                    </button>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {/* Small avatar pile if cheerers exist */}
                    {mom.cheerCount > 0 && (
                      <div className="flex -space-x-1.5">
                        <div className="w-5 h-5 rounded-full border border-white/10 bg-amber-500 text-[8px] font-bold text-white flex items-center justify-center scale-90">Dad</div>
                        <div className="w-5 h-5 rounded-full border border-white/10 bg-indigo-500 text-[8px] font-bold text-white flex items-center justify-center scale-90">Mom</div>
                      </div>
                    )}
                    <p className="text-[11px] font-sans text-on-surface-variant font-medium">
                      {mom.cheerCount === 0 
                        ? 'Be the first to cheer!' 
                        : mom.cheeredByMe 
                          ? `You and ${mom.cheerCount - 1} others cheered`
                          : `${mom.cheerCount} loved ones cheered`}
                    </p>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* FAB Button */}
      <button
        onClick={() => setShowPostModal(true)}
        className="fixed bottom-28 right-6 w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl z-40 transition-transform duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        style={{
          background: profile.theme === 'warm' 
            ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
            : 'linear-gradient(135deg, #6366f1, #a855f7)'
        }}
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Custom Moment Posting Dialog Sheet */}
      {showPostModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900/95 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-bold text-lg text-on-surface font-sans flex items-center gap-2">
                <PartyPopper className="w-5 h-5 text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }} /> Share a Moment
              </h3>
              <button
                onClick={() => setShowPostModal(false)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Type Switch */}
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/5">
                <button
                  type="button"
                  onClick={() => setMomentType('check-in')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    momentType === 'check-in' 
                      ? 'bg-white/10 text-slate-100 shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Health Check-in
                </button>
                <button
                  type="button"
                  onClick={() => setMomentType('activity')}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                    momentType === 'activity' 
                      ? 'bg-white/10 text-slate-100 shadow' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Activity/Photo
                </button>
              </div>

              {/* Check-in fields */}
              {momentType === 'check-in' && (
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Steps Today</label>
                    <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 focus-within:ring-1 focus-within:ring-primary">
                      <Footprints className="w-4 h-4 text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }} />
                      <input
                        type="text"
                        value={steps}
                        onChange={(e) => setSteps(e.target.value)}
                        className="bg-transparent border-none outline-none focus:ring-0 text-xs font-bold text-slate-100 w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Current Mood</label>
                    <div className="flex items-center gap-2 bg-white/5 p-2.5 rounded-xl border border-white/10 focus-within:ring-1 focus-within:ring-primary">
                      <Smile className="w-4 h-4 text-tertiary" />
                      <input
                        type="text"
                        value={mood}
                        onChange={(e) => setMood(e.target.value)}
                        className="bg-transparent border-none outline-none focus:ring-0 text-xs font-bold text-slate-100 w-full"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Activity Fields */}
              {momentType === 'activity' && (
                <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}>
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-100">Auto-Attach Photo</p>
                    <p className="text-[10px] text-slate-400">We will attach Brother Leo&apos;s beautiful cycling moment photo!</p>
                  </div>
                </div>
              )}

              {/* Moment Text */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">How are you feeling?</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Tell your family about your afternoon walk, sleep, or current feeling..."
                  className="w-full bg-white/5 rounded-2xl p-3 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs font-medium text-slate-100 placeholder-slate-500 resize-none h-24"
                  required
                />
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-lg active:scale-98 cursor-pointer"
                style={{
                  background: profile.theme === 'warm' 
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
                    : 'linear-gradient(135deg, #6366f1, #a855f7)'
                }}
              >
                <Send className="w-4 h-4" /> Share with Family
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
