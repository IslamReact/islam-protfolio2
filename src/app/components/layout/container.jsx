export default function Container({ className = '', children }) {
  return <div className={`container-base ${className}`}>{children}</div>;
}
