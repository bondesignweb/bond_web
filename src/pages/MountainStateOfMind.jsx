import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function MountainStateOfMind() {
  const projectData = {
    title: 'MOUNTAIN STATE OF MIND',
    year: '2022',
    projectType: 'New Construction',
    designers: 'Jennifer Chipman',
    location: 'Tuhaye, Utah',
    scope: 'New Construction & Furnishings',
    contractor: 'Cameo Homes Inc.',
    architect: '',
    description: 'Say goodbye to what you know about mountain homes and hello to this elegant mountain modern project, where beautiful contemporary themes embrace traditional lodge comforts.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-living-room.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-table-setting-idea-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Mountain-Modern-Living-Room.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-bathroom-backlit-onyx-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Mountain-modern-kitchen-design-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/mountain-modern-kitchen-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-primary-bedroom.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Mountain-modern-master-bedroom-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Modern-bathroom-design.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Minimalis-laundry-room-ideas-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Elegant-mountain-modern-home-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Whimsical-chandelier-light-fixture-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-home-interior-design.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-interior-design-utah.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Elegant-Mountain-Modern-Home-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Mountain-modern-spa-shower-scaled.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/Mountain-modern-guest-bedroom-scaled.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/elegant-mountain-modern-bunk-room.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/luxury-mountain-modern-home-in-park-city-utah.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/11/mountiain-home-in-park-city-utah.jpg', span: 'col-span-2' }
    ],
    nextProject: 'SpeakeasyPlayHard'
  };
  return <PortfolioProject projectData={projectData} />;
}
