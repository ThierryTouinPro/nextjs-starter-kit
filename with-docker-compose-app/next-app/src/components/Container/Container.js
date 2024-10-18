import React from 'react'

export default function Container(props) {
  return (
    <div className='container-fluid p-0'>
        {props.children}
    </div>
  )
}
