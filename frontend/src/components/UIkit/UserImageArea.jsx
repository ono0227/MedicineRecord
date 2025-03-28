import React, { useState } from "react";
import IconButton from "@material-ui/core/IconButton";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
    icon: {
        height: 48,
        width: 48
    }
})

const UserImageArea = (props) => {
    const classes = useStyles();
    const { userimage, setUserImage} = props;
    
    const [preview, setPreview] = useState(userimage || "");
        
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // プレビュー用
            setUserImage(file); // Fileオブジェクトを保持
        }
    };

    return(
        <div>
            <div className="p-grid_list-images">
                { preview&& <img src={preview} alt="プレビュー" style={{ maxWidth: "100%" }} /> }
            </div>
            <div className="u-text-right">
                <span>画像を登録する</span>
                <IconButton className={classes.icon}>
                    <label>
                        <AddPhotoAlternateIcon />
                        <input 
                            className="u-display-none" 
                            type="file" 
                            accept="image/*"
                            onChange={handleImageChange} 
                        />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default UserImageArea
