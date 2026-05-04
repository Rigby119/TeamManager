function downloadJson(data, filename) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

function today() {
    return new Date().toISOString().slice(0, 10)
}

export function exportMembers(members) {
    downloadJson(members, `teammanager-perfiles-${today()}.json`)
}

export function importMembers(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result)
                if (!Array.isArray(data)) return reject(new Error('Not an array'))
                // Validate minimum structure
                const valid = data.filter(m => typeof m.name === 'string' && typeof m.id === 'string')
                if (valid.length === 0 && data.length > 0) return reject(new Error('No valid members'))
                resolve(valid.length > 0 ? valid : data)
            } catch {
                reject(new Error('Invalid JSON'))
            }
        }
        reader.onerror = () => reject(new Error('Read error'))
        reader.readAsText(file)
    })
}

export function exportSchedule(schedule) {
    const safeName = schedule.name.replace(/[^a-z0-9]/gi, '-').toLowerCase().slice(0, 30)
    downloadJson(schedule, `teammanager-${safeName}-${today()}.json`)
}

export function importSchedule(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = e => {
            try {
                const data = JSON.parse(e.target.result)
                // Validate minimum structure
                if (
                    typeof data.name !== 'string' ||
                    typeof data.params !== 'object' ||
                    typeof data.assignments !== 'object'
                ) {
                    return reject(new Error('Invalid schedule structure'))
                }
                resolve(data)
            } catch {
                reject(new Error('Invalid JSON'))
            }
        }
        reader.onerror = () => reject(new Error('Read error'))
        reader.readAsText(file)
    })
}
