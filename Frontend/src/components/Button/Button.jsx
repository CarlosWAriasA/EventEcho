function Button({ onClick, className, style, label }) {
  return (
    <button
      onClick={onClick}
      style={style}
      className={
        className ||
        "bg-blue-950 p-2 pl-5 pr-5 rounded-lg text-white hover:bg-blue-900 w-36"
      }
    >
      {label}
    </button>
  );
}

export default Button;
