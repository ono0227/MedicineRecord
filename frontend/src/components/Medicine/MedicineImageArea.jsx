import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate'
import IconButton from '@mui/material/IconButton'
import { styled } from '@mui/material/styles'
import React, { useState } from 'react'

const Input = styled('input')({
  display: 'none',
})

const MedicineImageArea = (props) => {
  const { medicineImage, setMedicineImage } = props
  const [preview, setPreview] = useState(medicineImage?.path || '')

  const handleImageChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      setPreview(URL.createObjectURL(file)) //プレビュー表示させる画像を設定
      setMedicineImage(file) //登録、更新に使う画像を設定
    }
  }

  return (
    <div>
      <div className="p-grid_list-images">
        {preview && <img src={preview} alt="プレビュー" style={{ maxWidth: 200 }} />}
        <IconButton component="label">
          <AddPhotoAlternateIcon sx={{ height: 48, width: 48 }} />
          <Input accept="image/*" id="icon-button-medicine-image" onChange={handleImageChange} type="file" />
        </IconButton>
      </div>
    </div>
  )
}

export default MedicineImageArea
