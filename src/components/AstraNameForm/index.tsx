import React, { useEffect, useState, useRef } from 'react';

const originOptions = ['Славянское', 'Греческое', 'Римское', 'Скандинавское', 'Еврейское', 'Азиатское'];

const intellectualQualitiesList = [
    { id: 'analytical', name: 'Аналитический склад ума' },
    { id: 'creativity', name: 'Креативность' },
    { id: 'strategic', name: 'Стратегическое мышление' },
    { id: 'curiosity', name: 'Любознательность' },
    { id: 'intuition', name: 'Интуиция' },
    { id: 'logic', name: 'Логика' },
    { id: 'perceptiveness', name: 'Наблюдательность' }
];

const emotionalQualitiesList = [
    { id: 'empathy', name: 'Эмпатия' },
    { id: 'confidence', name: 'Уверенность в себе' },
    { id: 'resilience', name: 'Стрессоустойчивость' },
    { id: 'optimism', name: 'Оптимизм' },
    { id: 'patience', name: 'Терпение' },
    { id: 'charisma', name: 'Харизма' },
    { id: 'compassion', name: 'Сострадание' }
];

// FIX: Add strong types to component props to resolve type errors in reduce calls.
interface QualitiesSliderProps {
    qualitiesList: { id: string, name: string }[];
    values: { [key: string]: number };
    setValues: (values: { [key: string]: number }) => void;
    totalPointsLimit: number;
    onReset: () => void;
}

