import React, { useState } from 'react';
import { Heart, Users, Calendar, TrendingUp, Sparkles, AlertTriangle, RefreshCw } from 'lucide-react';
import { UserProfile, Medication, FamilyMoment, ChatMessage } from './types';
import WellnessView from './components/WellnessView';
import FamilyView from './components/FamilyView';
import InsightsView from './components/InsightsView';
import ScheduleView from './components/ScheduleView';
import AIAssistant from './components/AIAssistant';

// Seeding standard assets/images
const GRANDMA_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuCeFN1BjzUusQzmGcQL7o3UZAUN35MJqHsWSKQM0fSSF3qDZgbPMd_t94C8MStLbNCl5JHpm6SeQjcTpd7tVk4i8ZFu6l2cvmPQ8qdPZAy_dZgC8aAn_uSzfcbNQxkwkgm5NM2WM1fJWZWI9CQiLl7trleUfv3fBOpetchSzl4d9w9CZg30cTBxVvkz7g-thvvhV4sxyULN8xo17CQYF6ohhwGRp-zVnZ43rEq8qJV1_Bh3o2wK5iM";
const ALEX_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuDJ2T7C-quQtSR2NLGrQr0QKxNXCx_RHRaqrRql3n-LzPyhSXKYZWgiwxqi934d7rNiwTrFjJUuWiixEyOypNzOqsYe-bf1UOFlBpBzXxXAQZaHMR39NseuKZ8M039CxwHgXq53qgTBqGG6VfUK11kO_QM1n9XNHrEXj-X9xjD99mHOJUBq_87GN0N0-GPzL_SrHwAtt7hMPenGulfbEtv7p4x0ph4c024xhJFzg7Wy_Cabyc37U2Q";
const MOM_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuChhcgFuoOEWIdDjMDkXsQO0WZMfsgyVOAC7PiIgix8m_6MMf_oUs1Pkgi_quqCF_MsTpT-TbIoE5fzgeaOtVmBQd30Z7_viCXLdzl-l-hjUaJqKlp1JwY0xpHxCOhx6hK0-iyFodBhEukBXR52PdmF9ECRBruytuPE46agZXbvIoyOkhJBo4db4o7GX-eb_rVDeutHk6VpcMRLgbt0PAUoHmwZn5zLMzrI_WxsN2xX7G8w3H-L4Js";
const BROTHER_AVATAR = "https://lh3.googleusercontent.com/aida-public/AB6AXuArJaQlN1YccXpGAaRZ1oOkzCuxnGROIEoncHEa-vMvNxpQT3gffmnKT0qFXIYwRbfimKl5Eur27amTAJ47t5sQWKR_an8BFEE9jjyb99lwexxY1lovn74ljmaj7gNFiX_5lTH1_WG7HjRr3cCWzq2ctu7MYyHsFR8HgtNAk445OWGh0lgqGVvOQyC1y0Ggk6ab99xecHkY0excIRH3Jiw7PMclId-vj-QXOy64ln_LZeOuPM8659k";
const STRETCH_IMG = "https://lh3.googleusercontent.com/aida-public/AB6AXuDn5i6HGoGtWrc5FBSmR-COKy4l64DoJ7oPfqXYGSOtBvKIOMLwEgR74ZPXp0XSqFZMRJhmas8jUeD2mIvKH_R9b-5y_nchMQGRdvVFxpiVSBqQc7gjj0TgZZ79PXj7SmGddlWVn4ydRjr2dTUmughRmKEM7NZBCXw3HMM5H-N5nz4ohnkyCv6HVb3_gjvEgbSRXrdZiTjBQHMcq-EKd2Nig42YrD38_ogH25Y8bRXCo3GG2tjydP8";

const PROFILES: UserProfile[] = [
  {
    id: 'grandma',
    name: 'Grandma Wang',
    welcomeGreeting: 'Hello, Grandma Wang',
    avatarUrl: GRANDMA_AVATAR,
    theme: 'warm',
    dateStr: 'TUESDAY, OCT 24',
    vitalityScore: 74,
    restingHr: 72,
    bp: '120/80',
    sleepDuration: '6h 55m',
    sleepDiff: '+2% vs avg',
  },
  {
    id: 'alex',
    name: 'Alex',
    welcomeGreeting: 'Good morning, Alex.',
    avatarUrl: ALEX_AVATAR,
    theme: 'cool',
    dateStr: 'MONDAY, OCT 23',
    vitalityScore: 88,
    restingHr: 62,
    bp: '110/70',
    sleepDuration: '7h 42m',
    sleepDiff: '+12% vs avg',
  }
];

