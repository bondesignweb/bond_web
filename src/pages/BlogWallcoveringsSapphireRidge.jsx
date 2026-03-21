import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function BlogWallcoveringsSapphireRidge() {
  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2025/05/10-2.png"
          alt="The Wallcoverings Of Sapphire Ridge"
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
            The Wallcoverings Of Sapphire Ridge
          </h1>
          <p className="text-[#6B6B6B] text-sm mb-12">May 15, 2025</p>

          <div className="prose prose-lg max-w-none text-[#3D3D3D] space-y-8">
            <p className="text-lg leading-relaxed">
              Sapphire Ridge is all about that balance—rich jewel tones, unexpected patterns, and a cozy mountain vibe. One of the biggest ways we brought this vision to life? Wallpaper. This project features NINE different wallcoverings (yes, nine), and we might be equally obsessed with every single one. Below, we're breaking down each selection, why we chose it, and how you can bring similar looks into your own home.
            </p>

            {/* Daybreak */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Daybreak by Phillip Jeffries</h2>
              <p className="leading-relaxed mb-6">
                For the primary bedroom, we used Phillip Jeffries' Daybreak in Clouds on Gesso. It mimics the layered mountain views just outside the windows—an ethereal nod to the landscape beyond. The soft, calming blues create a serene retreat while leaning modern enough to play nicely with the furnishings.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/1-2.png" alt="Daybreak" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/2-2.png" alt="Daybreak" className="w-full" />
              </div>
            </div>

            {/* Ancient Canopy */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Ancient Canopy by Sanderson</h2>
              <p className="leading-relaxed mb-6">
                One of our core beliefs: <em>Thou shalt not suffer a dull powder room to exist.</em> Ancient Canopy in Forest Green is the proof. The colors coordinate perfectly with the great room and primary suite, creating a visual thread throughout the home while making this powder room one to remember.
              </p>
            </div>

            {/* Blush Floral */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Blush Floral by AneWall</h2>
              <p className="leading-relaxed mb-6">
                Laundry rooms without wallpaper? Couldn't be us. This oversized blush floral adds just the right amount of drama to an otherwise utilitarian space. We even color-matched the cabinetry to the print—because why not make chores beautiful?
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/3-2.png" alt="Blush Floral" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/4-2.png" alt="Blush Floral" className="w-full" />
              </div>
            </div>

            {/* Juniper Pine */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Juniper Pine by Sanderson</h2>
              <p className="leading-relaxed mb-6">
                We design a <em>lot</em> of bunkrooms. And to avoid the snooze factor, we went bold with Sanderson's Juniper Pine in Elder Bark. The pattern brings texture, nature, and playfulness to the walls—without feeling juvenile.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/5-2.png" alt="Juniper Pine" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/6-2.png" alt="Juniper Pine" className="w-full" />
              </div>
            </div>

            {/* Serenity */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Serenity by Phillip Jeffries</h2>
              <p className="leading-relaxed mb-6">
                For our client's daughter, we wanted something soft, dreamy, and ethereal. Serenity delivered. With subtle shades of lavender woven into a wisteria-inspired print, we paired it with a velvet headboard and achieved pure bliss.
              </p>
            </div>

            {/* Mah Jong */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Mah Jong by Schumacher</h2>
              <p className="leading-relaxed mb-6">
                Hot tip: wallpaper isn't just for walls. We covered the theater room ceiling in Mah Jong by Schumacher in River Blue. With the rest of the room color-drenched in inky tones, this made the ceiling feel intentional, complete, and a little bit luxe.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/7-2.png" alt="Mah Jong" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/05/8-2.png" alt="Mah Jong" className="w-full" />
              </div>
            </div>

            <p className="leading-relaxed italic text-lg mt-12">
              If you're ready to see these beauties in action, watch the full home tour on YouTube. Trust us, photos don't do them justice.
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
                to={createPageUrl('BlogBotanicalPrintsLaurelCreek')}
                className="text-left group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">PREVIOUS POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">← Botanical Prints: Laurel Creek</p>
              </Link>
              
              <Link 
                to={createPageUrl('BlogMixingMaterialsKitchen')}
                className="text-right group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">NEXT POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">Mixing Materials In Your Kitchen →</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}