import { useState } from 'react'
import Button from '../ui/Button'
import Select from '../ui/Select'

function pad(n) { return String(n).padStart(2, '0') }

export default function StepParams({ params, onChange, onNext }) {
    const { shiftDuration, startHour, shiftsPerDay, weekStart, weekEnd } = params

    const endHour = startHour + shiftsPerDay * shiftDuration
    const limitError = endHour > 20
        ? `Configuración excede las 20:00 (termina a las ${pad(endHour)}:00). Ajusta los parámetros.`
        : null

    const dateError = weekStart && weekEnd && weekEnd < weekStart
        ? 'La fecha de fin debe ser igual o posterior al inicio'
        : null

    const canNext = !limitError && !dateError && weekStart && weekEnd

    // Start hour options: 8 to (20 - shiftDuration*shiftsPerDay)
    const maxStart = 20 - shiftDuration * shiftsPerDay
    const startOptions = []
    for (let h = 8; h <= maxStart; h++) startOptions.push(h)

    // Shifts per day: 1 to floor((20-startHour)/shiftDuration)
    const maxShifts = Math.floor((20 - startHour) / shiftDuration)
    const shiftOptions = []
    for (let i = 1; i <= Math.min(maxShifts, 6); i++) shiftOptions.push(i)

    return (
        <div className="flex flex-col gap-5 p-4">
            <div>
                <h2 className="font-display font-semibold text-lg text-txt">Parámetros</h2>
                <p className="text-txt2 text-sm">Define el rango de la semana y configuración de turnos</p>
            </div>

            <div className="card flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="field-label">Semana de inicio</label>
                    <input
                        type="date"
                        className="input-base"
                        value={weekStart}
                        onChange={e => onChange({ ...params, weekStart: e.target.value })}
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="field-label">Semana de fin</label>
                    <input
                        type="date"
                        className="input-base"
                        value={weekEnd}
                        onChange={e => onChange({ ...params, weekEnd: e.target.value })}
                    />
                    {dateError && <span className="text-error text-xs">{dateError}</span>}
                </div>
            </div>

            <div className="card flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <label className="field-label">Duración del turno</label>
                    <Select
                        value={shiftDuration}
                        onChange={option => {
                            onChange({ ...params, shiftDuration: Number(option) })
                        }}
                        options={
                            [1, 2].map(i => ({ value: i, label: `${i} hora${i > 1 ? 's' : ''}` }))
                        }
                        placeholder="Selecciona"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="field-label">Hora de inicio</label>
                    <Select
                        value={startHour}
                        onChange={option => {
                            onChange({ ...params, startHour: Number(option) })
                        }}
                        options={
                            startOptions.length > 0
                                ? startOptions.map(h => ({ value: h, label: `${pad(h)}:00` }))
                                : []
                        }
                        placeholder="Selecciona"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label className="field-label">Turnos por día</label>
                    <Select
                        value={shiftsPerDay}
                        onChange={option => {
                            onChange({ ...params, shiftsPerDay: Number(option) })
                        }}
                        options={
                            shiftOptions.length > 0
                                ? shiftOptions.map(i => ({ value: i, label: `${i} turnos` }))
                                : []
                        }
                        placeholder="Selecciona"
                    />
                </div>

                {limitError && (
                    <p className="text-error text-sm bg-error/10 rounded-lg px-3 py-2">{limitError}</p>
                )}

                <div className="text-txt2 text-xs">
                    Horario: {pad(startHour)}:00 – {pad(Math.min(endHour, 20))}:00 · {shiftsPerDay * 5} turnos totales
                </div>
            </div>

            <Button variant="primary" fullWidth disabled={!canNext} onClick={onNext}>
                Siguiente →
            </Button>
        </div>
    )
}
