import React from 'react'

const Footer = () => {
    return (
        <div className='foot-div'>
            <h5 className='dev_id'>Coded with <i class='bx bxs-heart' style='color:#f60505'  ></i> by Abhishek | </h5>
            <p>
            <Link to={{ pathname: "https://www.linkedin.com/in/abhishek-dhanke-226354216/" }} target="_blank" /><i class='bx bxl-linkedin-square' style='color:#008ffc'  ></i>
            </p>
        </div>
    )
}

export default Footer
