import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function CanyonCool() {
  const projectData = {
    title: 'CANYON COOL',
    year: '2026',
    projectType: 'Remodel',
    designers: 'Laura Kramer',
    location: 'Alta, Utah',
    scope: 'New Construction',
    contractor: 'Greer Construction',
    architect: 'Upwall Design Architects',
    description: 'Canyon Cool is a 70s Modern–inspired ski cabin designed to feel equal parts nostalgic and fresh, where retro color, eclectic layers, and playful pattern come together in a space made for connection. Whimsical and a little unexpected at every turn, the home leans into bold design moments without ever taking itself too seriously, creating visual interest around every corner. The result is a spirited mountain retreat that celebrates personality, creativity, and the joy of bringing people together.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/1.jpg?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/17.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/2.jpg?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/15.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/14.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/3.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/1-1.jpg?w=453&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/4.jpg?w=1017&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/12.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/2-1.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/3-1.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/4-1.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/6.jpg?w=892&h=595&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/5.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/6-1.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/Copy-of-Portfolio-Vertical-Template.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/5-1.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/16.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/13.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/7.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/7-1.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/8.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/9.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/10.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2026/01/11.jpg?w=621&h=931&ssl=1', span: 'col-span-1' }
    ],
    nextProject: 'LaurelCreek'
  };

  return <PortfolioProject projectData={projectData} />;
}