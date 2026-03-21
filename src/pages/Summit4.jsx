import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function Summit4() {
  const projectData = {
    title: 'SUMMIT 4',
    year: '2025',
    projectType: 'New Construction',
    designers: 'Laura Kramer & Jennifer Chipman',
    location: 'Promontory, Utah',
    scope: 'New Construction',
    description: 'A striking modern mountain home featuring monochrome architecture and high-end finishes. This contemporary residence showcases sophisticated design with clean lines and luxurious details throughout.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0404-Edit-scaled.jpg?w=862&h=575&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0465-Edit-scaled.jpg?w=862&h=574&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0654-Edit-scaled.jpg?w=769&h=1153&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0422-Edit-scaled.jpg?w=857&h=571&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0522-Edit-scaled.jpg?w=857&h=578&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0171-Edit-scaled.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0078-Edit-scaled.jpg?w=452&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0051-Edit-scaled.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0265-Edit-scaled.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0289-Edit-scaled.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0307-Edit-scaled.jpg?w=1318&h=879&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0741-Edit-scaled.jpg?w=1318&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0994-Edit-scaled.jpg?w=1174&h=1761&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0924-Edit-scaled.jpg?w=860&h=573&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0945-Edit-scaled.jpg?w=382&h=573&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0954-Edit-scaled.jpg?w=860&h=573&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/02/380A0978-Edit-scaled.jpg?w=382&h=573&ssl=1', span: 'col-span-1' }
    ],
    prevProject: 'TheCourtHouse'
  };

  return <PortfolioProject projectData={projectData} />;
}