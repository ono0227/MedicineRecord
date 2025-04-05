import React from "react";

const BackGroundImage = (props) => {
    const backgroundimage = props.backgroundimage

    return (
        <div
            style={{
                backgroundImage:`url(${backgroundimage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
        />
    )
}

export default BackGroundImage;
