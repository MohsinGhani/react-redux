import React from 'react';
import ReactLoading from 'react-loading';

export const Loading = ({isLoading, type, color, height = "50px", width = "50px"}) => {
  return (
      isLoading ?
        <div className="flexAndCenter">
             <ReactLoading type={type} color={color} height={height} width={width} />
        </div>
      :
      ''
  )
}