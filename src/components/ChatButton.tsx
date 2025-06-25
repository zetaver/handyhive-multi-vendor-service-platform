import React from 'react';
import { MessageSquare } from 'lucide-react';

interface ChatButtonProps {
  onClick: () => void;
  unreadCount?: number;
}

export function ChatButton({ onClick, unreadCount }: ChatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      <MessageSquare className="h-5 w-5 mr-2" />
      Chat with Provider
      {unreadCount && unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {unreadCount}
        </span>
      )}
    </button>
  );
}