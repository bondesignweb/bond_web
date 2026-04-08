import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function FlyRightIn() {
  const projectData = {
    title: 'FLY RIGHT IN',
    year: '2022',
    projectType: 'Furnishings',
    designers: 'Jennifer Chipman',
    location: 'Alpine, Wyoming',
    scope: 'Furnishings',
    contractor: '',
    architect: '',
    description: 'Located in the beautiful mountains of Alpine, Wyoming, the furnishings of this hangar house are inspired by the textural and tonal elements of its surroundings. The panoramic views are unmatched and include a range of wildlife (and aircraft) that come and go from the property.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Kitchen-2.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Kitchen-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Kitchen-4.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Kitchen-3.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-4.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-6.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-7.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-3.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Living-5.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Double-Bedroom-1.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Double-Bedroom-3.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Double-Bedroom-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Guest-Bedroom-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Guest-Bedroom-2.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Office.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Exterior-1.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Exterior-2.jpg', span: 'col-span-2' }
    ],
    nextProject: 'GoodThingsSmallPackages'
  };
  return <PortfolioProject projectData={projectData} />;
}
