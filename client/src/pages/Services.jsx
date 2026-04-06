import React from 'react';

const Services = () => {
  return (
    <div className="relative w-full min-h-screen flex items-center justify-center p-4 md:p-10 font-sans overflow-hidden">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://i.pinimg.com/736x/b3/65/db/b365db3d209ff954d15721deef485e68.jpg" 
          alt="Architectural background" 
          className="w-full h-full object-cover  brightness-75"
        />
        {/* Teal overlay to match the image vibe */}
        <div className="absolute inset-0 bg-teal-500/20 mix-blend-multiply"></div>
      </div>

      {/* Main Poster Container */}
      <div className="relative z-10 w-full max-w-6xl aspect-[4/3] md:aspect-[16/10] bg-[#f8f7f2] shadow-2xl p-6 md:p-12 flex flex-col justify-between items-stretch">
        
        {/* Top Navigation Row */}
        <div className="flex justify-between items-start text-[10px] md:text-xs uppercase tracking-tighter font-bold">
          <div className="flex flex-col">
            <span>Hipotesi®</span>
          </div>
          <div className="flex gap-4">
            <span className="hover:line-through cursor-pointer">[index, about, careers]</span>
          </div>
          <div className="text-right">
            <span>Copenhagen Den. 19:04pm**</span>
          </div>
        </div>

        {/* Hero Title - The "Statement" Piece */}
        <div className="flex-1 flex items-center justify-center">
          <h1 className="text-[18vw] md:text-[15rem] font-black leading-[0.8] tracking-tighter text-black uppercase text-center select-none">
            Let's Talk
          </h1>
        </div>

        {/* Small Image Accents (Middle Row) */}
        <div className="absolute top-1/2 w-full left-0 px-6 md:px-12 flex justify-between pointer-events-none">
           <div className="w-12 h-8 bg-gray-300 overflow-hidden grayscale">
             <img src="https://i.pinimg.com/originals/a0/44/f0/a044f0d638deba9e4e072270caf1d120.gif" alt="accent" className="w-full h-full object-cover" />
           </div>
           <div className="w-12 h-8 bg-teal-800 overflow-hidden">
             <img src="https://i.pinimg.com/originals/5a/c5/20/5ac520423570173baad7b2b2e7b242b2.gif" alt="accent" className="w-full h-full object-cover" />
           </div>
        </div>

        {/* Bottom Footer Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 items-end gap-4 text-[9px] md:text-[11px] leading-tight uppercase tracking-tighter">
          <div className="max-w-[180px]">
            <p className="font-bold mb-1">Hipotesi®</p>
            <p className="text-gray-500">
              We are an award-winning design studio with a focus on Web3 and digital interactive experiences.
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-start">
            <a href="#" className="hover:underline">Instagram</a>
            <a href="#" className="hover:underline">Dribbble</a>
          </div>

          <div className="flex flex-col items-center md:items-start">
            <span className="font-bold">Contacts</span>
            <span>Copenhagen, DK</span>
          </div>

          <div className="text-right">
            <p>All Rights Reserved</p>
            <p>©2023</p>
          </div>
        </div>
        
        {/* Aesthetic Corner Markers */}
        <div className="absolute top-4 left-4 w-2 h-2 border-l border-t border-gray-400"></div>
        <div className="absolute top-4 right-4 w-2 h-2 border-r border-t border-gray-400"></div>
        <div className="absolute bottom-4 left-4 w-2 h-2 border-l border-b border-gray-400"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 border-r border-b border-gray-400"></div>
      </div>
    </div>
  );
};

export default Services;