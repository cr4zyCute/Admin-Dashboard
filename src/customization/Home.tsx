import React from 'react';
import ThemeCustomizer from './settings/ThemeCustomizer';
import { Palette, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 rounded-3xl p-8 md:p-12 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium mb-4 border border-white/20">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span>Theme Studio</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Choose from 25+ Premium Themes
          </h1>
          <p className="text-primary-100 text-lg md:text-xl leading-relaxed">
            Explore our diverse collection of layout styles. From Minimal to Neo, find the perfect look for your dashboard.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 h-full w-1/3 bg-white/5 skew-x-12 transform translate-x-20"></div>
        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary-500/30 rounded-full blur-3xl"></div>
        <Palette className="absolute right-12 bottom-12 w-32 h-32 text-white/10 rotate-12" />
      </div>

      {/* Main Customizer Content */}
      <ThemeCustomizer />
    </div>
  );
}