/**
 * Checkbox custom — sin appearance nativa, 100% Tailwind.
 * Props: checked, onChange, disabled, label, sublabel, size ('sm'|'md')
 */
export default function Checkbox({ checked, onChange, disabled = false, label, sublabel, size = 'md' }) {
    const box = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'
    const tick = size === 'sm' ? 'w-2.5 h-1.5' : 'w-3 h-2'

    return (
        <label className={`inline-flex items-start gap-2.5 select-none ${disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
            <div className="relative flex-shrink-0 mt-px">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    disabled={disabled}
                    onChange={e => !disabled && onChange(e.target.checked)}
                />
                {/* Box */}
                <div className={`
          ${box} rounded flex items-center justify-center
          border-2 transition-all duration-150
          ${checked
                        ? 'bg-accent border-accent'
                        : 'bg-transparent border-border hover:border-accent/60'
                    }
        `}>
                    {/* Checkmark SVG */}
                    <svg
                        className={`${tick} text-white transition-opacity duration-150 ${checked ? 'opacity-100' : 'opacity-0'}`}
                        viewBox="0 0 10 7"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="1,3.5 4,6.5 9,1" />
                    </svg>
                </div>
            </div>

            {(label || sublabel) && (
                <div className="flex flex-col leading-tight">
                    {label && <span className="text-txt text-sm">{label}</span>}
                    {sublabel && <span className="text-txt2 text-xs mt-0.5">{sublabel}</span>}
                </div>
            )}
        </label>
    )
}