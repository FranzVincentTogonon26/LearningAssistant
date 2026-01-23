import React, { useEffect, useRef, useState } from 'react'
import { MessageSquare, Send } from 'lucide-react'
import { useParams } from 'react-router-dom'
import aiService from '../../services/aiService'
import { useAuth } from '../../context/AuthContext'
import Spinner from '../common/Spinner'
import MarkdownRenderer from '../common/MarkdownRenderer'

const ChatInterface = () => {

    const { id: documentId } = useParams();
    const [history, setHistory] = useState([]);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const messageEndRef = useRef(null);

    const scrollToBottom = () => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {

        const fetchChatHistory = async () => {
            try {
                setInitialLoading(true);
                const response = await aiService.getChatHistory(documentId);
                setHistory(response.data);
            } catch (error) {
                console.error('Failed to fetch chat history:', error);
            } finally {
                setInitialLoading(false);
            }
        };

        fetchChatHistory();

    }, [documentId]);

    useEffect(() => {
        scrollToBottom();
    }, [history]);

    const handleSendMessage = async (e) => {

        e.preventDefault();

        if(!message.trim()) return;

        const userMessage = { role: 'user', content: message, timestamp: new Date() };

        setHistory( prev => [...prev, userMessage] );
        setMessage('');
        setLoading(true);

        try {

            const response = await aiService.chat(documentId, userMessage.content);
            const assistantMessage = {
                role: 'assistant',
                content: response.data.answer,
                timestamp: new Date(),
                relevantChunks: response.data.relevantChunks
            };

            setHistory(prev => [...prev, assistantMessage]);

        } catch (error) {
            console.error('Chat error:', error);
            const errorMessage = {
                role: 'assistant',
                content: 'Sorry, I encountered an error. Please try again.',
                timestamp: new Date()
            };

            setHistory(prev => [...prev, errorMessage]);

        } finally {
            setLoading(false);
        }

    };

    const renderMessage = (msg, index) => {
        return 'renderMessage'
    }

    if(true){
        return (
            <div className="flex flex-col h-[70vh] bg-white/80 backdrop-blur-xl border border-slate-200/60 rounded-2xl items-center justify-center shadow-slate-200/">
                <div className="rounded-2xl bg-linear-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                    <MessageSquare className='' strokeWidth={2} />
                </div>
                <Spinner />
                <p className="">Loading chat history...</p>
            </div>
        )
    }
 
  return (
    <div>ChatInterface</div>
  )
}

export default ChatInterface