import { useState } from 'react'
import Button from '../ui/Button'
import { DAYS, DAY_LABELS } from '../../constants/time'
import Select from '../ui/Select'

function pad(n) { return String(n).padStart(2, '0') }

export default function StepResult({ assignments, params, members, onSave, onBack }) {
    const [saving, setSaving] = useState(false)
    const [scheduleName, setScheduleName] = useState('')
    const [localAssignments, setLocalAssignments] = useState({ ...assignments })

    const { shiftDuration, startHour, shiftsPerDay } = params

    const slots = []
    for (let i = 0; i < shiftsPerDay; i++) {
        const hour = startHour + i * shiftDuration
        slots.push({ index: i, hour, label: `${pad(hour)}:00–${pad(hour + shiftDuration)}:00` })
    }

    function getMemberName(id) {
        if (!id) return ''
        const m = members.find(m => m.id === id)
        return m ? m.name : 'Miembro eliminado'
    }

    function handleCellChange(day, slotIndex, memberId) {
        const key = `${day}-${slotIndex}`
        setLocalAssignments(prev => ({ ...prev, [key]: memberId || null }))
    }

    function handleSave() {
        if (!scheduleName.trim()) { setSaving(true); return }
        onSave(scheduleName.trim(), localAssignments)
    }

    return (
        <div className="flex flex-col gap-5 p-4">
            <div>
                <h2 className="font-display font-semibold text-lg text-txt">Resultado</h2>
                <p className="text-txt2 text-sm">Edita celdas si necesitas ajustar asignaciones</p>
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
                                    const val = localAssignments[key] ?? ''
                                    return (
                                        <td key={d} className="py-1 px-1">
                                            <Select
                                                value={val}
                                                onChange={option => handleCellChange(d, slot.index, option)}
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

            {saving && (
                <div className="card flex flex-col gap-3">
                    <label className="field-label">Nombre del calendario (máx. 50 caracteres)</label>
                    <input
                        autoFocus
                        className="input-base"
                        value={scheduleName}
                        onChange={e => setScheduleName(e.target.value.slice(0, 50))}
                        placeholder="Ej. Semana 20 - Admisiones"
                        maxLength={50}
                    />
                    <div className="flex gap-3">
                        <Button variant="secondary" fullWidth onClick={() => setSaving(false)}>Cancelar</Button>
                        <Button variant="primary" fullWidth
                            disabled={!scheduleName.trim()}
                            onClick={() => onSave(scheduleName.trim(), localAssignments)}>
                            Confirmar
                        </Button>
                    </div>
                </div>
            )}

            <div className="flex gap-3">
                <Button variant="secondary" fullWidth onClick={onBack}>← Volver</Button>
                {!saving && (
                    <Button variant="primary" fullWidth onClick={() => setSaving(true)}>
                        Guardar calendario
                    </Button>
                )}
            </div>
        </div>
    )
}
