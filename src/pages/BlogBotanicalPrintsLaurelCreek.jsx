import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function BlogBotanicalPrintsLaurelCreek() {
  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2025/10/16.png"
          alt="Rooted in Design: The Story of Laurel Creek's Botanical Prints"
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
          <p className="text-xs text-[#8B7355] tracking-[0.2em] uppercase mb-4">Design</p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D3D3D] tracking-wide mb-4">
            Rooted in Design: The Story of Laurel Creek's Botanical Prints
          </h1>
          <p className="text-[#6B6B6B] text-sm mb-12">October 14, 2025</p>

          <div className="prose prose-lg max-w-none text-[#3D3D3D] space-y-8">
            <p className="text-lg leading-relaxed">
              Every home has that one element that quietly steals the show and at Laurel Creek, it's the vintage botanical prints. Hung in the soft green sitting room layered with pattern and texture, they're what make the space feel alive. There's something about the way they ground the room... like they've always been there, breathing a little history into the walls.
            </p>

            <img 
              src="https://bonddesigncompany.com/wp-content/uploads/2025/10/cropped-33.png" 
              alt="Laurel Creek Botanical Prints" 
              className="w-full my-12"
            />

            <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">20 Years Under The Bed</h2>
            <p className="leading-relaxed">
              Halfway through the design process (almost a year into selecting finishes, furniture, and fabrics) our client casually mentioned that she owned a collection of botanical prints. "Would those work in the house?" she asked. What she displayed on the table left us speechless: a complete, original set of The Temple of Flora prints from 1799 by Dr. Robert John Thornton. She'd owned them for nearly twenty years. Not framed, not displayed, not even stored... just carefully tucked under her bed, waiting for the right home.
            </p>
            <p className="leading-relaxed">
              Here's the crazy part: the home had already been designed... and it was designed for them. The sitting room walls were already a muted sage green. The velvet sofa was already deep emerald. The patterns, textures, and finishes already leaned botanical. When we saw the prints against those design boards, it felt like fate. Like somehow, all along, we'd been designing around something we didn't even know existed.
            </p>

            <div className="grid md:grid-cols-2 gap-4 my-12">
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/2.png" alt="Botanical Prints" className="w-full" />
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/29.jpg" alt="Botanical Prints" className="w-full" />
            </div>

            <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Temple Of Flora</h2>
            <p className="leading-relaxed">
              Dr. Robert John Thornton's Temple of Flora was part of his grand, and somewhat ill-fated, vision to create "the greatest botanical book ever made." Each print was hand-colored and painted by some of the most celebrated artists of the late 18th century. These dramatic, moody, and deeply romantic portraits of flowers blurred the line between science and art. Thornton's passion nearly bankrupted him, but the result was one of the most beautiful botanical series ever published.
            </p>
            <p className="leading-relaxed">
              So, yes... our client just casually happened to own one of the rarest and most complete collections in existence. Naturally.
            </p>

            <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6 mt-12">Whimsical Continuity</h2>
            <p className="leading-relaxed">
              Once we incorporated the botanical prints into the sitting room, it felt impossible to stop. The collection was too special to confine to one wall. We used the remaining prints throughout the home—in guest bedrooms, bathrooms, and quiet hallways—creating these little surprise moments of color and story. It gave the home a sense of whimsical continuity, like the botanicals were gently weaving their way through every space. Every time you turn a corner, there's another little bloom waiting to greet you.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 my-12">
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/31.jpg" alt="Botanical Print" className="w-full" />
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/28.jpg" alt="Botanical Print" className="w-full" />
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/32.jpg" alt="Botanical Print" className="w-full" />
            </div>

            <p className="leading-relaxed italic">
              After two centuries in print and two decades hiding under a bed, these botanicals have officially made their debut. It's funny how the right home can make everything click into place, even something that's been waiting its turn for twenty years.
            </p>
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
                to={createPageUrl('BlogFloralWallcoveringsLaurelCreek')}
                className="text-left group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">PREVIOUS POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">← Floral Wallcoverings: Laurel Creek</p>
              </Link>
              
              <Link 
                to={createPageUrl('BlogWallcoveringsSapphireRidge')}
                className="text-right group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">NEXT POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">Wallcoverings: Sapphire Ridge →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}