import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './homeSkeleton.css';

const CardSkeleton = () => {
  return (
    <>
      <div className="card">
        <div className="img-section">
          <Skeleton className="height-skeleton"/>
        </div>
        <div className='text-section'> <Skeleton  className="text-skeleton"/></div>
        
      </div>
    </>
  );
};

export default CardSkeleton;
