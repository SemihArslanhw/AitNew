import * as React from 'react';

export default function LinearProgressWithLabel(props) {
  return (
     <div className={`w-full h-${props.height} text-sm font-bold bg-gray-200 flex items-center rounded-lg`}>
       <div style={{width:`${props.value}%`}} className={`flex justify-center ${props.height < 10 ? "text-sm" : "text-base"} bg-gray-700 items-center rounded-lg h-full`}>
        {props.value !== 0 ? props.value + "%" : <p>&nbsp;</p>} 
       </div>
     </div>
  );
}