import React from "react";
import backgroundimage from "../assets/img/backgroundimage.jpeg"

const TimeLine = () => {
    return (
        <section className="c-section-wrapin">
            <div 
                style={{
                  background:`url(${backgroundimage}) center center no-repeat`,
                  backgroundSize: 'cover',
                  width: '100%',
                  height: '400px'
                }}
            >
                <h2>タイムライン</h2>
            </div>
        </section>
    )

}

export default TimeLine;
