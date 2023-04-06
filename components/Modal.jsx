import React from 'react';
import Button from './Button';

const Modal = (props) => {
  const { children, onClose, open, title, onSave } = props;
  const handleSave = () => {
    onSave();
    onClose();
  }

  return <>
    {
      open &&
      <div className='w-screen h-screen fixed top-0 left-0 flex justify-center items-center'>
        <div className='absolute top-0 left-0 w-full h-full bg-[#00000090]' onClick={onClose}></div>
        <div className='relative z-10 w-full max-w-xl bg-white rounded'>
          <div className='px-5 py-3 relative'>
            <p className='font-medium text-2xl'>{title}</p>
            <span className='text-5xl leading-7 cursor-pointer absolute top-1/2 right-5 -translate-y-1/2'>×</span>
          </div>
          <div className='p-5 border-y'>
            {children}
          </div>
          <div className='flex justify-end p-5'>
            <Button className="mr-3" onClick={handleSave}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </div>
        </div>
      </div>
    }
  </>
}

export default Modal;