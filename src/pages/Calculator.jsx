import { useState } from 'react'
import StepParams from '../components/calculator/StepParams'
import StepAvailability from '../components/calculator/StepAvailability'
import StepResult from '../components/calculator/StepResult'
import { generateSchedule } from '../utils/scheduler'

const DEFAULT_PARAMS = {
    shiftDuration: 2,
    startHour: 8,
    shiftsPerDay: 4,
    weekStart: '',
    weekEnd: '',
}

export default function Calculator({ members, config, addSchedule, onGoToSchedules }) {
    const [step, setStep] = useState(1)
    const [params, setParams] = useState({
        ...DEFAULT_PARAMS,
        shiftDuration: config.defaultShiftDuration,
        startHour: config.defaultStartHour,
        shiftsPerDay: config.defaultShiftsPerDay,
    })
    const [extraAssignees, setExtraAssignees] = useState([])
    const [assignments, setAssignments] = useState(null)

    function handleToStep2() {
        setExtraAssignees([])
        setStep(2)
    }

    function handleToStep3() {
        const { assignments: gen } = generateSchedule(params, members, extraAssignees)
        setAssignments(gen)
        setStep(3)
    }

    function handleSave(name, finalAssignments) {
        addSchedule({
            name,
            params,
            assignments: finalAssignments,
        })
        onGoToSchedules()
    }

    // Step indicator
    const stepLabels = ['Parámetros', 'Disponibilidad', 'Resultado']

    return (
        <div className="flex flex-col min-h-full">
            {/* Step indicator */}
            <div className="flex items-center gap-0 px-4 pt-4 pb-2">
                {stepLabels.map((label, i) => {
                    const num = i + 1
                    const active = num === step
                    const done = num < step
                    return (
                        <div key={num} className="flex items-center flex-1 last:flex-none">
                            <div className="flex flex-col items-center gap-0.5">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${active ? 'bg-accent text-white' : done ? 'bg-accent/40 text-white' : 'bg-border text-txt2'}`}>
                                    {done ? '✓' : num}
                                </div>
                                <span className={`text-[10px] ${active ? 'text-accent' : 'text-txt2'}`}>{label}</span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div className={`flex-1 h-0.5 mx-1 mb-4 ${done ? 'bg-accent/40' : 'bg-border'}`} />
                            )}
                        </div>
                    )
                })}
            </div>

            {step === 1 && (
                <StepParams params={params} onChange={setParams} onNext={handleToStep2} />
            )}
            {step === 2 && (
                <StepAvailability
                    params={params}
                    members={members}
                    extraAssignees={extraAssignees}
                    onChangeExtra={setExtraAssignees}
                    onNext={handleToStep3}
                    onBack={() => setStep(1)}
                />
            )}
            {step === 3 && assignments && (
                <StepResult
                    assignments={assignments}
                    params={params}
                    members={members}
                    onSave={handleSave}
                    onBack={() => setStep(2)}
                />
            )}
        </div>
    )
}
