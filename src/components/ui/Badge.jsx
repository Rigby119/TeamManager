const styles = {
    accent: 'bg-accent/20 text-accent border border-accent/30',
    success: 'bg-success/20 text-success border border-success/30',
    warn: 'bg-warn/20 text-warn border border-warn/30',
    error: 'bg-error/20 text-error border border-error/30',
    neutral: 'bg-border text-txt2 border border-border',
}

export default function Badge({ variant = 'neutral', children }) {
    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${styles[variant] ?? styles.neutral}`}>
            {children}
        </span>
    )
}
