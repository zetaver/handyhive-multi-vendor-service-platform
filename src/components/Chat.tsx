import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { format } from 'date-fns';
import { Send, Image, Paperclip, Smile, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface ChatProps {
  bookingId: string;
  currentUserId: string;
  recipientId: string;
  recipientName: string;
  recipientImage: string;
  onClose?: () => void;
}

export function Chat({ 
  bookingId, 
  currentUserId, 
  recipientId, 
  recipientName, 
  recipientImage,
  onClose 
}: ChatProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    const newSocket = io('http://localhost:5000', {
      query: { userId: currentUserId, bookingId }
    });

    setSocket(newSocket);

    // Load previous messages
    // This would typically come from your API
    const loadMessages = async () => {
      // Simulated messages for demo
      setMessages([
        {
          id: '1',
          senderId: currentUserId,
          text: 'Hi, I'll be there in 10 minutes',
          timestamp: new Date(Date.now() - 3600000),
          status: 'read'
        },
        {
          id: '2',
          senderId: recipientId,
          text: 'Okay, I'll be waiting. Please call when you reach.',
          timestamp: new Date(Date.now() - 3000000),
          status: 'read'
        }
      ]);
    };

    loadMessages();

    // Socket event listeners
    newSocket.on('message', (message: Message) => {
      setMessages(prev => [...prev, message]);
    });

    newSocket.on('typing', (userId: string) => {
      if (userId === recipientId) {
        setIsTyping(true);
        setTimeout(() => setIsTyping(false), 3000);
      }
    });

    return () => {
      newSocket.close();
    };
  }, [bookingId, currentUserId, recipientId]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!newMessage.trim() || !socket) return;

    const message: Message = {
      id: Date.now().toString(),
      senderId: currentUserId,
      text: newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    socket.emit('message', {
      bookingId,
      message
    });

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const handleTyping = () => {
    socket?.emit('typing', {
      bookingId,
      userId: currentUserId
    });
  };

  const getMessageStatus = (status: Message['status']) => {
    switch (status) {
      case 'sent':
        return <Check className="h-4 w-4 text-gray-400" />;
      case 'delivered':
        return <CheckCheck className="h-4 w-4 text-gray-400" />;
      case 'read':
        return <CheckCheck className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <img
            src={recipientImage}
            alt={recipientName}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-medium text-gray-900">{recipientName}</h3>
            {isTyping ? (
              <p className="text-sm text-gray-500">typing...</p>
            ) : (
              <p className="text-sm text-green-500">Online</p>
            )}
          </div>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <span className="sr-only">Close chat</span>
            <svg className="h-5 w-5 text-gray-500" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        )}
      </div>

      {/* Messages */}
      <div 
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4"
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === currentUserId ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[70%] rounded-lg px-4 py-2 ${
                message.senderId === currentUserId
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 text-gray-900'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <div className="flex items-center justify-end mt-1 space-x-1">
                <span className="text-xs opacity-75">
                  {format(message.timestamp, 'HH:mm')}
                </span>
                {message.senderId === currentUserId && (
                  getMessageStatus(message.status)
                )}
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Smile className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Paperclip className="h-5 w-5 text-gray-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Image className="h-5 w-5 text-gray-500" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
              handleTyping();
            }}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!newMessage.trim()}
            className="p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}