import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function UpcomingFreshTakeOnFrench() {
  const projectData = {
    title: 'FRESH TAKE ON FRENCH',
    year: '2022',
    projectType: 'New Construction',
    designers: 'Jennifer Chipman',
    location: 'Morgan, Utah',
    scope: 'New Construction & Furnishings',
    contractor: 'Magleby Construction',
    architect: '',
    description: 'Nestled in the mountains of Morgan, Utah, this home combines easy French living and style with contemporary themes. Although sophisticated and elegant, it still has plenty of space for fun, including a bunk room, game room, and a hidden playroom loft. The home features patterned wallpaper, intricate millwork, modern hard finishes, and panoramic mountainside views.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-2.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-6.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-8.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-7.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-3.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-4.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-5.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-9.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-14.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-11.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-13.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-15.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-16.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-17.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-18.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-19.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-20.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-21.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-10.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-23.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-22.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-24.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-25.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/08/Fresh-French-26.jpg', span: 'col-span-1' }
    ],
    nextProject: 'CanyonCool'
  };
  return <PortfolioProject projectData={projectData} />;
}
