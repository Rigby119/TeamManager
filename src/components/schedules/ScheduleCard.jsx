import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { DAYS, DAY_LABELS } from '../../constants/time'
import { exportSchedule } from '../../utils/exportImport'

function pad(n) { return String(n).padStart(2, '0') }

function formatDate(str) {
    if (!str) return '—'
    const [y, m, d] = str.split('-')
    return `${d}/${m}/${y}`
}

export default function ScheduleCard({ schedule, members, onView, onDelete }) {
    const today = new Date().toISOString().slice(0, 10)
    const isActive = schedule.params.weekStart <= today && today <= schedule.params.weekEnd

    // Count covered slots per day
    const dayCoverage = DAYS.map(day => {
        const total = schedule.params.shiftsPerDay
        const covered = Array.from({ length: total }, (_, i) => schedule.assignments[`${day}-${i}`])
            .filter(Boolean).length
        return { day, covered, total }
    })

    // Unique members in schedule
    const memberIds = new Set(Object.values(schedule.assignments).filter(Boolean))

    return (
        <div className="card flex flex-col gap-3">
            <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-display font-semibold text-txt truncate">{schedule.name}</span>
                        <Badge variant={isActive ? 'success' : 'neutral'}>{isActive ? 'Activo' : 'Cerrado'}</Badge>
                    </div>
                    <p className="text-txt2 text-xs mt-0.5">
                        {formatDate(schedule.params.weekStart)} – {formatDate(schedule.params.weekEnd)} · {memberIds.size} miembros
                    </p>
                </div>
            </div>

            {/* Mini bar per day */}
            <div className="flex gap-1">
                {dayCoverage.map(({ day, covered, total }) => {
                    const pct = total > 0 ? (covered / total) * 100 : 0
                    return (
                        <div key={day} className="flex-1 flex flex-col items-center gap-0.5">
                            <div className="w-full h-1.5 bg-border rounded-full overflow-hidden">
                                <div className="h-full bg-accent rounded-full transition-all" style={{ width: `${pct}%` }} />
                            </div>
                            <span className="text-[9px] text-txt2">{DAY_LABELS[day]}</span>
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-2 pt-1 border-t border-border">
                <Button variant="ghost" size="sm" onClick={() => exportSchedule(schedule)}>Exportar</Button>
                <Button variant="ghost" size="sm" onClick={() => onView(schedule)}>Ver detalle</Button>
                <Button variant="ghost" size="sm"
                    className="text-error hover:text-error ml-auto"
                    onClick={() => onDelete(schedule.id)}>
                    Eliminar
                </Button>
            </div>
        </div>
    )
}
