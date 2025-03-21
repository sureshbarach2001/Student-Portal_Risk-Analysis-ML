import { Link } from 'react-router-dom';

function Button({ children, variant = 'solid', to, ...props }) {
  const baseStyles = 'px-6 py-3 rounded-xl font-medium transition-colors';
  const variantStyles = variant === 'solid'
    ? 'bg-button-blue text-white hover:bg-blue-600'
    : 'border border-white text-white hover:bg-white hover:text-primary-blue';

  return (
    <Link to={to} className={`${baseStyles} ${variantStyles}`} {...props}>
      {children}
    </Link>
  );
}

export default Button;