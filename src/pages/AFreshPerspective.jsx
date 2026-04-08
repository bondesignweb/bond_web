import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function AFreshPerspective() {
  const projectData = {
    title: 'A FRESH PERSPECTIVE',
    year: '2024',
    projectType: 'New Construction',
    designers: 'Laura Kramer',
    location: 'Promontory, Utah',
    scope: 'New Construction & Furnishings',
    contractor: 'Promontory Homes',
    architect: '',
    description: 'Clean, minimal foundation complete with textural design elements and textiles. A modern, mountain design that is polished, yet livable.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4419-HDR-Edit-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4332-HDR-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4461-HDR-Edit-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4181-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4203-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4455-HDR-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4272-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4014-HDR-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A3990-HDR-Edit-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4039-Edit-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4135-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4159-HDR-Edit-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4169-HDR-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4513-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4561-Edit-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/01/380A4574-Edit-scaled.jpg', span: 'col-span-1' }
    ],
    nextProject: 'DesertSpanishRetreat'
  };
  return <PortfolioProject projectData={projectData} />;
}
