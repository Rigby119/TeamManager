export default function Input({
    label,
    maxLength,
    showCount = false,
    error,
    className = '',
    value = '',
    ...rest
}) {
    const len = value?.length ?? 0
    const nearLimit = maxLength && len >= maxLength * 0.8
    const atLimit = maxLength && len >= maxLength

    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="field-label">
                    {label}
                </label>
            )}
            <input
                value={value}
                maxLength={maxLength}
                className={`input-base ${error ? 'border-error focus:ring-error' : ''} ${className}`}
                {...rest}
            />
            <div className="flex justify-between items-center min-h-[1rem]">
                {error ? (
                    <span className="text-error text-xs">{error}</span>
                ) : (
                    <span />
                )}
                {showCount && maxLength && (
                    <span className={`text-xs ${atLimit ? 'text-error' : nearLimit ? 'text-warn' : 'text-txt2'}`}>
                        {len}/{maxLength}
                    </span>
                )}
            </div>
        </div>
    )
}
