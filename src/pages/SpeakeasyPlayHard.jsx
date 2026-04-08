import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function SpeakeasyPlayHard() {
  const projectData = {
    title: 'SPEAK EASY, PLAY HARD',
    year: '2022',
    projectType: 'Remodel',
    designers: 'Jennifer Chipman',
    location: 'Morgan, Utah',
    scope: 'Remodel & Furnishings',
    contractor: 'Magleby Construction',
    architect: '',
    description: 'This rustic take on speakeasy-style is full of textural elements and moody colors. Rugged millwork, vintage-inspired details, and lively patterns blend seamlessly to create a never-dull and always-daring marriage of playfulness and masculinity.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Living-Room-9.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Kitchen-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Kitchen-Cabinet-Detail-4.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Copper-Kitchen-Faucet-3.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Copper-Range-Detail-5.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Kitchen-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Living-Room-NEW.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Livng-Room-Detail-11.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Livng-Room-12.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Pink-Vintage-Guest-Bedroom-6.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Moody-Rustic-Bathroom-7.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Blue-Vintage-Bedroom-8.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Bar-12.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Bond-Design-Company-Speak-Easy-Bar-13.jpg', span: 'col-span-1' }
    ],
    nextProject: 'TheBackNine'
  };
  return <PortfolioProject projectData={projectData} />;
}
