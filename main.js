import React from 'react'
import "./style2.css"

 
const Kpi = (props) => {
  return (
 
<div className='kpiComponentHead'>
    <div className='KpiComponent'>
<div className='num'>

{props.kpi1}

 
</div >

    </div>
 
    <div className='Kpibodytext'>
      
      <span>{props.text}</span>
      
    </div>
   
    </div>
  )
}
export default Kpi;