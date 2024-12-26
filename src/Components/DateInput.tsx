import React from 'react';

const generalStyle: React.CSSProperties = {
  fontSize: '1rem',
  color: 'var(--color-2)',
  padding: 'var(--gap-s) .75rem',
  backgroundColor: 'var(--color-4)',
  borderRadius: 'var(--gap)'
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  marginBottom: 'var(--gap-s)',
  fontWeight: '600',
  ...generalStyle
}

const inputStyle: React.CSSProperties = {
  border: 'none',
  fontFamily: 'monospace',
  ...generalStyle
}

// React.ComponentProps<'input'>
type IDateInput = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

const DateInput = ({ label, name, id, ...props}: IDateInput) => {
  return (
    <div>
      <label htmlFor={name} style={labelStyle}>{label}</label>
      <input type="date" name={name} id={id} {...props} style={inputStyle}/>
    </div>
  )
}

export default DateInput