import React from 'react'


function Home() {

  const girl = require('../img/girl.png'); // with require

  
  return (
    <div>
    <h1 className='home-page-title'>Budget Tracker 24</h1>

    <img src={girl} className='homePageGirl'/>
    </div>
  )
}

export default Home