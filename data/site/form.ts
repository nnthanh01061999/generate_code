export const FORM_TYPES = ['input', 'input-number', 'text-area', 'date', 'range', 'time', 'week', 'month', 'year', 'select', 'async-select', 'switch', 'radio', 'checkbox'];

export const FORM_OBJ = {
    input: {
        componentName: 'InputControl',
        import: '@/components/controls/input/InputControl',
        defaultValue: "''",
    },
    'input-number': {
        componentName: 'InputNumberControl',
        import: '@/components/controls/input/InputNumberControl',
        defaultValue: 0,
    },
    'text-area': {
        componentName: 'InputTextAreaControl',
        import: '@/components/controls/input/InputTextAreaControl',
        defaultValue: "''",
    },
    date: {
        componentName: 'DatePickerControl',
        import: '@/components/controls/date-picker/DatePickerControl',
        defaultValue: undefined,
    },
    range: {
        componentName: 'RangePickerControl',
        import: '@/components/controls/date-picker/RangePickerControl',
        defaultValue: undefined,
    },
    time: {
        componentName: 'TimePickerControl',
        import: '@/components/controls/date-picker/TimePickerControl',
        defaultValue: undefined,
    },
    week: {
        componentName: 'WeekPickerControl',
        import: '@/components/controls/date-picker/WeekPickerControl',
        defaultValue: undefined,
    },
    month: {
        componentName: 'MonthPickerControl',
        import: '@/components/controls/date-picker/MonthPickerControl',
        defaultValue: undefined,
    },
    year: {
        componentName: 'YearPickerControl',
        import: '@/components/controls/date-picker/YearPickerControl',
        defaultValue: undefined,
    },
    select: {
        componentName: 'SelectControl',
        import: '@/components/controls/select/SelectControl',
        defaultValue: undefined,
    },
    'async-select': {
        componentName: 'AsyncSelectControl',
        import: '@/components/controls/select/AsyncSelectControl',
        defaultValue: undefined,
    },
    switch: {
        componentName: 'SwitchControl',
        import: '@/components/controls/switch/SwitchControl',
        defaultValue: false,
    },
    radio: {
        componentName: 'RadioControl',
        import: '@/components/controls/radio/RadioControl',
        defaultValue: "''",
    },
    checkbox: {
        componentName: 'CheckboxControl',
        import: '@/components/controls/checkbox/CheckboxControl',
        defaultValue: false,
    },
};
