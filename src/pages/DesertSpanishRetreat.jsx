import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function DesertSpanishRetreat() {
  const projectData = {
    title: 'DESERT SPANISH RETREAT',
    year: '2023',
    projectType: 'Furnishings',
    designers: 'Jennifer Chipman',
    location: 'Phoenix, Arizona',
    scope: 'Furnishings',
    contractor: 'Nelson Development',
    architect: '',
    description: 'Livability was a top priority along with staying true to the Mission Revival aesthetic. In keeping with the Spanish foundation, we added modern design elements, balanced the soft arches with clean lines, incorporated airy textures, and created a comfortable, livable feel to this beautiful home.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Living.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Kitchen.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Living-2.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Dining.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Pantry.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Primary.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Daybeds.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Game.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Sports-Court.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Guest-3.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Reatreat-Nursery.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Powder-Room.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Grotto-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Grotto.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Outdoor.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Outdoor-Kitchen.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Guest-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/07/Desert-Spanish-Retreat-Guest-1.jpg', span: 'col-span-2' }
    ],
    nextProject: 'FlyRightIn'
  };
  return <PortfolioProject projectData={projectData} />;
}
