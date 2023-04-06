import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from './Button';
import Modal from './Modal';
import TextField from './TextField';
import products from '@/utils/products.json';

const Product = ({index}) => {
  let canvas;
  let ctx;
  const [productInfo, setProductInfo] = useState({
    url: "https://img.freepik.com/free-photo/closeup-shot-beautiful-butterfly-with-interesting-textures-orange-petaled-flower_181624-7640.jpg",
    note: ""
  });

  const [isOpenedPhotoModal, setIsOpenedPhotoModal] = useState(false);
  const [isOpenedNoteModal, setIsOpenedNoteModal] = useState(false);

  const handleChange = (target, value) => {
    setProductInfo({ ...productInfo, [target]: value });
  }

  const handleDownloadJSONFile = () => {
    const blob = new Blob(
      [JSON.stringify(productInfo)],
      { type: 'application/json' }
    );
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = productInfo.note;
    a.click();
    handleChange("note", "");
  }

  useEffect(() => {
    if (isOpenedPhotoModal) {
      canvas = document.getElementById('canvas');
      canvas.width = 536;
      ctx = canvas.getContext("2d");
      if (productInfo.url.indexOf('http') === 0) {
        axios.get(`/api/photo`, { params: { url: products[index] } }).then(res => {
          handleDrawImageToCanvas(`data:image/png;base64, ${res.data.url}`)
        });
        return;
      }
      handleDrawImageToCanvas(productInfo.url)
    }
  }, [isOpenedPhotoModal]);

  const handleDrawImageToCanvas = url => {
    const photo = new Image;
    photo.onload = () => {
      const radio = photo.height / photo.width;
      canvas.height = 536 * radio;
      ctx.drawImage(photo, 0, 0, photo.width, photo.height, 0, 0, canvas.width, canvas.height);
      canvas.addEventListener("click", (e) => {
        drawRect(e.offsetX, e.offsetY)
      });
    }
    photo.src = url;
  }

  const drawRect = (x, y) => {
    ctx.fillStyle = '#FFF'
    ctx.fillRect(x - 3, y - 3, 6, 6);
  }

  return <div className='bg-white shadow-lg'>
    <img src={productInfo.url} className='w-full' />
    <div className='flex p-5 flex justify-between'>
      <Button onClick={() => setIsOpenedPhotoModal(true)}>
        Edit
      </Button>
      <Button onClick={() => setIsOpenedNoteModal(true)}>
        Request Edit
      </Button>
    </div>

    <Modal
      title="Edit Photo"
      open={isOpenedPhotoModal}
      onClose={() => setIsOpenedPhotoModal(false)}
      onSave={() => handleChange("url", canvas.toDataURL('image/png'))}
    >
      <canvas id="canvas"></canvas>
    </Modal>

    <Modal
      title="Edit Notes"
      open={isOpenedNoteModal}
      onClose={() => {
        setIsOpenedNoteModal(false);
        handleChange("note", "");
      }}
      onSave={handleDownloadJSONFile}
    >
      <TextField
        value={productInfo.note}
        onChange={e => handleChange('note', e.target.value)}
        label="Notes"
        name="notes"
        placeholder="Enter Notes"
      />
    </Modal>
  </div>
}

export default Product;