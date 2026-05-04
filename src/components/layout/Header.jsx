export default function Header() {
    return (
        <header className="flex lg:hidden items-center gap-2.5 px-4 py-3 bg-surface border-b border-border flex-shrink-0">
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="2" width="10" height="10" rx="2.5" fill="#A78BFA" />
                <rect x="16" y="2" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.6" />
                <rect x="2" y="16" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.6" />
                <rect x="16" y="16" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.35" />
            </svg>
            <span className="font-display font-semibold text-lg text-txt tracking-tight">TeamManager</span>
        </header>
    )
}