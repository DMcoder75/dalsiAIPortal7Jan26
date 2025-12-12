import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import logger from '../lib/logger';
import {
  Send, Plus, Menu, Settings, Bell, LogOut, Search, Trash2, Heart, Share2,
  Paperclip, Mic, Globe, Play, Image as ImageIcon, Download, Copy, ThumbsUp,
  ThumbsDown, MessageCircle, Zap, BookOpen, Code, Stethoscope, TrendingUp,
  Clock, AlertCircle, CheckCircle, Loader
} from 'lucide-react';

const ExperienceV2 = () => {
  const { user, logout } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [suggestedPrompts, setSuggestedPrompts] = useState([]);
  const [chatTemplates, setChatTemplates] = useState([]);
  const [quickActions, setQuickActions] = useState([]);
  const [userPreferences, setUserPreferences] = useState(null);
  const [selectedService, setSelectedService] = useState('chat');
  const [tokenCount, setTokenCount] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);

  // Service types
  const services = [
    { id: 'chat', name: 'Chat', icon: MessageCircle, color: 'text-blue-500' },
    { id: 'healthcare', name: 'Healthcare', icon: Stethoscope, color: 'text-red-500' },
    { id: 'edu', name: 'Education', icon: BookOpen, color: 'text-indigo-500' },
    { id: 'supercoder', name: 'Code', icon: Code, color: 'text-green-500' },
  ];

  // Load initial data
  useEffect(() => {
    if (user) {
      loadUserData();
    }
  }, [user]);

  const loadUserData = async () => {
    try {
      logger.info('📚 Loading user data for Experience page');
      
      // Load suggested prompts
      const { data: prompts } = await supabase.rpc('get_suggested_prompts', {
        p_category: null,
        p_service_type: selectedService,
        p_limit: 6
      });
      setSuggestedPrompts(prompts || []);
      logger.info(`✅ Loaded ${prompts?.length || 0} suggested prompts`);

      // Load chat templates
      const { data: templates } = await supabase.rpc('get_chat_templates', {
        p_category: null,
        p_service_type: selectedService,
        p_featured_only: false,
        p_limit: 5
      });
      setChatTemplates(templates || []);
      logger.info(`✅ Loaded ${templates?.length || 0} chat templates`);

      // Load quick actions
      const { data: actions } = await supabase.rpc('get_quick_actions', {
        p_min_plan_tier: null
      });
      setQuickActions(actions || []);
      logger.info(`✅ Loaded ${actions?.length || 0} quick actions`);

      // Load user preferences
      const { data: prefs } = await supabase.rpc('get_user_chat_preferences');
      if (prefs && prefs.length > 0) {
        setUserPreferences(prefs[0]);
        setSelectedService(prefs[0].default_service_type);
      }
      logger.info('✅ Loaded user preferences');

      // Load conversations
      loadConversations();
    } catch (error) {
      logger.error('❌ Error loading user data:', error);
    }
  };

  const loadConversations = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .eq('user_id', user.id)
        .order('last_activity_at', { ascending: false })
        .limit(20);

      if (error) throw error;
      setConversations(data || []);
      logger.info(`✅ Loaded ${data?.length || 0} conversations`);
    } catch (error) {
      logger.error('❌ Error loading conversations:', error);
    }
  };

  const startNewChat = async () => {
    try {
      logger.info('🆕 Starting new chat');
      const { data, error } = await supabase
        .from('chats')
        .insert([
          {
            user_id: user.id,
            title: 'New Conversation',
            service_type: selectedService,
            message_count: 0,
            tokens_used: 0,
          }
        ])
        .select()
        .single();

      if (error) throw error;
      setCurrentChat(data);
      setMessages([]);
      setTokenCount(0);
      loadConversations();
      logger.info('✅ New chat started:', data.id);
    } catch (error) {
      logger.error('❌ Error starting new chat:', error);
    }
  };

  const sendMessage = async (text = inputText) => {
    if (!text.trim() || !currentChat) {
      logger.warn('⚠️ Cannot send empty message or no chat selected');
      return;
    }

    try {
      setLoading(true);
      logger.info('📤 Sending message:', text.substring(0, 50));

      // Add user message to UI
      const userMessage = {
        id: Date.now(),
        chat_id: currentChat.id,
        role: 'user',
        content: text,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      // Call API to get AI response
      const response = await fetch(`${process.env.REACT_APP_API_URL}/dalsiai/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.id}`,
        },
        body: JSON.stringify({
          prompt: text,
          model: selectedService === 'supercoder' ? 'dalsi-ai-code' : 'dalsi-ai',
          service_type: selectedService,
          use_history: true,
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to get response');
      }

      // Add AI response to UI
      const aiMessage = {
        id: Date.now() + 1,
        chat_id: currentChat.id,
        role: 'assistant',
        content: data.response || data.text,
        tokens_used: data.tokens_used || 0,
        response_time_ms: data.response_time_ms || 0,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setTokenCount(prev => prev + (data.tokens_used || 0));

      // Track usage
      await supabase.rpc('track_prompt_usage', {
        p_event_type: 'completed',
        p_response_time_ms: data.response_time_ms || 0,
        p_success: true,
      });

      logger.info('✅ Message sent successfully');
    } catch (error) {
      logger.error('❌ Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        chat_id: currentChat.id,
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error.message}`,
        created_at: new Date().toISOString(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const useSuggestedPrompt = async (prompt) => {
    logger.info('💡 Using suggested prompt:', prompt.title);
    
    // Track usage
    await supabase.rpc('track_prompt_usage', {
      p_event_type: 'clicked',
      p_prompt_id: prompt.id,
    });

    if (!currentChat) {
      await startNewChat();
    }
    
    setInputText(prompt.prompt_text);
    setTimeout(() => {
      sendMessage(prompt.prompt_text);
    }, 100);
  };

  const useTemplate = async (template) => {
    logger.info('📋 Using template:', template.name);
    
    // Track usage
    await supabase.rpc('track_prompt_usage', {
      p_event_type: 'clicked',
      p_template_id: template.id,
    });

    if (!currentChat) {
      await startNewChat();
    }
    
    setInputText(template.initial_prompt);
  };

  const deleteConversation = async (chatId) => {
    try {
      logger.info('🗑️ Deleting conversation:', chatId);
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)
        .eq('user_id', user.id);

      if (error) throw error;
      
      if (currentChat?.id === chatId) {
        setCurrentChat(null);
        setMessages([]);
      }
      loadConversations();
      logger.info('✅ Conversation deleted');
    } catch (error) {
      logger.error('❌ Error deleting conversation:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-4">Please log in to continue</h1>
          <p className="text-gray-300">You need to be authenticated to use the chat experience.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* LEFT SIDEBAR - Conversations */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-slate-800/50 backdrop-blur border-r border-purple-500/20 flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-purple-500/20">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center font-bold">
              D
            </div>
            <span className="font-bold text-lg">DalSi</span>
          </div>
          <button
            onClick={startNewChat}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg py-2 px-4 font-medium transition-all"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Service Selector */}
        <div className="p-3 border-b border-purple-500/20">
          <p className="text-xs text-gray-400 mb-2 font-semibold">SERVICE</p>
          <div className="space-y-1">
            {services.map(service => {
              const Icon = service.icon;
              return (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-all ${
                    selectedService === service.id
                      ? 'bg-purple-600/40 border border-purple-500'
                      : 'hover:bg-slate-700/50'
                  }`}
                >
                  <Icon size={16} className={service.color} />
                  <span className="text-sm">{service.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          <p className="text-xs text-gray-400 font-semibold px-2">TODAY</p>
          {conversations.slice(0, 10).map(conv => (
            <div
              key={conv.id}
              onClick={() => setCurrentChat(conv)}
              className={`p-3 rounded-lg cursor-pointer transition-all group ${
                currentChat?.id === conv.id
                  ? 'bg-purple-600/40 border border-purple-500'
                  : 'hover:bg-slate-700/50'
              }`}
            >
              <p className="text-sm font-medium truncate">{conv.title}</p>
              <p className="text-xs text-gray-400 mt-1">{conv.message_count} messages</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteConversation(conv.id);
                }}
                className="opacity-0 group-hover:opacity-100 mt-2 text-red-400 hover:text-red-300 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* User Profile */}
        <div className="p-4 border-t border-purple-500/20 space-y-2">
          <div className="flex items-center gap-2 px-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-sm font-bold">
              {user.email?.[0].toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{user.email}</p>
              <p className="text-xs text-gray-400">Pro Plan</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 text-red-400 hover:text-red-300 py-2 transition-all"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* MAIN CHAT AREA */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="h-16 border-b border-purple-500/20 flex items-center justify-between px-6 bg-slate-800/30 backdrop-blur">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-slate-700/50 rounded-lg transition-all"
            >
              <Menu size={20} />
            </button>
            <div>
              <h1 className="font-bold text-lg">{currentChat?.title || 'Welcome to DalSi'}</h1>
              <p className="text-xs text-gray-400">{currentChat?.service_type || 'Select or start a conversation'}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-2 rounded-lg">
              <Zap size={16} className="text-yellow-400" />
              <span className="text-sm font-medium">{tokenCount} tokens</span>
            </div>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
              <Bell size={20} />
            </button>
            <button className="p-2 hover:bg-slate-700/50 rounded-lg transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        {/* Chat Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-6">
                <MessageCircle size={40} className="text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold mb-2">How can I help you today?</h2>
              <p className="text-gray-400 mb-8">Choose a mode or start typing your question</p>
              
              {/* Suggested Prompts Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl mb-8">
                {suggestedPrompts.slice(0, 4).map(prompt => {
                  const IconComponent = prompt.icon_name === 'Mail' ? MessageCircle :
                                       prompt.icon_name === 'Code' ? Code :
                                       prompt.icon_name === 'BarChart3' ? TrendingUp :
                                       MessageCircle;
                  return (
                    <button
                      key={prompt.id}
                      onClick={() => useSuggestedPrompt(prompt)}
                      className="p-4 bg-slate-700/50 hover:bg-slate-700 border border-purple-500/20 hover:border-purple-500/50 rounded-lg text-left transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        <IconComponent size={20} className={prompt.color_class || 'text-purple-400'} />
                        <div>
                          <p className="font-medium text-sm">{prompt.title}</p>
                          <p className="text-xs text-gray-400 mt-1">{prompt.description}</p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Templates */}
              {chatTemplates.length > 0 && (
                <div className="w-full max-w-2xl">
                  <p className="text-sm text-gray-400 mb-3 font-semibold">TEMPLATES</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {chatTemplates.slice(0, 4).map(template => (
                      <button
                        key={template.id}
                        onClick={() => useTemplate(template)}
                        className="p-3 bg-slate-700/30 hover:bg-slate-700/50 border border-purple-500/10 hover:border-purple-500/30 rounded-lg text-left transition-all"
                      >
                        <p className="font-medium text-sm">{template.name}</p>
                        <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xl px-4 py-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-purple-600/40 border border-purple-500/50'
                      : 'bg-slate-700/50 border border-slate-600/50'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{msg.content}</p>
                  {msg.tokens_used && (
                    <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      <Zap size={12} /> {msg.tokens_used} tokens
                    </p>
                  )}
                </div>
              </div>
            ))
          )}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-700/50 border border-slate-600/50 px-4 py-3 rounded-lg flex items-center gap-2">
                <Loader size={16} className="animate-spin" />
                <span className="text-sm">Thinking...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-purple-500/20 bg-slate-800/30 backdrop-blur p-6">
          {/* Quick Actions */}
          {quickActions.length > 0 && (
            <div className="flex gap-2 mb-4 pb-4 border-b border-purple-500/20">
              {quickActions.slice(0, 5).map(action => {
                const IconComponent = action.icon_name === 'Paperclip' ? Paperclip :
                                     action.icon_name === 'Mic' ? Mic :
                                     action.icon_name === 'Globe' ? Globe :
                                     action.icon_name === 'Play' ? Play :
                                     action.icon_name === 'Image' ? ImageIcon :
                                     Download;
                return (
                  <button
                    key={action.id}
                    title={action.name}
                    className="p-2 hover:bg-slate-700/50 rounded-lg transition-all text-gray-400 hover:text-white"
                  >
                    <IconComponent size={18} />
                  </button>
                );
              })}
            </div>
          )}

          {/* Input Box */}
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask anything... (Shift + Enter for new line)"
              className="flex-1 bg-slate-700/50 border border-purple-500/20 focus:border-purple-500/50 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-all"
            />
            <button
              onClick={() => sendMessage()}
              disabled={loading || !inputText.trim()}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 rounded-lg p-3 transition-all"
            >
              <Send size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SIDEBAR - Quick Actions & Analytics */}
      <div className={`${rightPanelOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-slate-800/50 backdrop-blur border-l border-purple-500/20 flex flex-col overflow-hidden`}>
        {/* Header */}
        <div className="p-4 border-b border-purple-500/20 flex items-center justify-between">
          <h3 className="font-bold">Quick Actions</h3>
          <button
            onClick={() => setRightPanelOpen(false)}
            className="p-1 hover:bg-slate-700/50 rounded transition-all"
          >
            ×
          </button>
        </div>

        {/* Templates Section */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-3">TEMPLATES</p>
            <div className="space-y-2">
              {chatTemplates.map(template => (
                <button
                  key={template.id}
                  onClick={() => useTemplate(template)}
                  className="w-full p-3 bg-slate-700/50 hover:bg-slate-700 border border-purple-500/20 rounded-lg text-left transition-all text-sm"
                >
                  <p className="font-medium">{template.name}</p>
                  <p className="text-xs text-gray-400 mt-1">{template.description}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          {currentChat && (
            <div className="p-3 bg-slate-700/50 border border-purple-500/20 rounded-lg">
              <p className="text-xs text-gray-400 font-semibold mb-3">CONVERSATION STATS</p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Messages</span>
                  <span className="font-medium">{currentChat.message_count}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Tokens Used</span>
                  <span className="font-medium">{currentChat.tokens_used}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Duration</span>
                  <span className="font-medium">{currentChat.duration_seconds || 0}s</span>
                </div>
              </div>
            </div>
          )}

          {/* Trending Prompts */}
          <div>
            <p className="text-xs text-gray-400 font-semibold mb-3">TRENDING</p>
            <div className="space-y-2">
              {suggestedPrompts.slice(0, 3).map(prompt => (
                <button
                  key={prompt.id}
                  onClick={() => useSuggestedPrompt(prompt)}
                  className="w-full p-2 bg-slate-700/30 hover:bg-slate-700/50 border border-purple-500/10 rounded text-left transition-all text-xs"
                >
                  <p className="font-medium truncate">{prompt.title}</p>
                  <p className="text-gray-400 mt-1 flex items-center gap-1">
                    <TrendingUp size={12} /> {prompt.usage_count || 0} uses
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-purple-500/20 text-xs text-gray-400">
          <p>💡 Tip: Use templates to get started faster</p>
        </div>
      </div>
    </div>
  );
};

export default ExperienceV2;
