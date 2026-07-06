import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Mic, MicOff, User, CornerDownRight, Play, Check, X, Award, HelpCircle, Dumbbell } from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';

interface AIAssistantProps {
  profile: UserProfile;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export default function AIAssistant({
  profile,
  messages,
  onSendMessage,
  isLoading,
}: AIAssistantProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [showStretchPlay, setShowStretchPlay] = useState(false);
  const [playCountdown, setPlayCountdown] = useState(120); // 2 minutes countdown
  const [timerActive, setTimerActive] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Handle countdown timer
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerActive && playCountdown > 0) {
      interval = setInterval(() => {
        setPlayCountdown((prev) => prev - 1);
      }, 1000);
    } else if (playCountdown === 0) {
      setTimerActive(false);
    }
    return () => clearInterval(interval);
  }, [timerActive, playCountdown]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  const handleMicToggle = () => {
    if (!isListening) {
      setIsListening(true);
      // Simulate speech-to-text input after 3 seconds
      setTimeout(() => {
        setIsListening(false);
        setInput("I feel a little bit of tightness in my back after walking.");
      }, 2500);
    } else {
      setIsListening(false);
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Suggestion click proxy
  const handleSuggestion = (prompt: string) => {
    onSendMessage(prompt);
  };

  return (
    <div className="space-y-6 flex flex-col min-h-[calc(100vh-180px)] animate-in fade-in slide-in-from-bottom-4 duration-500 pb-32">
      
      {/* Dynamic Header Greeting */}
      <section className="text-center space-y-2 py-4">
        <h1 className="text-4xl font-extrabold tracking-tight font-sans text-on-surface">
          {profile.id === 'grandma' ? 'Hello, Grandma Wang.' : 'Good morning, Alex.'}
        </h1>
        <p className="text-on-surface-variant font-sans text-base">How can I assist your health journey today?</p>
      </section>

      {/* Suggestion Chips */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar px-1">
        <button
          onClick={() => handleSuggestion("Give me a healthy recipe for high energy")}
          className="px-5 py-2.5 rounded-full glass-layer flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95 transition-all text-xs font-semibold text-on-surface cursor-pointer shadow-sm"
        >
          <span>🥗</span>
          <span>Recipe for Energy</span>
        </button>
        <button
          onClick={() => handleSuggestion("Guide me through a 5-minute wind-down meditation")}
          className="px-5 py-2.5 rounded-full glass-layer flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95 transition-all text-xs font-semibold text-on-surface cursor-pointer shadow-sm"
        >
          <span>🧘‍♀️</span>
          <span>5-Min Meditation</span>
        </button>
        <button
          onClick={() => handleSuggestion("Analyze my vitamins schedule and give a report")}
          className="px-5 py-2.5 rounded-full glass-layer flex items-center gap-2 whitespace-nowrap hover:scale-105 active:scale-95 transition-all text-xs font-semibold text-on-surface cursor-pointer shadow-sm"
        >
          <span>📊</span>
          <span>Vitamin Report</span>
        </button>
      </div>

      {/* Chat History Canvas */}
      <div className="flex-1 space-y-5 px-1 min-h-[300px]">
        {messages.map((msg) => {
          const isAI = msg.role === 'assistant';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${isAI ? '' : 'ml-auto flex-row-reverse'}`}
            >
              {/* Profile image / AI icon */}
              <div 
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-2 shadow-md ${
                  isAI 
                    ? (profile.theme === 'warm' ? 'bg-amber-500 text-white' : 'bg-indigo-500 text-white')
                    : 'bg-emerald-600 text-white'
                }`}
              >
                {isAI ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              {/* Message Glass Bubble */}
              <div
                className="p-5 rounded-[24px] shadow-lg transition-all text-sm leading-relaxed"
                style={{
                  background: isAI 
                    ? (profile.theme === 'warm' ? 'rgba(251, 191, 36, 0.08)' : 'rgba(99, 102, 241, 0.08)')
                    : (profile.theme === 'warm' ? 'rgba(217, 119, 6, 0.2)' : 'rgba(99, 102, 241, 0.2)'),
                  border: isAI 
                    ? (profile.theme === 'warm' ? '1px solid rgba(251, 191, 36, 0.15)' : '1px solid rgba(99, 102, 241, 0.15)')
                    : (profile.theme === 'warm' ? '1px solid rgba(217, 119, 6, 0.3)' : '1px solid rgba(99, 102, 241, 0.3)'),
                  backdropFilter: 'blur(24px)',
                  borderBottomLeftRadius: isAI ? '4px' : '24px',
                  borderBottomRightRadius: isAI ? '24px' : '4px',
                  color: '#f8fafc'
                }}
              >
                <p className="font-sans whitespace-pre-wrap">{msg.content}</p>

                {/* Inline interactive cards if attached */}
                {isAI && msg.exercise && (
                  <div className="mt-4 grid grid-cols-1 gap-3">
                    <div 
                      onClick={() => {
                        setPlayCountdown(120);
                        setShowStretchPlay(true);
                      }}
                      className="flex items-center gap-4 p-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-all cursor-pointer group"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 shadow-inner">
                        <img 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                          src={msg.exercise.imageUrl} 
                          alt={msg.exercise.title} 
                        />
                      </div>
                      <div className="flex-grow text-left">
                        <p className="font-bold text-sm text-slate-100">{msg.exercise.title}</p>
                        <p className="text-xs text-slate-400">{msg.exercise.duration} • {msg.exercise.type}</p>
                      </div>
                      <span className="p-2 bg-white/10 rounded-full text-slate-200 group-hover:bg-primary group-hover:text-white transition-all">
                        <Play className="w-4 h-4 fill-current" />
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading Bubble */}
        {isLoading && (
          <div className="flex gap-3 max-w-[85%]">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-2 shadow ${profile.theme === 'warm' ? 'bg-amber-500' : 'bg-indigo-500'} text-white`}>
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div 
              className="p-5 rounded-[24px] shadow-sm flex items-center gap-2 text-xs font-semibold text-slate-300 animate-pulse"
              style={{
                background: profile.theme === 'warm' ? 'rgba(251, 191, 36, 0.08)' : 'rgba(99, 102, 241, 0.08)',
                border: profile.theme === 'warm' ? '1px solid rgba(251, 191, 36, 0.15)' : '1px solid rgba(99, 102, 241, 0.15)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <span>VitalSphere AI is analyzing physiological data...</span>
            </div>
          </div>
        )}

        <div ref={chatEndRef} />
      </div>

      {/* Guided Exercise Modal Player */}
      {showStretchPlay && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-slate-900/95 rounded-[32px] w-full max-w-sm p-6 overflow-hidden shadow-2xl border border-white/10 text-center space-y-6 animate-in zoom-in-95 duration-300">
            <div className="flex justify-between items-center pb-2 border-b border-white/10">
              <span className="flex items-center gap-1.5 font-bold text-xs text-amber-400 bg-amber-500/10 px-3 py-1 rounded-full uppercase tracking-wider font-mono">
                <Dumbbell className="w-3.5 h-3.5" /> Exercise Guidance
              </span>
              <button 
                onClick={() => {
                  setTimerActive(false);
                  setShowStretchPlay(false);
                }}
                className="p-1 rounded-full hover:bg-white/10 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-extrabold text-slate-100 font-sans">Cat-Cow Pose</h3>
              <p className="text-xs text-slate-400 px-4 leading-relaxed">
                Inhale into Cow pose, arching your back and lifting your chin. Exhale into Cat pose, rounding your spine and tucking your chin to chest.
              </p>
            </div>

            {/* Simulated 3D Illustration / Graphic */}
            <div className="w-44 h-44 mx-auto rounded-full border-4 border-amber-500/30 overflow-hidden relative shadow-inner">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDn5i6HGoGtWrc5FBSmR-COKy4l64DoJ7oPfqXYGSOtBvKIOMLwEgR74ZPXp0XSqFZMRJhmas8jUeD2mIvKH_R9b-5y_nchMQGRdvVFxpiVSBqQc7gjj0TgZZ79PXj7SmGddlWVn4ydRjr2dTUmughRmKEM7NZBCXw3HMM5H-N5nz4ohnkyCv6HVb3_gjvEgbSRXrdZiTjBQHMcq-EKd2Nig42YrD38_ogH25Y8bRXCo3GG2tjydP8" 
                className={`w-full h-full object-cover transition-all duration-[2000ms] ${timerActive ? 'scale-110 rotate-3' : 'scale-100'}`}
                alt="Stretch graphic" 
              />
              <div className="absolute inset-0 bg-black/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-extrabold text-white font-mono tracking-wider drop-shadow-md">
                  {formatTimer(playCountdown)}
                </span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3">
              <button
                onClick={() => setTimerActive(!timerActive)}
                className="px-6 py-3 rounded-full text-white font-bold text-xs shadow-md active:scale-95 transition-all cursor-pointer"
                style={{
                  background: profile.theme === 'warm' 
                    ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
                    : 'linear-gradient(135deg, #6366f1, #a855f7)'
                }}
              >
                {timerActive ? 'Pause Stretch' : playCountdown === 120 ? 'Start Stretch' : 'Resume Stretch'}
              </button>
              <button
                onClick={() => {
                  setTimerActive(false);
                  setPlayCountdown(120);
                }}
                className="px-6 py-3 rounded-full bg-white/10 border border-white/10 text-slate-300 font-bold text-xs active:scale-95 transition-all cursor-pointer hover:bg-white/15"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Microphone Voice Controller */}
      <div className="fixed bottom-32 left-1/2 -translate-x-1/2 z-40">
        <button
          onClick={handleMicToggle}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 active:scale-90 cursor-pointer ${
            isListening 
              ? 'bg-rose-600 scale-105 shadow-[0_0_30px_rgba(244,63,94,0.6)]' 
              : 'shadow-lg hover:scale-105'
          }`}
          style={!isListening ? {
            background: profile.theme === 'warm' 
              ? 'linear-gradient(135deg, #F59E0B, #D97706)' 
              : 'linear-gradient(135deg, #6366f1, #a855f7)',
            boxShadow: profile.theme === 'warm' 
              ? '0 12px 40px rgba(217, 119, 6, 0.35)' 
              : '0 12px 40px rgba(99, 102, 241, 0.35)'
          } : {}}
        >
          {isListening ? (
            <div className="relative w-full h-full flex items-center justify-center">
              <span className="absolute animate-ping w-8 h-8 rounded-full bg-rose-400 opacity-60"></span>
              <MicOff className="w-7 h-7" />
            </div>
          ) : (
            <Mic className="w-7 h-7 animate-pulse" />
          )}
        </button>
      </div>

      {/* Bottom Text Input Bar */}
      <div className="fixed bottom-24 w-[calc(100%-32px)] max-w-md left-1/2 -translate-x-1/2 z-40">
        <form 
          onSubmit={handleSend}
          className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-full px-5 py-2.5 shadow-xl hover:border-white/20 transition-all"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={isListening ? "Listening..." : "Type a message..."}
            disabled={isListening || isLoading}
            className="bg-transparent border-none outline-none focus:ring-0 flex-grow text-xs font-semibold text-slate-100 placeholder:text-slate-500"
          />
          <button
            type="submit"
            disabled={isListening || isLoading || !input.trim()}
            className="text-primary hover:scale-105 active:scale-95 transition-all cursor-pointer disabled:opacity-40 disabled:scale-100"
            style={{ color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' }}
          >
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
