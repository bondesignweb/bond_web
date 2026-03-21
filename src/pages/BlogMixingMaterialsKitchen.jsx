import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';

export default function BlogMixingMaterialsKitchen() {
  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Image */}
      <section className="relative h-[50vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2025/04/4.png"
          alt="The Ultimate Guide To Mixing Materials In Your Kitchen"
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
            THE ULTIMATE GUIDE TO MIXING MATERIALS IN YOUR KITCHEN
          </h1>
          <p className="text-[#6B6B6B] text-sm mb-12">April 28, 2025</p>

          <div className="prose prose-lg max-w-none text-[#3D3D3D] space-y-8">
            <p className="text-lg leading-relaxed">
              Mixing materials in your kitchen can either feel like design magic—or like a chaotic Pinterest board gone rogue. Today, we're breaking down our no-fail approach to mixing materials in a way that feels curated, purposeful, and elevated. In our Sapphire Ridge project, we combined Taj Mahal Quartzite, Vitara Crystal Quartzite, Walnut cabinetry, plaster, polished nickel, aged bronze, and more to create a layered yet cohesive kitchen design. Here's our ultimate 5-step guide to mixing materials like a pro:
            </p>

            {/* Two Is Better Than One */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Two Is Better Than One</h2>
              <p className="leading-relaxed mb-6">
                Choosing multiple countertop materials instantly adds dimension to your kitchen. In Sapphire Ridge, we used Taj Mahal quartzite on the main island and perimeter countertops, while introducing Vitara Crystal quartzite on a secondary, raised island. This created a natural visual divide between work zones and brought an intentional layer of interest to the space. While the stones are different, the soft white veining in the Vitara Crystal ties back to the Taj Mahal, creating subtle cohesion without everything feeling matchy-matchy.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/04/1.png" alt="Kitchen Materials" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/04/5.png" alt="Kitchen Materials" className="w-full" />
              </div>
            </div>

            {/* Let Your Cabinetry Compliment */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Let Your Cabinetry Compliment The Story</h2>
              <p className="leading-relaxed mb-6">
                Your cabinetry choice should feel like it belongs to the material palette, not compete with it. We opted for warm walnut cabinetry in this kitchen, which beautifully picks up the brown veining of the Vitara Crystal countertops. It also echoes the warmth of the wood beams and T&G paneling on the pitched ceiling—reinforcing the transitional mountain vibe our clients envisioned without overwhelming the space.
              </p>
            </div>

            {/* Mix Your Metals */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Mix Your Metals (Trust Us)</h2>
              <p className="leading-relaxed mb-6">
                Spoiler alert: You <em>do not</em> need to stick to one metal finish in your kitchen. In fact, we often prefer a thoughtful mix. In Sapphire Ridge, we combined aged bronze cabinet hardware (the Olympus pulls from Rocky Mountain Hardware) with polished nickel plumbing fixtures. The aged bronze leans into the mountain setting, while the polished nickel brings a fresh, slightly more modern contrast that keeps the space from feeling too heavy or traditional.
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/04/3.png" alt="Mixed Metals" className="w-full" />
                <img src="https://bonddesigncompany.com/wp-content/uploads/2025/04/6.png" alt="Mixed Metals" className="w-full" />
              </div>
            </div>

            {/* Unexpected Texture */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Unexpected Texture</h2>
              <p className="leading-relaxed mb-6">
                Material mixing isn't just about color and finish—it's also about texture. In Sapphire Ridge, we finished the range hood with a plaster treatment, adding a quiet complexity and tactile softness to the space. Plaster gives the kitchen a depth and richness that drywall simply can't replicate, blending seamlessly into a variety of design styles while offering a subtle point of interest that feels incredibly elevated.
              </p>
            </div>

            {/* Changes In Height & Scale */}
            <div className="my-12">
              <h2 className="font-serif text-3xl text-[#3D3D3D] mb-6">Changes In Height & Scale</h2>
              <p className="leading-relaxed mb-6">
                Incorporating different countertop heights—like raising a secondary island to bar height—can help visually break up materials while giving each its own "moment." In Sapphire Ridge, this not only made the dual stones feel intentional, but also created a practical workspace tailored to our clients' needs. Think about using height and volume changes strategically when layering different finishes.
              </p>
              <img src="https://bonddesigncompany.com/wp-content/uploads/2025/04/2.png" alt="Kitchen Height Variation" className="w-full" />
            </div>

            <p className="leading-relaxed italic text-lg mt-12">
              Mixing materials in your kitchen doesn't have to feel overwhelming—you just need a clear design story tying everything together. Want to see this in action? Watch the full Sapphire Ridge house tour on YouTube to get a closer look at how we pulled it all together.
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
                to={createPageUrl('BlogWallcoveringsSapphireRidge')}
                className="text-left group"
              >
                <p className="text-xs text-[#8B7355] tracking-[0.15em] mb-2">PREVIOUS POST</p>
                <p className="text-sm text-[#3D3D3D] group-hover:text-[#8B7355] transition-colors">← Wallcoverings: Sapphire Ridge</p>
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}