export default function App() {
  const [profileIndex, setProfileIndex] = useState(0);
  const profile = PROFILES[profileIndex];
  
  const [activeTab, setActiveTab] = useState<'wellness' | 'family' | 'schedule' | 'insights' | 'ai'>('wellness');

  // Interactive local states for custom routines, shared moments, and AI chats
  const [medications, setMedications] = useState<Record<'grandma' | 'alex', Medication[]>>({
    grandma: [
      { id: '1', name: 'Metformin', time: '12:30 PM', dosage: '500mg', notes: 'With Lunch', iconType: 'pill', status: 'pending' },
      { id: '2', name: 'Lisinopril', time: '6:00 PM', dosage: '10mg', notes: 'Evening', iconType: 'medication', status: 'pending' },
      { id: '3', name: 'Vitamin D3', time: '8:15 AM', dosage: '1000 IU', notes: 'Taken at 8:15 AM', iconType: 'supplement', status: 'taken' },
    ],
    alex: [
      { id: '1', name: 'Multi-Vitamin', time: '9:00 AM', dosage: '1 Cap', notes: 'With breakfast', iconType: 'supplement', status: 'taken' },
      { id: '2', name: 'Protein Shake', time: '4:00 PM', dosage: '1 Scoop', notes: 'Post-workout', iconType: 'pill', status: 'pending' },
      { id: '3', name: 'Magnesium L-Threonate', time: '10:00 PM', dosage: '250mg', notes: 'Before bedtime', iconType: 'medication', status: 'pending' },
    ]
  });

  const [moments, setMoments] = useState<FamilyMoment[]>([
    {
      id: 'mom-1',
      author: 'Mom (Elena)',
      avatarUrl: MOM_AVATAR,
      timeAgo: '2 hours ago',
      type: 'check-in',
      steps: 8432,
      mood: 'Peaceful 🌿',
      text: 'Finished a beautiful morning walk in the park. Feeling very energized today!',
      cheeredByMe: false,
      cheerCount: 2,
      cheeredByNames: ['Dad', 'Brother Leo']
    },
    {
      id: 'brother-1',
      author: 'Brother (Leo)',
      avatarUrl: BROTHER_AVATAR,
      timeAgo: '5 hours ago',
      type: 'activity',
      text: 'New personal record on the ridge trail! The air was perfect.',
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhjh8gNxxfI_tsqt4xzaxZ_rzTf-ZlzchTOcBK-gpq-7YaFObqU1G2uKKwsTZ3x5Znahqwk5ePfKsbSAIVrlsVIyuT8wGahGdIfSFRJrkxM4KnbRqvNVw3n3-onSOxVPwqg4PbCl-d0agqxZIml3EEilEFjuTyc_JFGb2WWrE0BfS48KpuxbCQkE9JyYrXA_hcsRc8kgRIPa7gAomGIrSvg5KfSanKYGqkGtFW-5lVKhCF6TZOf8U",
      cheeredByMe: true,
      cheerCount: 3,
      cheeredByNames: ['Dad', 'Mom', 'Alex']
    }
  ]);

  const [chats, setChats] = useState<Record<'grandma' | 'alex', ChatMessage[]>>({
    grandma: [
      {
        id: 'init-1',
        role: 'assistant',
        content: "Hi Grandma Wang! I've analyzed your daily adherence metrics. It looks like you've been taking Vitamin D3 regularly. Do you need any assistance regarding Metformin or timing your Lisinopril for this evening?",
        timestamp: '10:00 AM'
      }
    ],
    alex: [
      {
        id: 'init-1',
        role: 'assistant',
        content: "I've analyzed your sleep patterns from last night. You achieved 22% deep sleep—your best in three weeks! Should we adjust your evening wind-down schedule to maintain this trend?",
        timestamp: '08:00 AM'
      },
      {
        id: 'init-2',
        role: 'user',
        content: "Yes, let's adjust it. Also, I've been feeling a bit of tension in my lower back after my morning walk.",
        timestamp: '08:02 AM'
      },
      {
        id: 'init-3',
        role: 'assistant',
        content: "Noted. Based on your posture data, I recommend these three targeted stretches. I can guide you through them now.",
        timestamp: '08:03 AM',
        exercise: {
          title: "Cat-Cow Pose",
          duration: "2 mins",
          type: "Gentle Flow",
          imageUrl: STRETCH_IMG
        }
      }
    ]
  });

  const [chatLoading, setChatLoading] = useState(false);

  // Toggle med taken/pending
  const handleToggleMedication = (id: string) => {
    setMedications((prev) => {
      const userMeds = prev[profile.id];
      const updated = userMeds.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: m.status === 'taken' ? 'pending' : 'taken' as 'pending' | 'taken',
          };
        }
        return m;
      });
      return { ...prev, [profile.id]: updated };
    });
  };

  // Add medication from scheduler
  const handleAddMedication = (newMed: Omit<Medication, 'id'>) => {
    setMedications((prev) => {
      const userMeds = prev[profile.id];
      const added: Medication = {
        ...newMed,
        id: Math.random().toString(36).substring(2, 9),
      };
      return {
        ...prev,
        [profile.id]: [...userMeds, added],
      };
    });
  };

  // Remove medication
  const handleRemoveMedication = (id: string) => {
    setMedications((prev) => {
      const filtered = prev[profile.id].filter((m) => m.id !== id);
      return {
        ...prev,
        [profile.id]: filtered,
      };
    });
  };

  // Toggle family cheers
  const handleToggleCheer = (id: string) => {
    setMoments((prev) =>
      prev.map((m) => {
        if (m.id === id) {
          const cheered = !m.cheeredByMe;
          return {
            ...m,
            cheeredByMe: cheered,
            cheerCount: cheered ? m.cheerCount + 1 : m.cheerCount - 1,
          };
        }
        return m;
      })
    );
  };

  // Add moment
  const handleAddMoment = (newMoment: Omit<FamilyMoment, 'id'>) => {
    const moment: FamilyMoment = {
      ...newMoment,
      id: Math.random().toString(36).substring(2, 9),
    };
    setMoments((prev) => [moment, ...prev]);
  };

  // Switch profiles (clicks avatar)
  const handleToggleProfile = () => {
    setProfileIndex((prev) => (prev === 0 ? 1 : 0));
  };

  // Call Express API to talk to Gemini
  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(2, 9),
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const currentHistory = chats[profile.id];
    const updatedHistory = [...currentHistory, userMsg];

    setChats((prev) => ({
      ...prev,
      [profile.id]: updatedHistory
    }));

    setChatLoading(true);

    try {
      // Map history to the Express backend expected structure
      const payload = updatedHistory.map((m) => ({
        role: m.role,
        content: m.content
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ messages: payload })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: data.text || "I was unable to synthesize a physiological output. Please try again.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        // Dynamically attach exercise card if they asked about tension, stretch, or back pain
        exercise: (text.toLowerCase().includes('tension') || text.toLowerCase().includes('stretch') || text.toLowerCase().includes('back')) 
          ? {
              title: "Cat-Cow Pose",
              duration: "2 mins",
              type: "Gentle Flow",
              imageUrl: STRETCH_IMG
            }
          : undefined
      };

      setChats((prev) => ({
        ...prev,
        [profile.id]: [...updatedHistory, aiMsg]
      }));
    } catch (err) {
      console.error(err);
      const errorMsg: ChatMessage = {
        id: Math.random().toString(36).substring(2, 9),
        role: 'assistant',
        content: "My connection to VitalSphere's core server was interrupted. Please ensure your Gemini API Key is configured correctly in Secrets.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setChats((prev) => ({
        ...prev,
        [profile.id]: [...updatedHistory, errorMsg]
      }));
    } finally {
      setChatLoading(false);
    }
  };

  const handleEnterChatWithPrompt = (prompt?: string) => {
    setActiveTab('ai');
    if (prompt) {
      handleSendMessage(prompt);
    }
  };

  return (
    <div 
      className="min-h-screen bg-[#020617] text-slate-100 transition-all duration-700 pb-32 relative overflow-hidden"
    >
      {/* Background Mesh Gradients (Pure CSS) */}
      {profile.theme === 'warm' ? (
        <>
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-amber-600/20 rounded-full blur-[120px] pointer-events-none transition-all duration-1000"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-[600px] h-[600px] bg-rose-500/10 rounded-full blur-[150px] pointer-events-none transition-all duration-1000"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-yellow-600/10 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"></div>
        </>
      ) : (
        <>
          <div className="absolute top-[-100px] left-[-100px] w-[500px] h-[500px] bg-indigo-600/25 rounded-full blur-[120px] pointer-events-none transition-all duration-1000"></div>
          <div className="absolute bottom-[-50px] right-[-50px] w-[600px] h-[600px] bg-emerald-500/15 rounded-full blur-[150px] pointer-events-none transition-all duration-1000"></div>
          <div className="absolute top-[20%] right-[10%] w-[300px] h-[300px] bg-purple-600/15 rounded-full blur-[100px] pointer-events-none transition-all duration-1000"></div>
        </>
      )}

      {/* Top Application Bar Header */}
      <header className="fixed top-0 w-full z-50 bg-white/5 backdrop-blur-xl border-b border-white/10 flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-3">
          {/* Tactile Profile Avatar Switcher */}
          <div 
            onClick={handleToggleProfile}
            className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20 shadow-sm cursor-pointer hover:scale-105 active:scale-95 transition-all group relative"
            title="Click to Switch User Profile"
          >
            <img className="w-full h-full object-cover" src={profile.avatarUrl} alt={profile.name} />
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <RefreshCw className="w-4 h-4 text-white animate-spin-slow" />
            </div>
          </div>
          <div className="flex flex-col text-left">
            <h1 className="text-base font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary leading-none">
              VitalSphere
            </h1>
            <span className="text-[10px] font-mono font-semibold tracking-wider text-slate-400 uppercase mt-0.5">
              Active: {profile.name}
            </span>
          </div>
        </div>

        {/* Floating Sparkle AI button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('ai')}
            className={`p-2 rounded-full transition-all duration-300 ${
              activeTab === 'ai' 
                ? 'bg-primary text-white scale-110 active-glow' 
                : 'text-primary/70 bg-white/5 border border-white/10 hover:bg-white/10'
            } cursor-pointer`}
            style={activeTab === 'ai' && profile.theme === 'warm' ? { backgroundColor: '#D97706' } : {}}
          >
            <Sparkles className="w-5 h-5 animate-pulse" />
          </button>
          
          <button 
            onClick={() => alert("Connecting to emergency health responder network... (Simulated Action)")}
            className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-full transition-all cursor-pointer border border-red-500/20"
            title="Emergency Health SOS Link"
          >
            <AlertTriangle className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Container Canvas */}
      <main className="pt-24 px-5 max-w-2xl mx-auto">
        {activeTab === 'wellness' && (
          <WellnessView
            profile={profile}
            medications={medications[profile.id]}
            onToggleMedication={handleToggleMedication}
            onEnterChat={handleEnterChatWithPrompt}
          />
        )}

        {activeTab === 'family' && (
          <FamilyView
            profile={profile}
            moments={moments}
            onAddMoment={handleAddMoment}
            onToggleCheer={handleToggleCheer}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsView
            profile={profile}
            onEnterChat={handleEnterChatWithPrompt}
          />
        )}

        {activeTab === 'schedule' && (
          <ScheduleView
            profile={profile}
            medications={medications[profile.id]}
            onAddMedication={handleAddMedication}
            onRemoveMedication={handleRemoveMedication}
          />
        )}

        {activeTab === 'ai' && (
          <AIAssistant
            profile={profile}
            messages={chats[profile.id]}
            onSendMessage={handleSendMessage}
            isLoading={chatLoading}
          />
        )}
      </main>

      {/* Bottom Floating Navigation Shell */}
      <nav 
        className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-40px)] max-w-md bg-white/5 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)] z-40 flex justify-around items-center p-3"
        style={profile.theme === 'warm' ? { 
          border: '1px solid rgba(251, 191, 36, 0.15)',
          boxShadow: '0 20px 50px rgba(251, 191, 36, 0.05)',
          backgroundColor: 'rgba(251, 191, 36, 0.05)'
        } : {}}
      >
        <button
          onClick={() => setActiveTab('wellness')}
          className={`flex flex-col items-center justify-center transition-transform hover:scale-115 active:scale-90 duration-300 cursor-pointer ${
            activeTab === 'wellness' 
              ? 'font-bold scale-110 active-glow' 
              : 'text-slate-400'
          }`}
          style={activeTab === 'wellness' ? { color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' } : {}}
        >
          <Heart className={`w-5 h-5 ${activeTab === 'wellness' ? 'fill-current' : ''}`} />
          <span className="font-mono text-[9px] mt-1 font-semibold tracking-wide uppercase">Wellness</span>
        </button>

        <button
          onClick={() => setActiveTab('family')}
          className={`flex flex-col items-center justify-center transition-transform hover:scale-115 active:scale-90 duration-300 cursor-pointer ${
            activeTab === 'family' 
              ? 'font-bold scale-110 active-glow' 
              : 'text-slate-400'
          }`}
          style={activeTab === 'family' ? { color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' } : {}}
        >
          <Users className="w-5 h-5" />
          <span className="font-mono text-[9px] mt-1 font-semibold tracking-wide uppercase">Family</span>
        </button>

        <button
          onClick={() => setActiveTab('schedule')}
          className={`flex flex-col items-center justify-center transition-transform hover:scale-115 active:scale-90 duration-300 cursor-pointer ${
            activeTab === 'schedule' 
              ? 'font-bold scale-110 active-glow' 
              : 'text-slate-400'
          }`}
          style={activeTab === 'schedule' ? { color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' } : {}}
        >
          <Calendar className="w-5 h-5" />
          <span className="font-mono text-[9px] mt-1 font-semibold tracking-wide uppercase">Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab('insights')}
          className={`flex flex-col items-center justify-center transition-transform hover:scale-115 active:scale-90 duration-300 cursor-pointer ${
            activeTab === 'insights' 
              ? 'font-bold scale-110 active-glow' 
              : 'text-slate-400'
          }`}
          style={activeTab === 'insights' ? { color: profile.theme === 'warm' ? '#F59E0B' : '#6366f1' } : {}}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-mono text-[9px] mt-1 font-semibold tracking-wide uppercase">Insights</span>
        </button>
      </nav>
    </div>
  );
}
