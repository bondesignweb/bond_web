import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function BlogFloralWallcoveringsLaurelCreek() {
  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2025/10/4-1.png"
          alt="The Floral Wallcoverings Of Laurel Creek"
          className="w-full h-full object-cover"
        />
      </section>

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-6 md:px-16 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-4">
            Cool Designers Don't Gatekeep | Design
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D3D3D] tracking-wide mb-4">
            The Floral Wallcoverings Of Laurel Creek
          </h1>
          <p className="text-[#6B6B6B] text-sm mb-12">October 20, 2025</p>

          <div className="prose prose-lg max-w-none text-[#3D3D3D] space-y-8">
            <p className="text-lg leading-relaxed">
              Each bedroom at Laurel Creek has its own vibe. Some feel calm and airy, others moody and dramatic, but they all speak the same language of florals and botanicals. The wallpapers connect the spaces in a way that feels natural, like each room is part of a bigger story. It's a mix of personalities that still feels perfectly cohesive.
            </p>
            <p className="leading-relaxed">
              In this post, we're sharing a closer look at the wallcoverings that bring it all together.
            </p>

            <blockquote className="border-l-4 border-[#8B7355] pl-6 my-12 italic text-xl text-[#3D3D3D]">
              "We wrapped every bedroom in a floral or botanical wallpaper. Each space has its own mood and personality, but the thread of botanicals ties the whole home together."
              <footer className="text-sm mt-2 not-italic">— Laura Kramer, Designer</footer>
            </blockquote>

            {/* Countryside Morning */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Countryside Morning</h2>
              <p className="leading-relaxed mb-6">
                We wanted this room to feel exactly like the wallpaper describes, mornings in the countryside. It's calm and grounding, but still carries a quiet sense of elegance. The pattern adds a softness that makes the space feel instantly peaceful, like the start of a slow, beautiful day.
              </p>
              <p className="text-sm text-[#6B6B6B] mb-6">
                Schumacher | Countryside Morning | Green
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/31.jpg" alt="Countryside Morning" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/1-2.png" alt="Countryside Morning" className="w-full" />
              </div>
            </div>

            {/* de Gournay */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Wallpaper Art Gallery</h2>
              <p className="leading-relaxed mb-6">
                This wallcovering features a soft metallic background with hand-painted chinoiserie layered over top. We wanted the primary bedroom to feel calm and serene, and this design struck the perfect balance. The metallic base keeps things neutral while adding just the right touch of glam. Since each panel is truly a hand-painted piece of art, we chose to frame them within the wall moulding to create a subtle gallery effect in this restful space.
              </p>
              <p className="text-sm text-[#6B6B6B] mb-6">
                de Gournay | Portobello | Standard Colorway
              </p>
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/4-2.png" alt="de Gournay Portobello" className="w-full" />
            </div>

            {/* Moody Menswear */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Moody Menswear</h2>
              <p className="leading-relaxed mb-6">
                This Ralph Lauren inspired guest bedroom is all about layers, with classic plaids, deep colors, and a moody botanical wallcovering that ties everything together. We wanted the space to feel a little more masculine, so we chose a botanical print instead of a floral one. If you look closely, the twilight background has a subtle herringbone texture, a quiet nod to menswear tailoring that gives the room its polished, refined feel.
              </p>
              <p className="text-sm text-[#6B6B6B] mb-6">
                Romo | Chiya | Twilight
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/5-1.png" alt="Chiya Twilight" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/2-2.png" alt="Chiya Twilight" className="w-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Post Navigation */}
        <div className="mt-16 pt-8 border-t border-[#D1CCC4]">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <Link 
              to={createPageUrl('Journal')}
              className="text-[#3D3D3D] hover:text-[#8B7355] transition-colors text-sm tracking-[0.15em]"
            >
              ← BACK TO JOURNAL
            </Link>
            
            <div className="flex gap-8">
              <Link 
                to={createPageUrl('BlogPaintPaletteLaurelCreek')}
                className="text-left group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">PREVIOUS POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">← The Paint Palette: Laurel Creek</p>
              </Link>
              
              <Link 
                to={createPageUrl('BlogBotanicalPrintsLaurelCreek')}
                className="text-right group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">NEXT POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">Botanical Prints: Laurel Creek →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}