const Button = ({ children, className, onClick }) => {
  return <button
    onClick={onClick}
    className={`${className} h-10 flex items-center justify-center text-white bg-blue-500 px-5 rounded font-medium`}>
    {children}
  </button>
}

export default Button;