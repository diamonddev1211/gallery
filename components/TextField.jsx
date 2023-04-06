import React from 'react';

const TextField = (props) => {
  const { label, name, value, onChange, placeholder } = props;
  return <div>
    <p className='font-medium mb-2'>{label}</p>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className='w-full min-h-[120px] border border-gray-300 rounded p-4'
    />
  </div >
}

export default TextField;