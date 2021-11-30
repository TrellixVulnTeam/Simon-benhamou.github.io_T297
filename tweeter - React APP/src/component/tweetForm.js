import React, { createContext, useCallback, useState,useMemo,useContext } from 'react';
import {Button,Alert} from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import '../App.css';
import {db} from '../firebase-config'
import{collection,addDoc} from 'firebase/firestore'

const TweetFromContext = createContext({})

export default function TweetForm({userName}) {

    const defaultValue = {id:uuidv4(),content:'',userName: userName, date:''}
    const [data,setData] = useState(defaultValue)

    const tweetRefCollection = collection(db,"tweets")

    const change = useCallback(
        (name,value) => {
            setData(d => Object.assign({},d,{[name]:value}))
        })

    const value = useMemo(function(){
        return Object.assign({},data,{change: change})
    },[data, change])

    const createTweet = async () => {
            await addDoc(tweetRefCollection, {id : uuidv4(), content: data.content, date: new Date().toISOString(),userName : userName})
            setData(defaultValue)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        createTweet()
        }

    return (
        <TweetFromContext.Provider value ={value}>
            <form>
                <TweetField name="content" />
                <PrimaryButton onSubmit={handleSubmit}>Tweet</PrimaryButton>
                <AlertChar>The tweet can't contain more then 140 chars.</AlertChar>
            </form>
        </TweetFromContext.Provider>
    )
}
function AlertChar({children}){
    const data = useContext(TweetFromContext)
    return (<div>{data.content.length > 140 ? <Alert className="alertText" variant='danger'>{children}</Alert> : null}</div>)
}
function PrimaryButton({onSubmit,children}){
    const data = useContext(TweetFromContext)
    return <Button onClick={onSubmit} disabled={data.content.length > 140 ? true : false} className="tweetButton" >{children}</Button>
}
function TweetField ({name}){
    const data =  useContext(TweetFromContext)
    const handleChange = function(e){
        data.change(e.target.name,e.target.value)
    }
    
    return  <textarea onChange={handleChange} name={name} value={data[name] || ''} className="tweetForm"  type="text" cols="45" rows="6" placeholder="What you have in mind..."></textarea>

}
