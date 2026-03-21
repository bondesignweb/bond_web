import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Lightbox from './Lightbox';

export default function PortfolioProject({ projectData }) {
  const { title, designers, location, scope, contractor, architect, description, images, prevProject, nextProject, year, projectType } = projectData;
  const [lightboxIndex, setLightboxIndex] = useState(null);

  return (
    <div className="bg-[#F8F6F3] pt-20">
      <div className="flex flex-col lg:flex-row">
        {/* Left Sidebar */}
        <motion.aside 
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:fixed lg:left-0 lg:top-20 lg:h-[calc(100vh-80px)] lg:w-64 bg-[#3D3D3D] text-white p-8 lg:overflow-y-auto z-10"
        >
          <div className="space-y-6">
            <div>
              <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">PROJECT</p>
              <h1 className="font-serif text-3xl tracking-wide mb-1">{title}</h1>
            </div>

            {year && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">YEAR</p>
                <p className="italic text-sm">{year}</p>
              </div>
            )}

            {projectType && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">PROJECT TYPE</p>
                <p className="italic text-sm">{projectType}</p>
              </div>
            )}

            {designers && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">{designers.includes('&') ? 'DESIGNERS' : 'DESIGNER'}</p>
                <p className="italic text-sm">{designers}</p>
              </div>
            )}

            {location && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">LOCATION</p>
                <p className="italic text-sm">{location}</p>
              </div>
            )}

            {scope && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">SCOPE</p>
                <p className="italic text-sm">{scope}</p>
              </div>
            )}

            {contractor && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">CONTRACTOR</p>
                <p className="italic text-sm">{contractor}</p>
              </div>
            )}

            {architect && (
              <div>
                <p className="text-xs tracking-[0.15em] text-[#B8B8B8] mb-2">ARCHITECT</p>
                <p className="italic text-sm">{architect}</p>
              </div>
            )}

            {description && (
              <div className="border-t border-[#6B6B6B] pt-6">
                <p className="text-sm leading-relaxed text-[#D1D1D1] font-light">
                  {description}
                </p>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-[#6B6B6B]">
              {prevProject ? (
                <Link 
                  to={createPageUrl(prevProject)}
                  className="flex items-center gap-2 text-xs tracking-[0.15em] hover:text-[#C4A77D] transition-colors"
                >
                  <ChevronLeft size={16} />
                  PREV
                </Link>
              ) : (
                <span className="text-xs tracking-[0.15em] text-[#6B6B6B]">
                  <ChevronLeft size={16} className="inline" />
                  PREV
                </span>
              )}
              <Link 
                to={createPageUrl('Portfolio')}
                className="text-xs tracking-[0.15em] hover:text-[#C4A77D] transition-colors"
              >
                ALL
              </Link>
              {nextProject ? (
                <Link 
                  to={createPageUrl(nextProject)}
                  className="flex items-center gap-2 text-xs tracking-[0.15em] hover:text-[#C4A77D] transition-colors"
                >
                  NEXT
                  <ChevronRight size={16} />
                </Link>
              ) : (
                <span className="text-xs tracking-[0.15em] text-[#6B6B6B]">
                  NEXT
                  <ChevronRight size={16} className="inline" />
                </span>
              )}
            </div>
          </div>
        </motion.aside>

        {/* Main Gallery */}
        <div className="lg:ml-64 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 p-2">
            {images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true, margin: "-50px" }}
                className={`${image.span} cursor-pointer group`}
                onClick={() => setLightboxIndex(index)}
              >
                <img 
                  src={image.url}
                  alt={`${title} ${index + 1}`}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          currentIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </div>
  );
}