import { useState } from 'react'
import { getItem, setItem } from '../utils/storage'

const KEY = 'tm_config'

const DEFAULTS = {
    defaultShiftDuration: 2,
    defaultStartHour: 8,
    defaultShiftsPerDay: 4,
}

export function useConfig() {
    const [config, setConfig] = useState(() => ({ ...DEFAULTS, ...getItem(KEY, {}) }))

    function updateConfig(partial) {
        const next = { ...config, ...partial }
        setConfig(next)
        setItem(KEY, next)
    }

    return { config, updateConfig }
}
