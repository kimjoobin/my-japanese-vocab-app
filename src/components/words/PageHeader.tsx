import { ChevronLeft } from 'lucide-react';
import React from 'react';
import { useNavigate } from 'react-router';

interface PageHeaderProps {
  title: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title }) => {
const navigate = useNavigate();

  return (
    <div className='flex items-center py-4 px-4 border-b border-gray-200 dark:border-gray-700'>
      <ChevronLeft
        size={20}
        className='cursor-pointer'
        onClick={() => navigate(-1)}
      />
      <h2 className='text-xl font-bold flex-grow text-center'>{title}</h2>
      <div className='w-5'></div>
    </div>
  );
}
 
export default PageHeader;