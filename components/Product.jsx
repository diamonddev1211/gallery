import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toPng } from 'html-to-image';
import Button from './Button';
import Modal from './Modal';
import TextField from './TextField';

const Product = (props) => {
  let canvas;
  let ctx;
  const [note, setNote] = useState("");
  const [isOpenedPhotoModal, setIsOpenedPhotoModal] = useState(false);
  const [isOpenedNoteModal, setIsOpenedNoteModal] = useState(false);

  const handleDownloadJSONFile = () => {
    const json = JSON.stringify({ ...props, note });
    const blob = new Blob([json], { type: 'application/json' });
    const a = document.createElement("a");
    a.href = window.URL.createObjectURL(blob);
    a.download = props.id;
    a.click();
    setNote("");
  }

  const handleUpdateProductURL = () => {
    props.onUpdate(props.id, canvas.toDataURL('image/png'))
  }

  useEffect(() => {
    if (isOpenedPhotoModal) {
      canvas = document.getElementById('canvas');
      canvas.width = 536;
      ctx = canvas.getContext("2d");
      if (props.url.indexOf('http') === 0) {
        axios.get(`/api/photo/${props.id}`, { params: { url: props.url } }).then(res => {
          handleDrawImageToCanvas(`data:image/png;base64, ${res.data.url}`)
        });
        return;
      }
      handleDrawImageToCanvas(props.url)
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
    <img src={props.url} />
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
      onSave={handleUpdateProductURL}
    >
      <canvas id="canvas"></canvas>
    </Modal>

    <Modal
      title="Edit Notes"
      open={isOpenedNoteModal}
      onClose={() => setIsOpenedNoteModal(false)}
      onSave={handleDownloadJSONFile}
    >
      <TextField
        value={note}
        onChange={e => setNote(e.target.value)}
        label="Notes"
        name="notes"
        placeholder="Enter Notes"
      />
    </Modal>
  </div>
}

export default Product;