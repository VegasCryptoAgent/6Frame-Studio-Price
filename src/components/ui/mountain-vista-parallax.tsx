import React, { useMemo } from 'react';
import { X } from 'lucide-react';

// Data Configuration
const layersData = [
  { className: 'layer-6', speed: '120s', size: '222px', zIndex: 1, image: '6' },
  { className: 'layer-5', speed: '95s',  size: '311px', zIndex: 1, image: '5' },
  { className: 'layer-4', speed: '75s',  size: '468px', zIndex: 1, image: '4' },
  { className: 'bike-1',  speed: '10s',  size: '75px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '100px', noRepeat: true },
  { className: 'bike-2',  speed: '15s',  size: '75px',  zIndex: 2, image: 'bike', animation: 'parallax_bike', bottom: '100px', noRepeat: true },
  { className: 'layer-3', speed: '55s',  size: '158px', zIndex: 3, image: '3' },
  { className: 'layer-2', speed: '30s',  size: '145px', zIndex: 4, image: '2' },
  { className: 'layer-1', speed: '20s',  size: '136px', zIndex: 5, image: '1' },
];

interface MountainVistaParallaxProps {
  title?: string;
  subtitle?: string;
  onAbort?: () => void;
  onInitiate?: () => void;
}

const MountainVistaParallax = ({ title = '', subtitle = '', onAbort, onInitiate }: MountainVistaParallaxProps) => {
  // Generate dynamic CSS for each layer + base styles
  const dynamicStyles = useMemo(() => {
    const layerStyles = layersData
      .map(layer => {
        const url = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/24650/${layer.image}.png`;
        return `
          .${layer.className} {
            background-image: url(${url});
            animation-duration: ${layer.speed};
            background-size: auto ${layer.size};
            z-index: ${layer.zIndex};
            ${layer.animation ? `animation-name: ${layer.animation};` : 'animation-name: parallax;'}
            ${layer.bottom ? `bottom: ${layer.bottom};` : ''}
            ${layer.noRepeat ? 'background-repeat: no-repeat;' : ''}
          }
        `;
      })
      .join('\n');

    return `
      .hero-container {
        height: 100vh;
        width: 100%;
        background-color: transparent;
        position: relative;
        overflow: hidden;
      }

      .parallax-layer {
        position: absolute;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background-repeat: repeat-x;
        background-position: 0 100%;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
      }

      .hero-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10;
        text-align: center;
        pointer-events: none;
        width: 100%;
        padding: 0 24px;
      }

      @keyframes parallax {
        from { background-position: 0 100%; }
        to { background-position: -2000px 100%; }
      }

      @keyframes parallax_bike {
        from { background-position: -50% 100%; }
        to { background-position: 150% 100%; }
      }
      
      ${layerStyles}
    `;
  }, []);

  return (
    <section
      className="hero-container"
      aria-label="An animated parallax landscape of mountains and cyclists."
    >
      <style>{dynamicStyles}</style>

      {/* Render each parallax layer */}
      {layersData.map(layer => (
        <div
          key={layer.className}
          className={`parallax-layer ${layer.className}`}
        />
      ))}

      {/* Abort Button Overlay */}
      {onAbort && (
        <div className="absolute top-8 left-8 z-[100] pointer-events-auto">
          <button 
            onClick={onAbort}
            className="text-[10px] font-black uppercase tracking-[0.4rem] text-white/80 hover:text-white flex items-center gap-2 group transition-all"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" /> [ Close_Terminal ]
          </button>
        </div>
      )}

      {/* Hero text */}
      <div className="hero-content">
        <h1 
          onClick={onAbort}
          className="text-4xl md:text-7xl lg:text-[12rem] italic font-black tracking-tighter cursor-pointer hover:text-brand-accent transition-all duration-500 leading-none pointer-events-auto text-white break-words" 
          style={{ textShadow: "0 0 40px rgba(0,0,0,0.8)" }}
        >
          {title}
        </h1>
        <p 
          onClick={onAbort}
          className="max-w-2xl mx-auto mt-4 md:mt-6 text-lg md:text-xl lg:text-2xl font-bold text-white/90 uppercase tracking-[0.2em] leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,1)] cursor-pointer hover:text-brand-accent transition-all duration-500 pointer-events-auto"
        >
          {subtitle}
        </p>

        {onInitiate && (
          <div className="mt-8 md:mt-12 pointer-events-auto">
            <button 
              onClick={onInitiate}
              className="px-8 md:px-16 py-4 md:py-8 bg-transparent border border-white/20 backdrop-blur-xl text-white rounded-full font-black text-[10px] md:text-[12px] tracking-[0.4rem] uppercase hover:bg-white hover:text-black hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              Initiate Transmission
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default React.memo(MountainVistaParallax);
