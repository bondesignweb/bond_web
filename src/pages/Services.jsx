import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function Services() {
  const [expandedFaq, setExpandedFaq] = useState(0);

  const services = [
    {
      title: 'Project Kick-Off',
      description: 'We are firm believers in clear expectations and thorough communication. For our kick-off, we will typically discuss the following:',
      items: ['Project Scope', 'Timelines', 'Design Inspiration & Concepts', 'Project Deliverables & Responsibilities']
    },
    {
      title: 'Exterior Selections',
      description: 'Your builder and architect will be involved as well; however, we are happy to help design and select materials for the following:',
      items: ['Roofing', 'Siding & Stone', 'Exterior Doors & Garage Doors', 'Window Packages', 'Exterior Sconces']
    },
    {
      title: 'Interior Selections',
      description: 'Our designers will take you through the entire interior finish selection process, which includes:',
      items: ['Plumbing Fixtures & Appliance Selections', 'Tile, Slabs, and Stone', 'Cabinetry Profile & Design', 'Flooring', 'Paint Colors & Wall Textures', 'Lighting']
    },
    {
      title: 'Home Furnishings',
      description: 'With access to hundreds of vendors, we select and tailor furnishings that will complement your personality and lifestyle:',
      items: ['Begin with Furniture Concepts', 'Custom Selection & Design Presentation', 'Client Approvals', 'Space Planning', 'Procurement, Receiving, and Inspection', 'Delivery & Installation']
    },
    {
      title: 'Complete the Look',
      description: 'Other areas of scope that clients may want to consider are:',
      items: ['Window Treatments', 'Wall Treatments', 'Houseware Packages', 'Bathware Packages', 'Linens & Bedding', 'Decorative Art', 'Home Accessories']
    },
    {
      title: 'Delivery & Installation',
      description: 'Along with your designer and other Bond Design team members, our warehouse will provide a delivery and installation team that will deliver and assemble all pieces of furniture. We will place accessories and hang decorative art and mirrors. We will make sure your home is picture-perfect for the big reveal!',
      items: []
    }
  ];

  const faqs = [
    {
      question: 'What types of projects do you take?',
      answer: 'We specialize in high-end residential design, large-scale remodels, and new construction. If you have questions about your project, please contact us directly.'
    },
    {
      question: 'Do you take projects outside of Utah?',
      answer: 'Absolutely! We are located in Park City, Utah, but serve clients nationwide! We will consider availability for projects outside of Utah on a case-by-case basis. Contact us directly for more information.'
    },
    {
      question: 'How is your pricing structured?',
      answer: 'For new builds and remodels, our design fee is based on the square footage of your project. Along with the client, we will determine an additional furnishings budget. Visit our portfolio to explore different furnishing budgets.'
    },
    {
      question: 'Who will be on my design team?',
      answer: 'As a boutique design firm, we like to keep our team small and our relationships strong. Our principal designer, Jennifer, along with our other talented and experienced designers, will strive to ensure that the design process goes as smoothly as possible and that you will receive the individualized attention you deserve.'
    },
    {
      question: 'When should I involve an interior designer in my project?',
      answer: "We're happy to get involved during any point of your project process, but we do love being able to help shape your home from the ground up. This way, we can collaborate with the architect when working on your plans. For furniture-only projects, please take into consideration current delayed lead times."
    }
  ];

  return (
    <div className="bg-[#F8F6F3] pt-20">
      {/* Hero Section */}
      <section className="relative h-[65vh] overflow-hidden">
        <img 
          src="https://bonddesigncompany.com/wp-content/uploads/2022/06/master-bedroom-design-bond-design-company.jpg"
          alt="Interior Design Services"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-start px-8 md:px-20 lg:px-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <p className="text-white/70 text-xs tracking-[0.35em] mb-4">FULL-SERVICE DESIGN · PARK CITY, UTAH</p>
            <h1 className="font-serif text-3xl md:text-5xl text-white tracking-[0.1em] mb-6 leading-tight">
              INTERIOR DESIGN<br />SERVICES
            </h1>
            <p className="text-white/80 font-light leading-relaxed max-w-lg">
              From the first sketch to the final reveal — we guide you through every decision with clarity, creativity, and care. Serving high-end residential clients across new construction, remodels, and furnishing projects.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 px-6 md:px-16 lg:px-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-[#8B7355] text-xs tracking-[0.3em] mb-4">WHAT WE DO</p>
            <h2 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] tracking-[0.1em] mb-6">
              A Complete Design Experience
            </h2>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-4">
              Our services cover the full spectrum of residential design — from exterior architecture and finish selections all the way through furniture procurement, delivery, and installation.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed font-light mb-4">
              We work with clients building mountain retreats, remodeling existing homes, and furnishing dream spaces. Not every client will have the same needs, and we understand that. Our goal is to deliver unique, ambitious design solutions that are as practical as they are beautiful.
            </p>
            <p className="text-[#6B6B6B] leading-relaxed font-light">
              Based in Park City, Utah, we serve clients locally and nationwide. Wherever you are, we're ready to bond.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src="https://bonddesigncompany.com/wp-content/uploads/2022/06/cropped-LindsaySalazar-76.jpg"
              alt="Bond Design Services"
              className="w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-10 px-6 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#3D3D3D] p-8 text-white"
            >
              <h3 className="font-serif italic text-xl md:text-2xl mb-4">{service.title}</h3>
              <p className="text-[#B8B8B8] text-sm leading-relaxed mb-4 font-light">{service.description}</p>
              {service.items.length > 0 && (
                <ul className="space-y-2">
                  {service.items.map((item, i) => (
                    <li key={i} className="text-[#B8B8B8] text-sm font-light flex items-start">
                      <span className="mr-2">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-3xl md:text-4xl text-[#3D3D3D] tracking-[0.1em] mb-12 text-center"
          >
            FREQUENTLY ASKED QUESTIONS
          </motion.h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="border-b border-[#D1CCC4]"
              >
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full py-5 flex items-center justify-between text-left"
                >
                  <span className="text-[#3D3D3D] font-light tracking-wide">{faq.question}</span>
                  {expandedFaq === index ? (
                    <ChevronUp size={20} className="text-[#6B6B6B]" />
                  ) : (
                    <ChevronDown size={20} className="text-[#6B6B6B]" />
                  )}
                </button>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="pb-5"
                  >
                    <p className="text-[#6B6B6B] font-light leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Let's Bond CTA */}
      <section className="py-20 px-6 md:px-16 lg:px-32 bg-[#F8F6F3]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://bonddesigncompany.com/wp-content/uploads/2022/06/cropped-LindsaySalazar-76.jpg"
                alt="Let's Bond"
                className="w-full h-auto"
              />
            </motion.div>

            {/* Right - Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-serif text-3xl md:text-4xl text-[#3D3D3D] tracking-[0.1em] mb-4">
                LET'S BOND
              </h2>
              <p className="text-[#6B6B6B] text-sm mb-8">"*" indicates required fields</p>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="text"
                    placeholder="FULL NAME *"
                    required
                    className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors"
                  />
                  <input
                    type="date"
                    placeholder="IDEAL START DATE"
                    className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <input
                    type="tel"
                    placeholder="PHONE *"
                    required
                    className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors"
                  />
                  <input
                    type="email"
                    placeholder="EMAIL *"
                    required
                    className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs text-[#6B6B6B] tracking-wider mb-4 italic">
                      What design services are you interested in?
                    </label>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border border-[#D1CCC4] rounded-none appearance-none checked:bg-[#3D3D3D] cursor-pointer"
                        />
                        <span className="text-[#3D3D3D] text-sm tracking-wider">NEW CONSTRUCTION</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border border-[#D1CCC4] rounded-none appearance-none checked:bg-[#3D3D3D] cursor-pointer"
                        />
                        <span className="text-[#3D3D3D] text-sm tracking-wider">REMODEL</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-5 h-5 border border-[#D1CCC4] rounded-none appearance-none checked:bg-[#3D3D3D] cursor-pointer"
                        />
                        <span className="text-[#3D3D3D] text-sm tracking-wider">INTERIOR FURNISHINGS</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <input
                      type="date"
                      placeholder="IDEAL END DATE"
                      className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors"
                    />
                    <textarea
                      placeholder="WHERE IS YOUR PROJECT LOCATED?"
                      rows={3}
                      className="w-full px-4 py-3 border border-[#D1CCC4] bg-transparent text-[#3D3D3D] placeholder-[#9B9B9B] text-sm tracking-wider focus:outline-none focus:border-[#3D3D3D] transition-colors resize-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#3D3D3D] text-white py-4 text-sm tracking-[0.2em] hover:bg-[#2D2D2D] transition-colors"
                >
                  SUBMIT INQUIRY
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}