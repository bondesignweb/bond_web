import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function ModernMeadowRemodel() {
  const projectData = {
    title: 'MODERN MEADOW REMODEL',
    year: '2025',
    projectType: 'Remodel',
    designers: 'Laura Kramer & Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'Remodel',
    description: 'A transformative remodel breathing new life into a mountain home. Contemporary updates and thoughtful design create a fresh, modern aesthetic while honoring the home\'s original character.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/Untitled-design-1-scaled.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6580-Edit-scaled.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6571-Edit-scaled.jpg?w=452&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6740-Edit-Recovered-scaled.jpg?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6704-Edit-scaled.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6650-Edit-scaled.jpg?w=331&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6559-Edit-copy-scaled.jpg?w=330&h=496&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6419-Edit-scaled.jpg?w=744&h=496&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6516-Edit-scaled.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6410-Edit-scaled.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6247-Edit-scaled.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6253-Edit-scaled.jpg?w=621&h=931&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6320-Edit-scaled.jpg?w=746&h=497&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6353-Edit-scaled.jpg?w=332&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6184-Edit-scaled.jpg?w=332&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6238-Edit-scaled.jpg?w=331&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A6041-Edit-scaled.jpg?w=739&h=497&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5998-Edit-scaled.jpg?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5980-Edit-scaled.jpg?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5947-Edit-scaled.jpg?w=585&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5868-Edit-scaled.jpg?w=633&h=925&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5889-Edit-scaled.jpg?w=617&h=925&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5871-Edit-scaled.jpg?w=617&h=925&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2025/04/380A5850-Edit-scaled.jpg?w=617&h=925&ssl=1', span: 'col-span-1' }
    ],
    prevProject: 'SapphireRidge',
    nextProject: 'TheCourtHouse'
  };

  return <PortfolioProject projectData={projectData} />;
}