const QualitiesSlider = ({ qualitiesList, values, setValues, totalPointsLimit, onReset }: QualitiesSliderProps) => {
    // FIX: The untyped `values` prop caused an arithmetic operation error on the left-hand side.
    // By strongly typing props, we can ensure `value` is a number and fix the reduce operation.
    const totalPoints = Object.values(values).reduce((sum: number, value: number) => sum + value, 0);

    const handleChange = (id: string, value: string) => {
        const newValue = parseInt(value, 10);
        const oldValues = { ...values };
        const oldTotal = totalPoints - (oldValues[id] || 0);
        
        let newValues = { ...oldValues, [id]: newValue };
        let newTotal = oldTotal + newValue;

        if (newTotal > totalPointsLimit) {
            let excess = newTotal - totalPointsLimit;
            const otherKeys = qualitiesList.map(q => q.id).filter(key => key !== id);
            
            while (excess > 0 && otherKeys.length > 0) {
                for (let i = 0; i < otherKeys.length; i++) {
                    const key = otherKeys[i];
                    if (newValues[key] > 0) {
                        newValues[key]--;
                        excess--;
                    }
                    if (excess === 0) break;
                }
                 // FIX: The untyped values caused an arithmetic error on the right-hand side.
                 // Typing props ensures `b` is a number and fixes the reduce operation.
                 if (Object.values(newValues).reduce((a: number, b: number) => a + b, 0) <= totalPointsLimit) break;
            }
        }
        setValues(newValues);
    };

    return (
        <div className="qualities-container">
             <div className="total-points-info">
                <p>Вы можете распределить <strong>{totalPointsLimit}</strong> баллов между качествами. Выделите главные или распределите сбалансированно.</p>
                <span>Осталось: <strong>{totalPointsLimit - totalPoints}</strong></span>
            </div>
             <div className="qualities-header">
                <button type="button" onClick={onReset} className="reset-button">Сбросить</button>
            </div>
            {qualitiesList.map(({ id, name }) => (
                <div key={id} className="quality-slider">
                    <label htmlFor={id}>{name}</label>
                    <div className="slider-wrapper">
                        <input
                            type="range"
                            id={id}
                            name={id}
                            min="0"
                            max="10"
                            value={values[id]}
                            onChange={(e) => handleChange(id, e.target.value)}
                        />
                         <span className="quality-score" style={{'--val': values[id]} as React.CSSProperties}>{values[id]}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const AstraNameForm = () => {
    const [step, setStep] = useState(1);
    const [errors, setErrors] = useState({ pdr: '', phone: '', consent: ''});
    const formRef = useRef<HTMLElement>(null);
    
    const [formData, setFormData] = useState({
        gender: 'any',
        pdr: '',
        favNames: '',
        consent: false,
        origin: originOptions.reduce((acc, o) => ({...acc, [o]: false}), {}),
        inHonor: 'no',
        bySaints: 'no',
        intellectual: intellectualQualitiesList.reduce((acc, q) => ({ ...acc, [q.id]: 5 }), {}),
        emotional: emotionalQualitiesList.reduce((acc, q) => ({ ...acc, [q.id]: 5 }), {}),
        phone: ''
    });

    useEffect(() => {
        if(formRef.current) {
            formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [step]);
    
    const validatePDR = (dateStr: string): string => {
        if (!/^\d{2}\.\d{2}\.\d{4}$/.test(dateStr)) {
            return "Пожалуйста, введите дату в формате ДД.ММ.ГГГГ";
        }
        const parts = dateStr.split('.');
        const day = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1;
        const year = parseInt(parts[2], 10);
        const date = new Date(year, month, day);
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            return "Такой даты не существует. Проверьте число и месяц.";
        }
        return "";
    };

    const validatePhone = (phoneStr: string): string => {
        if (phoneStr.replace(/\D/g, '').length < 11) {
            return "Пожалуйста, введите полный номер телефона.";
        }
        return "";
    };

    const handlePDRChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value.replace(/\D/g, '');
        let formatted = '';
        if (input.length > 0) formatted = input.substring(0, 2);
        if (input.length >= 3) formatted += '.' + input.substring(2, 4);
        if (input.length >= 5) formatted += '.' + input.substring(4, 8);
        
        setFormData(prev => ({...prev, pdr: formatted }));
        if (errors.pdr) setErrors(prev => ({...prev, pdr: validatePDR(formatted)}));
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let input = e.target.value.replace(/\D/g, '');
        if (input.startsWith('7') || input.startsWith('8')) input = input.substring(1);
        let formatted = '+7 (';
        if (input.length > 0) formatted += input.substring(0, 3);
        if (input.length >= 4) formatted += ') ' + input.substring(3, 6);
        if (input.length >= 7) formatted += '-' + input.substring(6, 8);
        if (input.length >= 9) formatted += '-' + input.substring(8, 10);

        setFormData(prev => ({ ...prev, phone: formatted }));
        if (errors.phone) setErrors(prev => ({...prev, phone: validatePhone(formatted)}));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let error = '';
        if (name === 'pdr') error = validatePDR(value);
        if (name === 'phone') error = validatePhone(value);
        setErrors(prev => ({...prev, [name]: error}));
    };
    
    const handleOriginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            origin: { ...prev.origin, [name]: checked }
        }));
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if(name === 'consent') setErrors(prev => ({...prev, consent: ''}));
    };
    
    const setIntellectualValues = (values: { [key: string]: number }) => setFormData(prev => ({ ...prev, intellectual: values }));
    const setEmotionalValues = (values: { [key: string]: number }) => setFormData(prev => ({ ...prev, emotional: values }));

    const resetQualities = (qualityType: 'intellectual' | 'emotional') => {
        const list = qualityType === 'intellectual' ? intellectualQualitiesList : emotionalQualitiesList;
        const defaultValues = list.reduce((acc, q) => ({ ...acc, [q.id]: 5 }), {});
        setFormData(prev => ({ ...prev, [qualityType]: defaultValues }));
    };

    const nextStep = () => {
        let isValid = true;
        if (step === 1) {
            const pdrError = validatePDR(formData.pdr);
            if(pdrError) {
                setErrors(prev => ({...prev, pdr: pdrError}));
                isValid = false;
            }
            if (!formData.consent) {
                setErrors(prev => ({...prev, consent: "Необходимо ваше согласие на обработку данных."}));
                isValid = false;
            }
        }
        if (isValid) setStep(prev => Math.min(prev + 1, 5));
    };
    const prevStep = () => setStep(prev => Math.max(prev - 1, 1));
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const phoneError = validatePhone(formData.phone);
        if(phoneError) {
            setErrors(prev => ({...prev, phone: phoneError}));
            return;
        }
        console.log("Form Submitted:", formData);
        alert("Спасибо! Ваши данные отправлены.");
    }

    const STEPS = 5;

    return (
        <section ref={formRef} className="form-block-container" aria-labelledby="form-title">
            <header className="form-header">
                <h2 id="form-title" className="block-title">Заполните анкету и сразу получите 5-10 имен для ребенка</h2>
                <p>По каждому будет рассчитан индекс гармонии по методике Astra Name</p>
            </header>

            <div className="progress-bar" role="meter" aria-valuenow={step} aria-valuemin={1} aria-valuemax={STEPS}>
                {[...Array(STEPS)].map((_, i) => (
                    <div key={i} className={`progress-step ${i + 1 <= step ? 'active' : ''}`}>
                        <span>{i + 1}</span>
                    </div>
                ))}
            </div>

            <form className="harmony-form" onSubmit={handleSubmit} noValidate>
                {step === 1 && (
                    <div className="form-step active">
                        <fieldset>
                           <legend>Шаг 1: Основная информация</legend>
                            <div className="form-group">
                                <label className="field-title">Пол</label>
                                <div className="radio-group">
                                    <input type="radio" id="male" name="gender" value="male" onChange={handleChange} checked={formData.gender === 'male'} />
                                    <label htmlFor="male">Мальчик</label>
                                    <input type="radio" id="female" name="gender" value="female" onChange={handleChange} checked={formData.gender === 'female'}/>
                                    <label htmlFor="female">Девочка</label>
                                    <input type="radio" id="any-gender" name="gender" value="any" onChange={handleChange} checked={formData.gender === 'any'}/>
                                    <label htmlFor="any-gender">Неважно</label>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="pdr" className="field-title">Ожидаемая дата рождения (ПДР)</label>
                                <input type="text" id="pdr" name="pdr" placeholder="ДД.ММ.ГГГГ" value={formData.pdr} onChange={handlePDRChange} onBlur={handleBlur} maxLength={10} />
                                {errors.pdr && <p className="error-message">{errors.pdr}</p>}
                            </div>
                             <div className="form-group">
                                <label htmlFor="favNames" className="field-title">Ваши любимые варианты имен</label>
                                <input type="text" id="favNames" name="favNames" placeholder="Введите имена через запятую" value={formData.favNames} onChange={handleChange} />
                            </div>
                             <div className="form-group checkbox-group consent-group">
                                <input type="checkbox" id="consent" name="consent" checked={formData.consent} onChange={handleChange} required />
                                <label htmlFor="consent">Я даю согласие на обработку персональных данных.</label>
                                {errors.consent && <p className="error-message">{errors.consent}</p>}
                            </div>
                        </fieldset>
                    </div>
                )}
                 {step === 2 && (
                    <div className="form-step active">
                         <fieldset>
                            <legend>Шаг 2: Предпочтения и традиции</legend>
                             <div className="form-group origin-group">
                                <label className="field-title">Происхождение имени (можно выбрать несколько)</label>
                                <div className="checkbox-grid">
                                    {originOptions.map(origin => (
                                        <div key={origin} className="checkbox-group">
                                            <input type="checkbox" id={origin} name={origin} checked={formData.origin[origin]} onChange={handleOriginChange} />
                                            <label htmlFor={origin}>{origin}</label>
                                        </div>
                                    ))}
                                </div>
                             </div>
                             <div className="form-group switch-group">
                                 <label className="field-title">В честь родственника?</label>
                                 <label className="switch">
                                     <input type="checkbox" name="inHonor" checked={formData.inHonor === 'yes'} onChange={e => handleChange({ target: { name: 'inHonor', value: e.target.checked ? 'yes' : 'no' } } as any)} />
                                     <span className="slider"></span>
                                 </label>
                             </div>
                             {formData.origin['Славянское'] && (
                                <div className="form-group switch-group">
                                    <label className="field-title">Подбирать по святцам?</label>
                                    <label className="switch">
                                        <input type="checkbox" name="bySaints" checked={formData.bySaints === 'yes'} onChange={e => handleChange({ target: { name: 'bySaints', value: e.target.checked ? 'yes' : 'no' } } as any)} />
                                        <span className="slider"></span>
                                    </label>
                                </div>
                             )}
                         </fieldset>
                    </div>
                )}
                 {step === 3 && (
                    <div className="form-step active">
                        <fieldset>
                           <legend>Шаг 3: Интеллектуальные качества</legend>
                            <QualitiesSlider qualitiesList={intellectualQualitiesList} values={formData.intellectual} setValues={setIntellectualValues} totalPointsLimit={35} onReset={() => resetQualities('intellectual')} />
                        </fieldset>
                    </div>
                )}
                {step === 4 && (
                    <div className="form-step active">
                         <fieldset>
                           <legend>Шаг 4: Эмоциональные качества</legend>
                           <QualitiesSlider qualitiesList={emotionalQualitiesList} values={formData.emotional} setValues={setEmotionalValues} totalPointsLimit={35} onReset={() => resetQualities('emotional')} />
                        </fieldset>
                    </div>
                )}
                {step === 5 && (
                     <div className="form-step active">
                        <fieldset>
                           <legend>Шаг 5: Завершение</legend>
                           <div className="form-group">
                                <label htmlFor="phone" className="field-title">Номер телефона</label>
                                <input type="tel" id="phone" name="phone" placeholder="+7 (999) 999-99-99" value={formData.phone} onChange={handlePhoneChange} onBlur={handleBlur} required maxLength={18}/>
                                <p className="form-hint">Мы вышлем результат анализа и сохраним его в вашем профиле.</p>
                                {errors.phone && <p className="error-message">{errors.phone}</p>}
                            </div>
                        </fieldset>
                    </div>
                )}

                <div className="form-navigation">
                    {step > 1 && <button type="button" className="nav-button prev" onClick={prevStep}>Назад</button>}
                    {step < 5 && <button type="button" className="nav-button next" onClick={nextStep}>Далее</button>}
                    {step === 5 && <button type="submit" className="cta-button">Получить результат</button>}
                </div>
            </form>
        </section>
    );
};
