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

const MedicineImageArea = (props) => {
    const classes = useStyles();
    const { medicineImage, setMedicineImage} = props;

    const [preview, setPreview] = useState(medicineImage?.path || "");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // プレビュー用
            setMedicineImage(file); // Fileオブジェクトを保持
        }
    };

    return(
        <div>
            <div className="p-grid_list-images">
                { preview&& <img src={preview} alt="プレビュー" style={{ maxWidth: 200 }} />}
                <IconButton>
                    <input
                        accept="image/*"
                        className={classes.input}
                        id="icon-button-medicine-image"
                        onChange={handleImageChange}
                        type="file"
                        style={{ display: 'none' }}
                    />
                    <label htmlFor="icon-button-medicine-image">
                        <AddPhotoAlternateIcon className={classes.icon} />
                    </label>
                </IconButton>
            </div>
        </div>
    )
}

export default MedicineImageArea;
