import React, { useState, useRef, useEffect } from 'react';
import './Popupchatbot.css';

const PopupChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      content: 'Hi! 👋 Need help finding the perfect product? I can help you decide!',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const chatboxRef = useRef(null);
  const botResponseRef = useRef('');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = {
      id: messages.length + 1,
      sender: 'user',
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    botResponseRef.current = '';

    try {
      const formattedMessages = messages
        .filter((m) => m.id !== 1)
        .map((m) => ({
          role: m.sender === 'user' ? 'user' : 'assistant',
          content: m.content,
        }));

      formattedMessages.push({
        role: 'user',
        content: inputValue,
      });

      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';
      const response = await fetch(`${API_URL}/api/chatbot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: formattedMessages }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      const botMessageId = messages.length + 2;

      setMessages((prev) => [
        ...prev,
        {
          id: botMessageId,
          sender: 'bot',
          content: '',
          timestamp: new Date(),
          isStreaming: true,
        },
      ]);

      const processStream = async () => {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const text = decoder.decode(value);
          const lines = text.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') continue;

              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  botResponseRef.current += parsed.content;

                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === botMessageId
                        ? { ...m, content: botResponseRef.current }
                        : m
                    )
                  );
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }

        setMessages((prev) =>
          prev.map((m) =>
            m.id === botMessageId ? { ...m, isStreaming: false } : m
          )
        );
      };

      await processStream();
    } catch (error) {
      console.error('Chatbot Error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: messages.length + 2,
          sender: 'bot',
          content: '❌ Sorry, I encountered an error. Please make sure the backend server is running on port 5000.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className="floating-chat-button"
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Close chat' : 'Open chat'}
      >
        {isOpen ? '✕' : '💬'}
      </button>

      {/* Chat Popup */}
      {isOpen && (
        <div className="chatbot-popup" ref={chatboxRef}>
          {/* Header */}
          <div className="popup-header">
            <div className="header-content">
              <h3>Shopping Assistant 🛍️</h3>
              <p>Get personalized recommendations</p>
            </div>
            <button
              className="close-btn"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="popup-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message ${message.sender} ${message.isStreaming ? 'streaming' : ''}`}
              >
                <div className="message-content">
                  {message.content}
                  {message.isStreaming && <span className="typing-indicator">▌</span>}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Form */}
          <form onSubmit={handleSendMessage} className="popup-input-form">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask me anything..."
              disabled={isLoading}
              className="popup-input"
            />
            <button
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className="popup-send-btn"
              aria-label="Send message"
            >
              {isLoading ? '⏳' : '➤'}
            </button>
          </form>
        </div>
      )}
    </>
  );
};

export default PopupChatbot;