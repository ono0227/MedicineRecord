import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const ImageArea = (props) => {
    const classes = useStyles();
    const image = props.image,
          setImage = props.setImage;
        
    const previewImage = (event) => {
        setImage("")
        setImage(window.URL.createObjectURL(event.target.files[0]))
    }

    return(
        <div>
            {image !== ""&& <img src={image} alt="プレビュー画像" /> }
            <span>画像を登録する</span>
            <IconButton className={classes.icon}>
                <label>
                  <AddPhotoAlternateIcon />
                  <input className="display-none" type="file" id="image" onChange={(event)=> previewImage(event)} />
                </label>
            </IconButton>
        </div>
    )
}

export default ImageArea
