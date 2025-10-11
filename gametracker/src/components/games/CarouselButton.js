export default function CarouselButton({ onClick, disabled, children, className }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`p-2 bg-gray-800/60 rounded-full hover:bg-gray-700 disabled:opacity-0 transition-all ${className}`}
    >
      {children}
    </button>
  );
}