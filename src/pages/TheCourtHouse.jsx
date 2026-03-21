import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function TheCourtHouse() {
  const projectData = {
    title: 'THE COURT HOUSE',
    year: '2024',
    projectType: 'Interior Furnishings',
    designers: 'Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'New Construction',
    description: 'A distinguished residence combining classic elegance with modern sophistication. This home features thoughtfully curated interiors that create timeless, inviting spaces.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-14.jpg?w=860&h=574&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-1.jpg?w=860&h=573&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-7.jpg?w=768&h=1151&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-8.jpg?w=860&h=574&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-9.jpg?w=860&h=573&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-2.jpg?w=473&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-4.jpg?w=473&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-5.jpg?w=1065&h=710&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-6.jpg?w=473&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-10.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-11.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-12.jpg?w=452&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-13.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-16.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-15.jpg?w=1426&h=2139&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-18.jpg?w=1066&h=711&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-19.jpg?w=1066&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-20.jpg?w=1066&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-21.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-22.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-23.jpg?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-17.jpg?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-24.jpg?w=585&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-25.jpg?w=1246&h=831&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/03/Court-House-26.jpg?w=1246&h=831&ssl=1', span: 'col-span-2' }
    ],
    prevProject: 'ModernMeadowRemodel',
    nextProject: 'Summit4'
  };

  return <PortfolioProject projectData={projectData} />;
}