import React, { useEffect, useState } from 'react';
import './App.css';
import Image from './components/Image';
import LeftArrow from './components/LeftArrow';
import RightArrow from './components/RightArrow';
import Title from './components/Title';
import Pagination from './components/Pagination';
import Jumper from './components/Jumper';

function App() {
    // state
    const [comicData, setComicData] = useState({src:"", alt:""});
    const [comicId, setComicId] = useState(null);
    const [maxId, setMaxId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // interactivity
    function stepBack() {
        if (comicId > 1) {
            setComicId(comicId-1);
        } else {
            setComicId(1);
        }
    }

    function stepForward() {
        if (comicId < maxId) {
            setComicId(comicId+1);
        } else {
            setComicId(maxId);
        }
    }

    function stepTo(num) {
        if (num <= 0) {
            setComicId(1);
        } else if (num >= maxId) {
            setComicId(maxId);
        } else {
            setComicId(num);
        }
    }

    // data fetching
    /*  NOTE: I am using a different API url than the one provided in the email.
    The reason for this is that I found that the url provided in the email does not
    support CORS headers, making it inaccessible from the browser. I was not certain
    whether solving this was part of the exercise or not. The way to solve it would be
    to write a simple backend proxy that fetches the data from the original API and
    forwards it to the front-end app. In considering this, I decided to do what I would
    do if this was a real project, and favor using something that already exists.
    Therefore, I found this url, which provides an API that is identical to the other
    one in every way, except that it supports CORS headers, and therefore is directly
    usable from the app. */
    useEffect(() => {
        setIsLoading(true);
        if (comicId !== null) {
           fetch(`https://getxkcd.now.sh/api/comic?num=${comicId}`)
               .then((data) => {
                    return data.json();
               })
               .then((data) => {
                   setComicData(data);
                   setIsLoading(false);
               })
        } else {
            fetch("https://getxkcd.now.sh/api/comic?num=latest")
                .then((data) => {
                     return data.json();
                })
                .then((data) => {
                    setComicData(data);
                    setComicId(data.num);
                    setMaxId(data.num);
                    setIsLoading(false);
                })
        }
    }, [comicId]);

    if (isLoading) {
        return ( <div>Loading....</div>)
    }
    return (
        <>
            <Title title={comicData.title} month={comicData.month} day={comicData.day} year={comicData.year}/>
            <div id="mainPanel">
                <div id="arrows">
                    <LeftArrow isDisabled={comicId === 1} action={stepBack}/>
                    <RightArrow isDisabled={comicId === maxId} action={stepForward}/>
                </div>
                <Image url={comicData.img} alt={comicData.alt} />
            </div>
            <div id="navigation">
                <Pagination currentId={comicId} maxId={maxId} action={stepTo}/>
                <Jumper currentId={comicId} action={stepTo}/>
            </div>
        </>
    );
}

export default App;
