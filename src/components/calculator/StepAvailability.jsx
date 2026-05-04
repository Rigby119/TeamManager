import Button from '../ui/Button'
import Avatar from '../ui/Avatar'
import { DAYS, DAY_LABELS } from '../../constants/time'
import Checkbox from '../ui/Checkbox'

function pad(n) { return String(n).padStart(2, '0') }

export default function StepAvailability({ params, members, extraAssignees, onChangeExtra, onNext, onBack }) {
    const { shiftDuration, startHour, shiftsPerDay } = params

    // Build slots
    const slots = []
    for (let i = 0; i < shiftsPerDay; i++) {
        const hour = startHour + i * shiftDuration
        slots.push({ hour, label: `${pad(hour)}:00` })
    }

    const totalSlots = shiftsPerDay * 5
    const n = members.length
    const remainder = n > 0 ? totalSlots % n : 0

    function getStatus(member, day, hour) {
        const key = `${day}-${pad(hour)}`
        return member.availability?.[key] === true
    }

    function toggleExtra(id) {
        if (extraAssignees.includes(id)) {
            onChangeExtra(extraAssignees.filter(x => x !== id))
        } else if (extraAssignees.length < remainder) {
            onChangeExtra([...extraAssignees, id])
        }
    }

    if (members.length === 0) {
        return (
            <div className="flex flex-col gap-4 p-4">
                <div className="card text-center py-8 text-txt2 text-sm">
                    No hay miembros registrados. Agrega perfiles primero.
                </div>
                <Button variant="secondary" fullWidth onClick={onBack}>← Volver</Button>
            </div>
        )
    }

    return (
        <div className="flex flex-col gap-5 p-4">
            <div>
                <h2 className="font-display font-semibold text-lg text-txt">Disponibilidad</h2>
                <p className="text-txt2 text-sm">{totalSlots} turnos · {n} miembros</p>
            </div>

            <div className="overflow-x-auto -mx-4 px-4">
                <table className="text-xs border-separate border-spacing-0 w-full min-w-max">
                    <thead>
                        <tr>
                            <th className="text-left text-txt2 pb-2 pr-3 sticky left-0 bg-bg z-10">Miembro</th>
                            {DAYS.map(d => (
                                <th key={d} className="text-center text-txt2 pb-2 px-1 min-w-[2.5rem]">{DAY_LABELS[d]}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {members.map(m => (
                            <tr key={m.id}>
                                <td className="pr-3 py-1 sticky left-0 bg-bg z-10">
                                    <div className="flex items-center gap-1.5">
                                        <Avatar name={m.name} size="sm" />
                                        <span className="text-txt truncate max-w-[80px]">{m.name.split(' ')[0]}</span>
                                    </div>
                                </td>
                                {DAYS.map(d => {
                                    const anyAvail = slots.some(s => getStatus(m, d, s.hour))
                                    const allAvail = slots.every(s => getStatus(m, d, s.hour))
                                    return (
                                        <td key={d} className="text-center py-1 px-1">
                                            <span className={`inline-block w-3 h-3 rounded-full ${allAvail ? 'bg-success' : anyAvail ? 'bg-warn' : 'bg-error/60'}`} title={`${m.name} – ${DAY_LABELS[d]}`} />
                                        </td>
                                    )
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex gap-4 text-xs text-txt2">
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-success inline-block" />Todos los turnos</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-warn inline-block" />Algunos turnos</span>
                <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-error/60 inline-block" />Sin disponibilidad</span>
            </div>

            {remainder > 0 && (
                <div className="card flex flex-col gap-3">
                    <p className="text-txt font-medium text-sm">
                        Turnos sobrantes: <span className="text-accent">{remainder}</span>
                    </p>
                    <p className="text-txt2 text-xs">Selecciona {remainder} miembro{remainder > 1 ? 's' : ''} que recibirán un turno extra:</p>
                    <div className="flex flex-col gap-2">
                        {members.map(m => {
                            const selected = extraAssignees.includes(m.id)
                            const disabled = !selected && extraAssignees.length >= remainder
                            return (
                                <label key={m.id} className={`flex items-center gap-2 cursor-pointer ${disabled ? 'opacity-40' : ''}`}>
                                    <Checkbox
                                        checked={selected}
                                        disabled={disabled}
                                        onChange={() => toggleExtra(m.id)}
                                        size="sm"
                                    />
                                    <Avatar name={m.name} size="sm" />
                                    <span className="text-txt text-sm">{m.name}</span>
                                </label>
                            )
                        })}
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                <Button variant="secondary" fullWidth onClick={onBack}>← Volver</Button>
                <Button variant="primary" fullWidth
                    disabled={remainder > 0 && extraAssignees.length < remainder}
                    onClick={onNext}>
                    Generar →
                </Button>
            </div>
        </div>
    )
}
