import React, { createContext, useState ,useContext,useEffect} from 'react';
import {Card ,Container, Row ,Button} from 'react-bootstrap';
import {format,parseISO} from 'date-fns'
import {db,auth} from '../firebase-config'
import{collection,getDocs,orderBy,limit,query,startAfter,onSnapshot} from 'firebase/firestore'
import { onAuthStateChanged} from 'firebase/auth'

const TweetListContext = createContext({})

export default function TweetList() {
    
   const [databaseTweets,setDbTweets] = useState([])
   const [latestDoc,setLatestDoc] = useState({})
   const [accessButton,setAccessButton] = useState(false)
   const [user, setUser] = useState({})
   const [sortedArray,setSortedArray]=useState([])
   const[sort, setSort] = useState(false)
   const tweetRefCollection = collection(db,"tweets")

   onAuthStateChanged(auth, (currentUser) => {
        setUser(currentUser)
        
    })
    useEffect(() => {
        const getTweets = async () => {
        const orderData = query(tweetRefCollection, orderBy("date","desc"),limit(5));
        onSnapshot(orderData, (snapshot) => {
                setDbTweets(snapshot.docs.map((doc) => doc.data()));
                setLatestDoc(snapshot.docs[snapshot.docs.length - 1]);
                setAccessButton(false)
            })
        }
       getTweets()
    },[])

    const loadMore = async () => {
        const next = query(collection(db, "tweets"),orderBy("date","desc"),startAfter(latestDoc),limit(5))
        const data = await getDocs(next)
     
        setLatestDoc(data.docs[data.docs.length-1])
        if(data.empty)
        {
            return setAccessButton(true)
        }
        const serverData = data.docs.map((doc)=> ({...doc.data(),id : doc.id}))
        setDbTweets((preData) => [...preData, ...serverData])

    }
    const myTweetSort = () => {
        if(sort === true){
            return  setSort(false)
        }
        const result=  databaseTweets.filter((tweet) => tweet.userName === user.displayName || tweet.userName === user.email )
        setSortedArray(result)
        setSort(true)
    }

    return (
        <TweetListContext.Provider value={sort === false ? databaseTweets : sortedArray}>
                {/* {console.log(databaseTweets)} */}
                <Container style={{overflowY:"scroll"}}>
                                   
                 <Row className="justify-content-md-center d-block">
                     <Button  onClick={myTweetSort} style={{width:"10%"}}>{sort === false ? "My Tweets" : "All Tweets"}</Button>
                </Row>
                <Row className="justify-content-md-center d-inline-block">
                <Tweets  />
                </Row>
            </Container>
            {sort === false? <Button disabled={accessButton} onClick={loadMore}> Load more ...</Button> : null}
            </TweetListContext.Provider>
    )
}

function Tweets() {

    const data = useContext(TweetListContext)
    return (<div  style={{overflowY: "scroll"}}>
            {
               data.map((tweet) => {
                        return <TweetBox key={tweet.id} id={tweet.id} content={tweet.content} userName={tweet.userName} date={tweet.date}/> 
                    })
                }
        </div>)
    
}
 function TweetBox ({id,content,userName,date}){

        return ( 
            <Card  className="bg-dark text-white my-2 card-tweet" id={id} border="secondary" >
                 <Card.Header className="card-tweet-header">{userName} <span className="tweet-date">{format(parseISO(date),"MMM dd h:m a")}</span></Card.Header>
                <Card.Body><Card.Text>{content}</Card.Text></Card.Body>
            </Card>
            )
 }
