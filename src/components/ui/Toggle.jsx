export default function Toggle({ checked, onChange, label, sublabel }) {
    return (
        <label className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
                <input
                    type="checkbox"
                    className="sr-only"
                    checked={checked}
                    onChange={e => onChange(e.target.checked)}
                />
                <div className={`w-10 h-6 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-border'}`} />
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
            </div>
            {(label || sublabel) && (
                <div className="flex flex-col">
                    {label && <span className="text-txt text-sm font-medium">{label}</span>}
                    {sublabel && <span className="text-txt2 text-xs">{sublabel}</span>}
                </div>
            )}
        </label>
    )
}
