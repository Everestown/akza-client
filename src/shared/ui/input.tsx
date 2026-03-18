import * as React from 'react'
interface Props extends React.InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string }
export const Input = React.forwardRef<HTMLInputElement,Props>(({ label, error, id, className, ...p }, ref) => {
  const uid = id ?? React.useId()
  return (
    <div className="flex flex-col gap-1">
      {label && <label htmlFor={uid} className="section-tag mb-1">{label}</label>}
      <input ref={ref} id={uid} className={`input-base ${error?'border-red-hot/60':''} ${className??''}`} {...p}/>
      {error && <p className="text-[11px] text-red-hot mt-1">{error}</p>}
    </div>
  )
})
Input.displayName = 'Input'
