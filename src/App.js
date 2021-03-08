import React, { useEffect, useState } from 'react';
import './App.css';
import Image from './Image.js';
import LeftArrow from './LeftArrow';
import RightArrow from './RightArrow';
import Title from './Title';
import Pagination from './Pagination';
import Jumper from './Jumper';

function App() {
    const [comicData, setComicData] = useState({src:"", alt:""});
    const [comicId, setComicId] = useState(null);
    const [maxId, setMaxId] = useState(null);

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

    useEffect(() => {
        fetch("https://getxkcd.now.sh/api/comic?num=latest")
        .then((data) => {
             return data.json()
        })
        .then((data) => {
            setComicData(data);
            setComicId(data.num);
            setMaxId(data.num);
        })
    }, []);

    useEffect(() => {
        if (comicId !== null) {
           fetch(`https://getxkcd.now.sh/api/comic?num=${comicId}`)
               .then((data) => {
                    return data.json()
               })
               .then((data) => {
                   setComicData(data);
               })
        }
    }, [comicId]);

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
