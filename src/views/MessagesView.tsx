import React, { useState } from 'react';
import { Send, MapPin, Calendar, Clock, Paperclip, CheckCheck } from 'lucide-react';
import { ChatThread, ChatMessage } from '../types';

interface MessagesViewProps {
  threads: ChatThread[];
  activeThreadId?: string;
  onSendMessage: (threadId: string, text: string) => void;
  onBookSessionWithUser?: (userId: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  threads,
  activeThreadId,
  onSendMessage,
  onBookSessionWithUser,
}) => {
  const [selectedThreadId, setSelectedThreadId] = useState<string>(activeThreadId || threads[0]?.id || '');
  const [inputText, setInputText] = useState('');

  const currentThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !currentThread) return;
    onSendMessage(currentThread.id, inputText.trim());
    setInputText('');
  };

  return (
    <div className="pt-24 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <span className="text-xs font-mono tracking-widest text-cyan-400 uppercase">
          Direct Communications
        </span>
        <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight uppercase mt-1">
          MESSAGES
        </h1>
      </div>

      <div className="arena-card rounded-3xl border border-white/10 overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Thread List */}
        <div className="md:col-span-4 border-r border-white/10 bg-black/40 flex flex-col">
          <div className="p-4 border-b border-white/10 text-xs font-mono text-slate-400">
            Active Chats ({threads.length})
          </div>

          <div className="divide-y divide-white/[0.04] overflow-y-auto flex-1">
            {threads.map(thread => (
              <button
                key={thread.id}
                onClick={() => setSelectedThreadId(thread.id)}
                className={`w-full p-4 flex items-start gap-3 text-left transition-colors cursor-pointer ${
                  selectedThreadId === thread.id
                    ? 'bg-cyan-500/10 border-l-2 border-cyan-400'
                    : 'hover:bg-white/[0.03]'
                }`}
              >
                <img
                  src={thread.userAvatar}
                  alt={thread.userName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white truncate">{thread.userName}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{thread.lastMessageTime}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 truncate">{thread.userSkill}</div>
                  <p className="text-xs text-slate-400 mt-1 truncate">
                    {thread.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Active Chat Panel */}
        {currentThread ? (
          <div className="md:col-span-8 flex flex-col bg-[#0B0E17]/60">
            {/* Chat Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={currentThread.userAvatar}
                  alt={currentThread.userName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-white/10"
                />
                <div>
                  <div className="text-sm font-bold text-white">{currentThread.userName}</div>
                  <div className="text-xs text-cyan-400">{currentThread.userSkill} · Pune</div>
                </div>
              </div>

              {onBookSessionWithUser && (
                <button
                  onClick={() => onBookSessionWithUser(currentThread.userId)}
                  className="px-3.5 py-1.5 rounded-lg bg-cyan-500 text-black text-xs font-bold uppercase tracking-wider hover:bg-cyan-400 transition-colors"
                >
                  Book Session
                </button>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
              {currentThread.messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.isSelf ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-md p-3.5 rounded-2xl text-xs leading-relaxed ${
                      msg.isSelf
                        ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-br-xs'
                        : 'bg-white/[0.07] text-slate-200 border border-white/10 rounded-bl-xs'
                    }`}
                  >
                    <p>{msg.text}</p>

                    {/* Booking Card Attachment if present */}
                    {msg.bookingCard && (
                      <div className="mt-3 p-3 rounded-xl bg-black/40 border border-white/10 text-left space-y-1 text-[11px] font-mono text-cyan-200">
                        <div className="font-bold text-white uppercase text-xs">{msg.bookingCard.skill}</div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{msg.bookingCard.date} ({msg.bookingCard.time})</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-slate-300">
                          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                          <span>{msg.bookingCard.venue}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 px-1">
                    {msg.timestamp}
                  </span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form onSubmit={handleSend} className="p-3.5 border-t border-white/10 bg-black/40 flex items-center gap-2">
              <input
                type="text"
                placeholder={`Message ${currentThread.userName}...`}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
                className="flex-1 bg-white/[0.04] text-white text-xs rounded-xl px-4 py-3 border border-white/10 focus:outline-none focus:border-cyan-400 placeholder-slate-500"
              />
              <button
                type="submit"
                className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black transition-colors shrink-0"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="md:col-span-8 flex items-center justify-center text-slate-500 text-xs">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};
