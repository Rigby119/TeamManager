import { useState } from 'react'
import Input from '../ui/Input'
import Toggle from '../ui/Toggle'
import Button from '../ui/Button'
import { DAYS, DAY_LABELS, HOURS, PHONE_PREFIXES } from '../../constants/time'
import Select from '../ui/Select'
import Checkbox from '../ui/Checkbox'

function buildDefaultAvailability() {
    const av = {}
    DAYS.forEach(day => {
        HOURS.slice(0, -1).forEach(h => {  // 08–19 (last is 20, which is end not start)
            av[`${day}-${h}`] = false
        })
    })
    return av
}

// Slots that can be shift *starts* — 08 to 19
const START_HOURS = HOURS.slice(0, -1) // ['08'..'19']

export default function ProfileForm({ member, onSave, onCancel }) {
    const [name, setName] = useState(member?.name ?? '')
    const [role, setRole] = useState(member?.role ?? '')
    const [isInternational, setIsInternational] = useState(member?.isInternational ?? false)
    const [prefix, setPrefix] = useState(() => {
        if (!member?.whatsapp) return '52'
        const found = PHONE_PREFIXES.find(p => member.whatsapp.startsWith(p.code))
        return found ? found.code : '52'
    })
    const [phone, setPhone] = useState(() => {
        if (!member?.whatsapp) return ''
        const found = PHONE_PREFIXES.find(p => member.whatsapp.startsWith(p.code))
        return found ? member.whatsapp.slice(found.code.length) : member.whatsapp
    })
    const [email, setEmail] = useState(member?.email ?? '')
    const [availability, setAvailability] = useState(() => ({
        ...buildDefaultAvailability(),
        ...(member?.availability ?? {}),
    }))
    const [errors, setErrors] = useState({})

    const waLink = phone ? `https://wa.me/${prefix}${phone.replace(/\D/g, '')}` : ''

    function toggleSlot(day, hour) {
        const key = `${day}-${hour}`
        setAvailability(prev => ({ ...prev, [key]: !prev[key] }))
    }

    function setAll(day, value) {
        setAvailability(prev => {
            const next = { ...prev }
            START_HOURS.forEach(h => { next[`${day}-${h}`] = value })
            return next
        })
    }

    function validate() {
        const e = {}
        if (!name.trim()) e.name = 'El nombre es obligatorio'
        setErrors(e)
        return Object.keys(e).length === 0
    }

    function handleSubmit() {
        if (!validate()) return
        const data = {
            name: name.trim(),
            role: role.trim(),
            isInternational,
            whatsapp: phone ? `${prefix}${phone.replace(/\D/g, '')}` : '',
            email: email.trim(),
            availability,
        }
        onSave(data)
    }

    const rolLen = role.length
    const rolWarn = rolLen >= 24
    const rolError = rolLen >= 30

    return (
        <div className="flex flex-col gap-5 p-4">
            <h2 className="font-display font-semibold text-lg text-txt">
                {member ? 'Editar miembro' : 'Nuevo miembro'}
            </h2>

            <Input
                label="Nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={40}
                showCount
                error={errors.name}
                placeholder="Nombre completo"
            />

            <div className="flex flex-col gap-1">
                <label className="field-label">Rol</label>
                <input
                    className={`input-base ${rolError ? 'border-error' : rolWarn ? 'border-warn' : ''}`}
                    value={role}
                    onChange={e => setRole(e.target.value)}
                    maxLength={30}
                    placeholder="Ej. Asesor, Coordinador…"
                />
                <div className="flex justify-end">
                    <span className={`text-xs ${rolError ? 'text-error' : rolWarn ? 'text-warn' : 'text-txt2'}`}>
                        {rolLen}/30
                    </span>
                </div>
            </div>

            <Toggle
                checked={isInternational}
                onChange={setIsInternational}
                label="Estudiante internacional"
                sublabel="Se mostrará un badge en su perfil"
            />

            {/* Phone */}
            <div className="flex flex-col gap-1">
                <label className="field-label">Teléfono</label>
                <div className="flex gap-2">
                    <Select
                        value={prefix}
                        onChange={option => setPrefix(option)}
                        options={PHONE_PREFIXES.map(p => ({ value: p.code, label: p.label }))}
                        placeholder="Código de país"
                        className="w-32 flex-shrink-0"
                    />
                    <input
                        className="input-base flex-1"
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="Número sin prefijo"
                        inputMode="tel"
                    />
                </div>
            </div>

            <Input
                label="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                type="email"
                placeholder="correo@ejemplo.com"
            />

            {/* Availability grid */}
            <div className="flex flex-col gap-3">
                <p className="section-label">Disponibilidad semanal</p>
                <div className="overflow-x-auto -mx-4 px-4">
                    <table className="w-full text-xs border-separate border-spacing-0">
                        <thead>
                            <tr>
                                <th className="text-left text-txt2 pb-2 pr-2 w-12">Hora</th>
                                {DAYS.map(d => (
                                    <th key={d} className="text-center text-txt2 pb-2 px-1">{DAY_LABELS[d]}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {START_HOURS.map(h => (
                                <tr key={h}>
                                    <td className="text-txt2 pr-2 py-0.5">{h}:00</td>
                                    {DAYS.map(d => {
                                        const key = `${d}-${h}`
                                        const checked = availability[key] ?? false
                                        return (
                                            <td key={d} className="text-center py-0.5 px-1">
                                                <Checkbox
                                                    checked={checked}
                                                    onChange={() => toggleSlot(d, h)}
                                                    size="sm"
                                                />
                                            </td>
                                        )
                                    })}
                                </tr>
                            ))}

                            <tr>
                                <td className="text-txt2 font-bold pr-2 pt-3 pb-1">Acciones</td>
                                {DAYS.map(d => (
                                    <td key={d} className="text-center pt-3 pb-1 px-1">
                                        <div className="flex flex-col items-center gap-1">
                                            <Button
                                                variant="primary"
                                                fullWidth
                                                size='sm'
                                                onClick={() => setAll(d, true)}
                                                className='hover:underline'
                                            >
                                                Todos
                                            </Button>
                                            <Button
                                                variant="secondary"
                                                fullWidth
                                                size='sm'
                                                onClick={() => setAll(d, false)}
                                                className='hover:underline'
                                            >
                                                Limpiar
                                            </Button>
                                        </div>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="flex gap-3 pt-2">
                <Button variant="secondary" onClick={onCancel} fullWidth>Cancelar</Button>
                <Button variant="primary" onClick={handleSubmit} fullWidth>Guardar</Button>
            </div>
        </div>
    )
}
