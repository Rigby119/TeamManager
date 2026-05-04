import { useState } from 'react'
import Button from '../ui/Button'
import { DAYS, DAY_LABELS } from '../../constants/time'
import Select from '../ui/Select'

function pad(n) { return String(n).padStart(2, '0') }

function formatDate(str) {
    if (!str) return '—'
    const [y, m, d] = str.split('-')
    return `${d}/${m}/${y}`
}

export default function ScheduleDetail({ schedule, members, onUpdate, onBack }) {
    const [assignments, setAssignments] = useState({ ...schedule.assignments })
    const { shiftDuration, startHour, shiftsPerDay } = schedule.params

    const slots = []
    for (let i = 0; i < shiftsPerDay; i++) {
        const hour = startHour + i * shiftDuration
        slots.push({ index: i, label: `${pad(hour)}:00–${pad(hour + shiftDuration)}:00` })
    }

    function handleChange(day, slotIndex, memberId) {
        const key = `${day}-${slotIndex}`
        const next = { ...assignments, [key]: memberId || null }
        setAssignments(next)
        onUpdate(schedule.id, { assignments: next })
    }

    function getMemberName(id) {
        if (!id) return 'Vacío'
        const m = members.find(m => m.id === id)
        return m ? m.name : 'Miembro eliminado'
    }

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={onBack}>←</Button>
                <div className="flex-1 min-w-0">
                    <h2 className="font-display font-semibold text-txt truncate">{schedule.name}</h2>
                    <p className="text-txt2 text-xs">
                        {formatDate(schedule.params.weekStart)} – {formatDate(schedule.params.weekEnd)}
                    </p>
                </div>
            </div>

            <div className="overflow-x-auto -mx-4 px-4">
                <table className="text-xs border-separate border-spacing-1 w-full min-w-max">
                    <thead>
                        <tr>
                            <th className="text-left text-txt2 pb-1 pr-2 sticky left-0 bg-bg z-10">Turno</th>
                            {DAYS.map(d => (
                                <th key={d} className="text-center text-txt2 pb-1 px-1 min-w-[100px]">{DAY_LABELS[d]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {slots.map(slot => (
                            <tr key={slot.index}>
                                <td className="text-txt2 pr-2 py-1 sticky left-0 bg-bg z-10 whitespace-nowrap">{slot.label}</td>
                                {DAYS.map(d => {
                                    const key = `${d}-${slot.index}`
                                    const val = assignments[key] ?? ''
                                    return (
                                        <td key={d} className="py-1 px-1">
                                            <Select
                                                value={val}
                                                onChange={option => handleChange(d, slot.index, option)}
                                                options={members.map(m => ({ value: m.id, label: m.name }))}
                                                placeholder="— Vacío —"
                                            />
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="text-txt2 text-xs text-center">Los cambios se guardan automáticamente</p>
        </div>
    )
}
