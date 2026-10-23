import { useState } from 'react';
import './Avatar.css';

function getInitials(name = '') {
  return name
    .split(' ')
    .filter(Boolean)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

// Round profile image that falls back to the person's initials when the
// image URL is missing or fails to load. Pass `size` (px) for a fixed size,
// or omit it and size the avatar with `className` in CSS.
export default function Avatar({ src, name, size, alt = '', className = '' }) {
  const [failed, setFailed] = useState(false);
  const style = size ? { width: size, height: size } : undefined;

  if (!src || failed) {
    return (
      <span
        className={`avatar avatar--fallback ${className}`}
        style={style}
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
      >
        {getInitials(name) || '?'}
      </span>
    );
  }

  return (
    <img
      className={`avatar ${className}`}
      src={src}
      alt={alt}
      width={size}
      height={size}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}
