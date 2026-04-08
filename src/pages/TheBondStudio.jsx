import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function TheBondStudio() {
  const projectData = {
    title: 'THE BOND STUDIO',
    year: '2023',
    projectType: 'Remodel',
    designers: 'The Bond Team',
    location: 'Park City, Utah',
    scope: 'Remodel & Furnishings',
    contractor: 'Magleby Construction',
    architect: '',
    description: 'Balanced, sophisticated, and refreshingly modern. The Bond Studio has private and collaborative offices to enhance creativity and maximize meeting space. We can't wait for you to stop by!',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4901-nicole-gerulat-1.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4977-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4998-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4802-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4822-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4869-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4960-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4836-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4914-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4928-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio5059-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4942-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio4949-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio5009-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2023/02/2023-02-08-Bond-Studio5044-nicole-gerulat.jpg', span: 'col-span-1' }
    ],
    nextProject: 'TheLakeHouse'
  };
  return <PortfolioProject projectData={projectData} />;
}
