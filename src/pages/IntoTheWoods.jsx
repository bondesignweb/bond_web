import React from 'react';
import PortfolioProject from '../components/PortfolioProject';

export default function IntoTheWoods() {
  const projectData = {
    title: 'INTO THE WOODS',
    year: '2022',
    projectType: 'Remodel',
    designers: 'Laura Kramer & Jennifer Chipman',
    location: 'Park City, Utah',
    scope: 'New Construction',
    description: 'A rustic mountain retreat that celebrates natural materials and authentic craftsmanship. This log cabin design combines traditional elements with contemporary comfort.',
    images: [
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-7.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Dining-.jpg?w=452&h=679&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Great-Room.jpg?w=1018&h=679&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-5.jpg?w=1686&h=1124&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-2.jpg?w=806&h=1124&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-3.jpg?w=781&h=1171&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-4.jpg?w=850&h=567&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-1.jpg?w=850&h=600&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kitchen-6.jpg?w=857&h=1171&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-27.jpg?w=893&h=595&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-28.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-7-1.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Primary-Bedroom-2.jpg?w=397&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Primary-Bedroom-1.jpg?w=396&h=595&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Primary-Bathroom.jpg?w=586&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar.lowres-54-1.jpg?w=1317&h=878&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Primary-Bathroom-2.jpg?w=585&h=878&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-woods-Office-Loft.jpg?w=745&h=497&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Living-Room.jpg?w=331&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-guest-Bedroom-Bath.jpg?w=745&h=497&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Iron-Bedroom.jpg?w=328&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-40.jpg?w=331&h=497&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Kings-Suite.jpg?w=1725&h=1150&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Camo-Bedroom.jpg?w=767&h=1150&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/LindsaySalazar-44.jpg?w=1663&h=1109&ssl=1', span: 'col-span-3' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-the-Woods-Pool-Bath.jpg?w=829&h=553&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Theater.jpg?w=829&h=552&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/photo_71723680-1500x1000-1.jpg?w=976&h=650&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Bunk-Bath.jpg?w=537&h=650&ssl=1', span: 'col-span-1' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Iinto-The-Woods-Exterior-1.jpg?w=975&h=650&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/06/Into-The-Woods-Exterior-2.jpg?w=1246&h=831&ssl=1', span: 'col-span-2' },
      { url: 'https://i0.wp.com/bonddesigncompany.com/wp-content/uploads/2022/05/photo_71723554-1500x1000-1.jpg?w=1246&h=831&ssl=1', span: 'col-span-2' }
    ],
    prevProject: 'TheBridgeHouse',
    nextProject: 'SapphireRidge'
  };

  return <PortfolioProject projectData={projectData} />;
}