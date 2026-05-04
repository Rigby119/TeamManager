import { useState, useRef, useEffect } from 'react'

/**
 * Select custom — dropdown propio, hover estilizable, 100% Tailwind.
 * Props:
 *   value        — valor seleccionado
 *   onChange     — fn(value)
 *   options      — [{ value, label }]
 *   placeholder  — texto cuando no hay selección
 *   disabled
 *   className    — clases extra para el trigger
 */
export default function Select({ value, onChange, options = [], placeholder = '—', disabled = false, className = '' }) {
    const [open, setOpen] = useState(false)
    const ref = useRef(null)

    const selected = options.find(o => String(o.value) === String(value))

    // Cerrar al click fuera
    useEffect(() => {
        if (!open) return
        function handleClick(e) {
            if (ref.current && !ref.current.contains(e.target)) setOpen(false)
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [open])

    // Cerrar con Escape
    useEffect(() => {
        if (!open) return
        function handleKey(e) {
            if (e.key === 'Escape') setOpen(false)
        }
        document.addEventListener('keydown', handleKey)
        return () => document.removeEventListener('keydown', handleKey)
    }, [open])

    function handleSelect(opt) {
        onChange(opt.value)
        setOpen(false)
    }

    return (
        <div ref={ref} className={`relative ${disabled ? 'opacity-40 pointer-events-none' : ''}`}>
            {/* Trigger */}
            <button
                type="button"
                onClick={() => setOpen(v => !v)}
                className={`
          input-base flex items-center justify-between gap-2 text-left
          ${open ? 'border-accent' : ''}
          ${className}
        `}
            >
                <span className={selected ? 'text-txt' : 'text-txt2'}>
                    {selected ? selected.label : placeholder}
                </span>
                {/* Chevron */}
                <svg
                    className={`w-4 h-4 text-txt2 flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>
            </button>

            {/* Dropdown */}
            {open && (
                <ul
                    className="
            absolute z-50 mt-1 w-full
            bg-surface border border-border rounded-lg
            shadow-lg shadow-black/40
            max-h-56 overflow-y-auto
            py-1
            scrollbar-thin
          "
                    role="listbox"
                >
                    {options.map(opt => {
                        const isSelected = String(opt.value) === String(value)
                        return (
                            <li
                                key={opt.value}
                                role="option"
                                aria-selected={isSelected}
                                onClick={() => handleSelect(opt)}
                                className={`
                  px-3 py-2 text-sm cursor-pointer flex items-center gap-2
                  transition-colors duration-100
                  ${isSelected
                                        ? 'bg-accent/20 text-accent'
                                        : 'text-txt hover:bg-white/5 hover:text-txt'
                                    }
                `}
                            >
                                {isSelected && (
                                    <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                )}
                                {!isSelected && <span className="w-3.5" />}
                                {opt.label}
                            </li>
                        )
                    })}
                </ul>
            )}
        </div>
    )
}