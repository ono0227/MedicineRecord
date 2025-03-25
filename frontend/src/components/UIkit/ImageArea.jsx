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
    const image = props.nextuserimage,
          setImage = props.setNextUserImage;
        
    const previewImage = (event) => {
        setImage("");
        setImage(window.URL.createObjectURL(event.target.files[0]))
    }

    return(
        <div>
            <div className="p-grid_list-images">
                {image !== ""&& <img src={image} alt="プレビュー画像" /> }
            </div>
            <div className="u-text-right">
                <span>画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            className="u-display-none" type="file" id="image" 
                            onChange={(event)=> previewImage(event)} 
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default ImageArea
