import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function TheBridgeHouse() {
  const projectData = {
    title: 'THE BRIDGE HOUSE',
    year: '2025',
    projectType: 'New Construction',
    designers: 'Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'New Construction',
    description: 'A stunning contemporary mountain home that bridges modern architecture with natural surroundings. Clean lines and sophisticated finishes create a refined living experience.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/6.png?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/13-1.png?w=453&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/9.png?w=1017&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/14-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/7.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/3-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/8.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/16-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/15-1.png?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/5.png?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/2-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/12.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/4-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/10.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/7-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/17-1.png?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/11.png?w=1316&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/5-1.png?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/6-1.png?w=798&h=1196&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/4.png?w=893&h=596&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/3.png?w=893&h=596&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/11-1.png?w=797&h=1196&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/9-1.png?w=1246&h=1868&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/10-1.png?w=1246&h=1868&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/13.png?w=1663&h=1109&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/14.png?w=829&h=553&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/15.png?w=829&h=552&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/21.png?w=830&h=553&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/16.png?w=829&h=553&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/17.png?w=829&h=553&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/18.png?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/8-1.png?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/19.png?w=1317&h=879&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/20.png?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/1-1.png?w=1175&h=1761&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/2.png?w=1246&h=831&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/08/1.png?w=1246&h=831&ssl=1', span: 'col-span-2' }
    ],
    prevProject: 'FifthAvenueRanch',
    nextProject: 'IntoTheWoods'
  };

  return <PortfolioProject projectData={projectData} />;
}