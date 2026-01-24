import React, { useState } from 'react'
import { RotateCcw, Star } from 'lucide-react';

const Flashcard = ({ flashcard }) => {

  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
      setIsFlipped(!isFlipped);
  }
  const difficultyColor = {
    easy: 'text-amber-600',
    medium: 'text-blue-600',
    hard: 'text-red-500',
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
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-purple-50 rounded-lg uppercase">
              <span className={`text-sm font-semibold ${ difficultyColor[flashcard?.difficulty] || '' } `}>{flashcard?.difficulty}</span>
            </div>
          </div>

          {/* Question Content */}
          <div className="flex-1 flex items-center justify-center px-4 py-6">
              <p className="text-lg font-semibold text-slate-900 text-center leading-relaxed">{flashcard.question}</p>
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
            transform: 'rotateY(180deg)'
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