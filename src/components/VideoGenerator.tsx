import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Play, Loader2, Video, Sparkles } from 'lucide-react';

export function VideoGenerator({ promptPlaceholder = "Una excavadora trabajando en una mina..." }: { promptPlaceholder?: string }) {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    setIsGenerating(true);
    
    // Simulate generation for prototype or call API
    try {
        const response = await fetch('/api/generate-video', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ prompt })
        });
        const data = await response.json();
        
        // In a real implementation, we would wait for the operation to complete.
        // Here we will simulate a delay and then show a placeholder or the result if available.
        // Since Veo generation takes time, we'll simulate the "request sent" state.
        
        setTimeout(() => {
            setIsGenerating(false);
            // Placeholder video for demo purposes since we can't easily wait minutes in a demo flow
            setVideoUrl("https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"); 
        }, 3000);

    } catch (e) {
        console.error(e);
        setIsGenerating(false);
    }
  };

  return (
    <div className="bg-dark-900 rounded-sm border border-dark-800 overflow-hidden relative group">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent"></div>
      
      <div className="p-6 border-b border-dark-800 flex justify-between items-center bg-dark-950/50">
        <div className="flex items-center gap-3">
            <div className="bg-primary/10 p-2 rounded-sm border border-primary/20">
              <Video className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Simulador Veo AI</h3>
              <p className="text-gray-500 text-xs font-mono">Generación de Video en Tiempo Real</p>
            </div>
        </div>
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
      </div>
      
      <div className="p-6 space-y-4">
        {!videoUrl ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={promptPlaceholder}
                className="w-full bg-dark-950 border border-dark-700 rounded-sm p-4 text-white text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:outline-none min-h-[120px] font-mono"
              />
              <div className="absolute bottom-3 right-3 text-[10px] text-gray-600 font-mono uppercase">
                AI Prompt Input
              </div>
            </div>
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="w-full bg-primary text-dark-950 font-bold py-3 rounded-sm hover:bg-primary-hover transition-all disabled:opacity-50 flex items-center justify-center gap-2 uppercase tracking-wide text-sm shadow-[0_0_15px_rgba(255,193,7,0.2)] hover:shadow-[0_0_20px_rgba(255,193,7,0.4)]"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Procesando Simulación...
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Generar Demo
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-sm overflow-hidden border border-dark-700 shadow-2xl">
              <video 
                src={videoUrl} 
                controls 
                className="w-full h-full object-cover"
                autoPlay
                muted
              />
              <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase animate-pulse">
                Live Preview
              </div>
            </div>
            <button
              onClick={() => setVideoUrl(null)}
              className="text-xs text-gray-500 hover:text-primary transition-colors font-mono uppercase tracking-wider flex items-center gap-2"
            >
              <span className="text-lg">↺</span> Reiniciar Simulación
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
