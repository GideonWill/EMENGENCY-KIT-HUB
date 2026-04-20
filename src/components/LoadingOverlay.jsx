import React from 'react'
import { LOGO_SRC } from '../config/brand'

export default function LoadingOverlay({ message = 'Signing in...' }) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white/90 backdrop-blur-md transition-opacity duration-300">
      <div className="flex flex-col items-center">
        <div className="relative h-24 w-24">
          {/* Outer rotating ring */}
          <div className="absolute inset-0 rounded-full border-4 border-slate-100 border-t-brand-600 animate-spin" />
          
          {/* Inner pulsing logo container */}
          <div className="absolute inset-0 flex items-center justify-center p-4 animate-pulse">
            <img src={LOGO_SRC} alt="" className="h-full w-full object-contain" />
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <p className="font-display text-xl font-medium tracking-tight text-slate-900">{message}</p>
          <div className="mt-3 flex justify-center gap-1.5">
            <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:-0.3s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce [animation-delay:-0.15s]" />
            <div className="h-1.5 w-1.5 rounded-full bg-brand-600 animate-bounce" />
          </div>
        </div>
      </div>
    </div>
  )
}
