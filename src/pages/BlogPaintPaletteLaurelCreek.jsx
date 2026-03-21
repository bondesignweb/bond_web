import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function BlogPaintPaletteLaurelCreek() {
  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2025/10/16.png"
          alt="The Paint Palette: Laurel Creek"
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
            Cool Designers Don't Gatekeep
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-[#3D3D3D] tracking-wide mb-4">
            The Paint Palette: Laurel Creek
          </h1>
          <p className="text-[#6B6B6B] text-sm mb-12">October 31, 2025</p>

          <div className="prose prose-lg max-w-none text-[#3D3D3D] space-y-8">
            <p className="text-lg leading-relaxed">
              Laurel Creek has become one of those homes where color quietly steals the show... and by far, our most asked question has been: "What paint color is that?!" Every shade was selected for a reason, to enhance the light, play up the architecture, and bring out the beauty in each material choice.
            </p>
            <p className="leading-relaxed">
              So we put together this all in one reference. A complete guide to the Laurel Creek paint palette, with notes on how these colors behave, where they shine, and how you might use them in your own home.
            </p>
            <p className="leading-relaxed italic">
              Bookmark it, screenshot it, bring it to your painter. It is a good one to keep close.
            </p>

            {/* Gray Wisp */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">A Soft & Airy Chameleon</h2>
              <p className="leading-relaxed mb-6">
                This was one of the first paint colors we selected for the home, and it has remained our favorite throughout the entire process. Gray Wisp can read like a gentle gray in the morning, a breezy blue at midday, and a calm green right before sunset. It has subtle personality, just enough color to feel fresh but not so much that it overwhelms the art and furnishings. It feels timeless, somewhat vintage, but still fresh at the same time. Don't be afraid to color drench with this gorgeous shade.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/8-1.png" alt="Gray Wisp" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/10-2.png" alt="Gray Wisp" className="w-full" />
              </div>
            </div>

            {/* Classic Gray */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">The Perfect Cozy Neutral</h2>
              <p className="leading-relaxed mb-6">
                Warm, creamy, and incredibly versatile. Classic Gray leans toward a soft greige that wraps a room in comfort. In high light rooms it feels bright and velvety. In lower light, it leans cozier and richer. We used it to frame the de Gournay wallpaper in the primary bedroom because it never fights with pattern. It lets art and texture stand front and center while still giving the room a layered look.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/16-2.png" alt="Classic Gray" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/13-2.png" alt="Classic Gray" className="w-full" />
              </div>
            </div>

            {/* Pigeon */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Quietly Dramatic</h2>
              <p className="leading-relaxed mb-6">
                Pigeon is a smoky blue gray with gentle green undertones that feel instantly timeless. Its depth shifts beautifully with the light and brings just the right amount of drama into a smaller space. We originally selected this shade because it coordinated perfectly with the Acquaviva quartzite. But once we saw it in place, we fell in love with how it elevated the entire room. That is when we made the decision to color drench the butler's pantry so the stone and paint could work together in complete harmony.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/7-2.png" alt="Pigeon" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/10/18-2.png" alt="Pigeon" className="w-full" />
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
                to={createPageUrl('BlogFloralWallcoveringsLaurelCreek')}
                className="text-right group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">NEXT POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">The Floral Wallcoverings Of Laurel Creek →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}