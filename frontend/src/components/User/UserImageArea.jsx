import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { styled } from "@mui/material/styles";

const Input = styled('input')({
    display: 'none',
});

const UserImageArea = (props) => {
    const { userImage, setUserImage} = props;
    const [preview, setPreview] = useState(userImage?.path || "");

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setPreview(URL.createObjectURL(file)); // プレビュー表示させる画像を設定
            setUserImage(file); // 登録、更新に使う画像を設定
        }
    };

    return (
        <div>
            <div className="p-grid_list-images">
                {preview && <img src={preview} alt="プレビュー" style={{ maxWidth: 200 }} />}
                <IconButton component="label">
                    <AddPhotoAlternateIcon sx={{ height: 48, width: 48 }} />
                    <Input
                        accept="image/*"
                        id="icon-button-medicine-image"
                        onChange={handleImageChange}
                        type="file"
                    />
                </IconButton>
            </div>
        </div>
    );
};

export default UserImageArea;
