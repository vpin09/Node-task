import React from 'react'

function Token() {
   function callChange(){
    
        console.log('button clicked');
    }
  return (
    <div>
        <button onClick={callChange} >Hello</button>
    </div>
  )
}

export default Token