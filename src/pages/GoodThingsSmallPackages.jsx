import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function GoodThingsSmallPackages() {
  const projectData = {
    title: 'GOOD THINGS COME IN SMALL PACKAGES',
    year: '2022',
    projectType: 'Remodel',
    designers: 'Jennifer Chipman',
    location: 'Oakley, Utah',
    scope: 'Remodel & Furnishings',
    contractor: 'Magleby Construction',
    architect: '',
    description: 'The sweetest barn loft you will ever see! This modern farmhouse space might be small, but packed with fun design elements. The unconventional black forest green cabinetry and range add a pop of color and personality to the space.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-door-and-coat-rack.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-entry.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-sink-and-shelves.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-coffee-table.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-night-stand.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-kitchen-shelves.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-kitechen.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-bedroom.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-bathroom.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-kitchen-and-bed.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/good-things-bathroom-shower.jpg', span: 'col-span-1' }
    ],
    nextProject: 'MountainStateOfMind'
  };
  return <PortfolioProject projectData={projectData} />;
}
