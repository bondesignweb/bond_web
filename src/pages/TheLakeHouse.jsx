import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function TheLakeHouse() {
  const projectData = {
    title: 'THE LAKE HOUSE',
    year: '2024',
    projectType: 'New Construction',
    designers: 'Jennifer Chipman',
    location: 'Eden, Utah',
    scope: 'New Construction & Furnishings',
    contractor: 'Watts Living',
    architect: '',
    description: 'Nestled in the mountains of Eden, Utah, and situated on the quaint banks of its own private lake, this family lake house was built to be a gathering place for generations to come. Here, a connection with nature, from its sequestered location to the locally-sourced, reclaimed timber used throughout, reigns supreme.',
    images: [
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4039-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3964-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3991-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3974-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3997-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-v3-Bond-Eden-Lakehouse-4004-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3893-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3896-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4029-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4086-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4102-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4128-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3660-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3680-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4057-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3703-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-V2-Bond-Eden-Lakehouse-3781-nicole-gerulat-1.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3805-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3817-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3824-nicole-gerulat.jpg', span: 'col-span-1' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-3846-nicole-gerulat.jpg', span: 'col-span-2' },
    { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2024/02/2023-01-15-Bond-Eden-Lakehouse-4069-nicole-gerulat.jpg', span: 'col-span-1' }
    ],
    nextProject: 'UpcomingFreshTakeOnFrench'
  };
  return <PortfolioProject projectData={projectData} />;
}
