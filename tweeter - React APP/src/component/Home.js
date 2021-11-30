import React ,{ useCallback, createContext, useState} from 'react';
import TweetForm from './tweetForm';
import TweetList from './tweetList';


export default function Home(props) {
  
      return (
      <div >
         <TweetForm userName={props.userName}  />
         <TweetList/> 
      </div>)
  
}

