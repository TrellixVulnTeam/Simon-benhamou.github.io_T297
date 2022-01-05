import React from 'react'

export default function PrivateRoute(props){
    if(props.auth === true){
       return <>{props.children}</>
    }
    return (<></>)
  }
