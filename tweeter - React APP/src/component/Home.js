import React ,{ useCallback, createContext, useState} from 'react';
import TweetForm from './tweetForm';
import TweetList from './tweetList';

export const HomeContext = createContext({})

export default function Home(props) {
  
      return (
      <HomeContext.Provider >
         <TweetForm userName={props.userName}  />
         <TweetList/> 
      </HomeContext.Provider>)
  
}

