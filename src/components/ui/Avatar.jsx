function hashColor(name) {
    const colors = [
        '#A78BFA', '#60A5FA', '#34D399', '#F472B6', '#FBBF24',
        '#F87171', '#38BDF8', '#A3E635', '#FB923C', '#E879F9',
    ]
    let hash = 0
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash)
    return colors[Math.abs(hash) % colors.length]
}

function initials(name) {
    if (!name) return '?'
    const parts = name.trim().split(/\s+/)
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
}

export default function Avatar({ name = '', size = 'md', color }) {
    const bg = color ?? hashColor(name)
    return (
        <div
            className={`${sizes[size]} rounded-full flex items-center justify-center font-display font-bold text-white flex-shrink-0`}
            style={{ backgroundColor: bg }}
        >
            {initials(name)}
        </div>
    )
}
