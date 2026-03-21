import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function FifthAvenueRanch() {
  const projectData = {
    title: 'FIFTH AVENUE RANCH',
    year: '2025',
    projectType: 'New Construction',
    designers: 'Laura Kramer & Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'New Construction',
    description: 'A sophisticated mountain retreat blending refined elegance with warm, inviting textures. This ranch-style home showcases a masterful balance of modern design and rustic charm.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/1-2.png?w=798&h=1196&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/12.png?w=893&h=596&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/1-1.png?w=893&h=596&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/3-2.png?w=797&h=1196&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/2.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/8-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/11.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/4-2.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/10-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/11-1.png?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/13.png?w=1316&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/6-2.png?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/16.png?w=1317&h=879&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/15.png?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/12-1.png?w=1175&h=1761&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/13-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/6-1.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/14-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/9.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/7-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/10.png?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/9-1.png?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/2-1.png?w=1175&h=1761&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/14.png?w=1317&h=879&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/17.png?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/15-1.png?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/07/4-1.png?w=1725&h=1150&ssl=1', span: 'col-span-2' }
    ],
    prevProject: 'LaurelCreek',
    nextProject: 'TheBridgeHouse'
  };

  return <PortfolioProject projectData={projectData} />;
}