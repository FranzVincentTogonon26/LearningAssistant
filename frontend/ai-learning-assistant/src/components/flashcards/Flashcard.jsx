import React, { useState } from 'react'
import { RotateCcw, Star } from 'lucide-react';

const Flashcard = ({ flashcard }) => {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
      setIsFlipped(!isFlipped);
  }
  const difficultyColor = {
    easy: 'from-emerald-400 to-teal-500 shadow-blue-500/25',
    medium: 'from-blue-400 to-cyan-500 shadow-purple-500/25',
    hard: 'from-purple-400 to-pink-500 shadow-emerald-500/25',
  };

  return (
    <div className="relative w-full h-72" style={{ perspective: '1000px' }}>
      <div 
        className='relative w-full h-full transition-transform duration-500 transform-gpu cursor-pointer'
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
        onClick={handleFlip}
      >
        {/* Front of the card (Question) */}
        <div 
          className='absolute inset-0 w-full h-full bg-white/80 backdrop-blur-xl border-2 border-slate-200/60 rounded-2xl shadow-xl shadow-slate-200/50 p-8 flex flex-col justify-between'
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden'
          }}
        >
          

          {/* Question Content */}
          <div className="flex-1 flex items-center justify-center px-4 py-6">
              <p className="text-lg font-semibold text-slate-900 text-center leading-relaxed">{flashcard.question}</p>
          </div>
          <div className="flex items-start justify-center py-3">
            <div className={`flex items-center gap-1.5 px-2 py-1.5 bg-linear-to-br ${ difficultyColor[flashcard?.difficulty] || '' } shadow-sm rounded-sm uppercase`}>
              <span className="text-xs font-semibold text-white" >{flashcard?.difficulty}</span>
            </div>
          </div>
          {/* Flip Indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-slate-400 font-medium">
            <RotateCcw className='w-3.5 h-3.5' strokeWidth={2} />
            <span>Click to revel answer</span>
          </div>

        </div>
        
        {/* Back of the card ( Answer ) */}
        <div 
          className="absolute inset-0 w-full h-full bg-linear-to-br from-emerald-500 to-teal-500 border-2 border-emerald-400/60 rounded-2xl shadow-xl shadow-emerald-500/30 p-8 flex flex-col justify-between"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            height: '370px'
          }}
        >
          {/* Answer Content */}
          <div className="flex-1 flex items-center justify-center px-4 py-6">
            <p className="text-base text-white text-center leading-relaxed font-medium">{flashcard.answer}</p>
          </div>
          {/* Flip Indicator */}
          <div className="flex items-center justify-center gap-2 text-xs text-white/70 font-medium">
            <RotateCcw className='w-3.5 h-3.5' strokeWidth={2} />
            <span>Click to see question</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Flashcard