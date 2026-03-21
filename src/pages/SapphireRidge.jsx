import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function SapphireRidge() {
  const projectData = {
    title: 'SAPPHIRE RIDGE',
    year: '2025',
    projectType: 'New Construction',
    designers: 'Laura Kramer & Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'New Construction',
    description: 'A sophisticated mountain residence featuring elegant design and stunning mountain views. This home showcases refined interiors with a perfect blend of luxury and comfort.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/1.png?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/1-1.png?w=453&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/2.png?w=1017&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/2-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/3.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/3-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/4.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/5-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/5.png?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/6-1.png?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/7-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/6.png?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/4-1.png?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/LindsaySalazar-48-scaled.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/9.png?w=743&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/8.png?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/10-1.png?w=453&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/7.png?w=1017&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/8-1.png?w=474&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/9-1.png?w=473&h=710&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/10.png?w=1064&h=710&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/05/11.png?w=473&h=710&ssl=1', span: 'col-span-1' }
    ],
    prevProject: 'IntoTheWoods',
    nextProject: 'ModernMeadowRemodel'
  };

  return <PortfolioProject projectData={projectData} />;
}