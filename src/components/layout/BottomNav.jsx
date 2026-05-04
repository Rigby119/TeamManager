const tabs = [
    {
        id: 'calculator',
        label: 'Calculadora',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
                <line x1="14" y1="17.5" x2="21" y2="17.5" />
                <line x1="17.5" y1="14" x2="17.5" y2="21" />
            </svg>
        ),
    },
    {
        id: 'schedules',
        label: 'Horarios',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <line x1="3" y1="10" x2="21" y2="10" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="7" y1="14" x2="9" y2="14" />
                <line x1="11" y1="14" x2="13" y2="14" />
                <line x1="15" y1="14" x2="17" y2="14" />
            </svg>
        ),
    },
    {
        id: 'profiles',
        label: 'Perfiles',
        icon: (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
        ),
    },
]

export default function BottomNav({ activeTab, onChange }) {
    return (
        <nav className="flex lg:flex-col bg-surface border-t lg:border-t-0 lg:border-r border-border flex-shrink-0 safe-pb lg:safe-pb-0 lg:w-64 order-last lg:order-first">

            {/* Contenedor del Logo: Oculto en móvil, visible como Header del Sidebar en Desktop */}
            <div className="hidden lg:flex items-center gap-2.5 px-6 py-6 mb-2">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="2" y="2" width="10" height="10" rx="2.5" fill="#A78BFA" />
                    <rect x="16" y="2" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.6" />
                    <rect x="2" y="16" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.6" />
                    <rect x="16" y="16" width="10" height="10" rx="2.5" fill="#A78BFA" fillOpacity="0.35" />
                </svg>
                <span className="font-display font-semibold text-xl text-txt tracking-tight">TeamManager</span>
            </div>

            {/* Enlaces de Navegación */}
            <div className="flex lg:flex-col w-full px-0 lg:px-4 gap-0 lg:gap-2">
                {tabs.map(tab => {
                    const active = tab.id === activeTab
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onChange(tab.id)}
                            className={`flex-1 lg:flex-none flex flex-col lg:flex-row items-center lg:justify-start gap-0.5 lg:gap-3 py-2 lg:py-3 lg:px-4 text-xs lg:text-sm font-medium transition-colors lg:rounded-lg ${active
                                ? 'text-accent lg:bg-accent/10'
                                : 'text-txt2 lg:hover:bg-white/5'
                                }`}
                        >
                            {tab.icon}
                            {tab.label}
                        </button>
                    )
                })}
            </div>
        </nav>
    )
}