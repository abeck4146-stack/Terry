import React, { useState } from 'react';
import { Calendar, Plus, Pill, Clock, PlusCircle, AlertCircle, Sparkles, Send, Trash2 } from 'lucide-react';
import { Medication, UserProfile } from '../types';

interface ScheduleViewProps {
  profile: UserProfile;
  medications: Medication[];
  onAddMedication: (med: Omit<Medication, 'id'>) => void;
  onRemoveMedication: (id: string) => void;
}

export default function ScheduleView({
  profile,
  medications,
  onAddMedication,
  onRemoveMedication,
}: ScheduleViewProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [time, setTime] = useState('08:00 AM');
  const [dosage, setDosage] = useState('1 Tablet');
  const [notes, setNotes] = useState('With Breakfast');
  const [iconType, setIconType] = useState<'pill' | 'medication' | 'supplement'>('pill');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddMedication({
      name,
      time,
      notes,
      dosage,
      iconType,
      status: 'pending',
    });

    // Reset Form
    setName('');
    setTime('08:00 AM');
    setDosage('1 Tablet');
    setNotes('With Breakfast');
    setIconType('pill');
    setShowAddForm(false);
  };

  // Group medications by time slots
  const timeSlots = [
    { label: 'Morning', icon: '🌅', items: medications.filter((m) => m.time.toLowerCase().includes('am') && !m.time.toLowerCase().includes('12')) },
    { label: 'Noon & Lunch', icon: '☀️', items: medications.filter((m) => m.time.toLowerCase().includes('12:') || m.notes.toLowerCase().includes('lunch') || m.notes.toLowerCase().includes('noon')) },
    { label: 'Afternoon & Evening', icon: '🌇', items: medications.filter((m) => m.time.toLowerCase().includes('pm') && !m.time.toLowerCase().includes('12:') && !m.notes.toLowerCase().includes('lunch') && !m.time.match(/10:|11:|09:/)) },
    { label: 'Night & Bedtime', icon: '🌙', items: medications.filter((m) => m.time.toLowerCase().includes('pm') && m.time.match(/10:|11:|09:/)) },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <section className="flex justify-between items-center">
        <div className="space-y-1">
          <h2 className="text-3xl font-extrabold tracking-tight font-sans text-on-surface">Daily Schedule</h2>
          <p className="text-on-surface-variant font-sans text-sm">Organize and monitor your precise physiological intake.</p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="p-3 rounded-full text-white hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          style={{
            background: profile.theme === 'warm' 
              ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
              : 'linear-gradient(135deg, #6366f1, #a855f7)'
          }}
        >
          <Plus className="w-5 h-5" />
        </button>
      </section>

      {/* Form Overlay */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900/95 rounded-[32px] w-full max-w-md overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h3 className="font-bold text-lg text-on-surface font-sans flex items-center gap-2">
                <Pill className="w-5 h-5 text-primary" style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }} /> Add Routine Pill
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="p-1 rounded-full hover:bg-white/10 text-slate-400 hover:text-slate-200 cursor-pointer transition-colors"
              >
                <XButton />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Medication Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Metformin, Lisinopril, Vitamin D3"
                  className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs font-semibold text-slate-100 placeholder-slate-500"
                  required
                />
              </div>

              {/* Grid times */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Timing</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. 08:00 AM"
                    className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs font-semibold text-slate-100 placeholder-slate-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Dosage</label>
                  <input
                    type="text"
                    value={dosage}
                    onChange={(e) => setDosage(e.target.value)}
                    placeholder="e.g. 1 Tablet"
                    className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs font-semibold text-slate-100 placeholder-slate-500"
                    required
                  />
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Instructions / Notes</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. With Lunch, Before Sleeping"
                  className="w-full bg-white/5 rounded-xl p-3 border border-white/10 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-xs font-semibold text-slate-100 placeholder-slate-500"
                  required
                />
              </div>

              {/* Icon select */}
              <div>
                <label className="block text-[10px] font-bold text-on-surface-variant/80 uppercase mb-1">Type Accent</label>
                <div className="flex gap-2">
                  {(['pill', 'medication', 'supplement'] as const).map((type) => {
                    const isSelected = iconType === type;
                    const warmColor = 'bg-amber-500/10 border-amber-500 text-amber-400';
                    const coolColor = 'bg-indigo-500/10 border-indigo-500 text-indigo-400';
                    return (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setIconType(type)}
                        className={`flex-1 py-2 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                          isSelected
                            ? (profile.theme === 'warm' ? warmColor : coolColor)
                            : 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10'
                        }`}
                      >
                        {type === 'pill' ? '💊 Capsule' : type === 'medication' ? '⚕️ Tablet' : '🧪 Liquid'}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all duration-300 hover:shadow-lg active:scale-98 cursor-pointer"
                style={{
                  background: profile.theme === 'warm' 
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
                    : 'linear-gradient(135deg, #6366f1, #a855f7)'
                }}
              >
                <Send className="w-4 h-4" /> Save Schedule
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Slots rendering */}
      <div className="space-y-6">
        {timeSlots.map((slot) => {
          return (
            <div key={slot.label} className="space-y-3">
              {/* Header slot */}
              <div className="flex items-center gap-2 px-1">
                <span className="text-xl">{slot.icon}</span>
                <h4 className="font-bold text-base text-on-surface font-sans">{slot.label}</h4>
                <span className="text-xs text-on-surface-variant/50">({slot.items.length})</span>
              </div>

              {/* Slot items */}
              {slot.items.length === 0 ? (
                <div className="p-5 text-center text-xs text-on-surface-variant/50 glass-layer rounded-2xl italic">
                  No scheduled items in this slot
                </div>
              ) : (
                <div className="space-y-2.5">
                  {slot.items.map((item) => (
                    <div
                      key={item.id}
                      className="glass-layer rounded-2xl p-4 flex items-center justify-between gap-4 border-l-4"
                      style={{ borderLeftColor: item.status === 'taken' ? '#10B981' : (profile.theme === 'warm' ? '#F59E0B' : '#6366f1') }}
                    >
                      <div className="flex items-center gap-3">
                        <Pill className={`w-5 h-5 ${item.status === 'taken' ? 'text-emerald-500' : 'text-gray-400'}`} />
                        <div>
                          <p className="font-bold text-sm text-on-surface">{item.name}</p>
                          <p className="text-xs text-on-surface-variant mt-0.5">{item.time} • {item.notes}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-mono font-bold uppercase px-2.5 py-1 rounded-full ${
                          item.status === 'taken' 
                            ? 'bg-emerald-500/10 text-emerald-400' 
                            : 'bg-amber-500/10 text-amber-400'
                        }`}>
                          {item.status === 'taken' ? 'Taken' : 'Pending'}
                        </span>
                        
                        <button
                          onClick={() => onRemoveMedication(item.id)}
                          className="p-1.5 rounded-lg hover:bg-white/10 text-red-400 hover:text-red-300 cursor-pointer transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function XButton() {
  return (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
