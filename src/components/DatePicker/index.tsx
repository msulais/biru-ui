import { For, Match, Show, Switch, createEffect, createMemo, createSignal, mergeProps, splitProps, type VoidComponent } from "solid-js"
import { Transition } from "solid-transition-group"

import { getCurrentDate, getDate_Y, getDate_M, getWeekdayNames, isOutDate_YMD, isSameDate_YMD, getMonthNames, isOutDate_YM, isSameDate_YM, isOutDate_Y, isSameDate_Y, getMonthText, isInDate_YM } from "@/utils/datetime"
import { _animate, _calendarToday, _chevronLeft, _chevronRight, _children, _classList, _date, _day, _fill, _filled, _finished, _firstDate, _getDay, _iconCode, _includes, _lastDate, _locales, _month, _onClose, _onSelectDate, _outlined, _ref, _setFullYear, _setMonth, _spring, _substring, _then, _year } from "@/constants/string"
import { AnimationEffectTiming } from "@/enums/animation"

import { CalendarTodayIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/Icon"
import { Button, ButtonVariant, IconButton, SquareButton } from "@/components/Button"
import { repositionModal, closeModal, openModal, focusModal, Modal, type ModalProps, ModalPosition as DatePickerPosition } from "@/components/Modal/index"
import { useAppDataContext } from "@/components/AppData"
import './index.scss'

enum DatePickerOption {
    year,
    month,
    day
}

type DatePickerProps = ModalProps & {
    date?: Date
    firstDate?: Date
    lastDate?: Date
    locales?: Intl.LocalesArgument
    onSelectDate?: (value: Date) => unknown
}

const DatePicker: VoidComponent<DatePickerProps> = ($props) => {
    const $$props = mergeProps({
        locales:'en-US',
        date: getCurrentDate(),
        firstDate: new Date(getDate_Y() - 100, 0, 1),
        lastDate: new Date(getDate_Y() + 100, 11, 31),
    }, $props)
    const [props, other] = splitProps($$props, [
        _ref, _date, _onSelectDate,
        _firstDate, _lastDate, _locales,
        _classList, _children, _onClose
    ])
    const [value, setValue] = createSignal<Date>(getCurrentDate())
    const [dateOption, setDateOption] = createSignal<DatePickerOption>(DatePickerOption[_day])
    const [viewDate, setViewDate] = createSignal<Date>(getCurrentDate())
    const [startDay, setStartDay] = createSignal<number>(0)
    const [daysPerMonth, setDaysPerMonth] = createSignal<number>(31)
    const appData = useAppDataContext()
    const dateNow = getCurrentDate()
    let datePicker_ref: HTMLDialogElement

    function updateDateView(): void {
        let daysPerMonth = 31 // reset to default
        setStartDay(new Date(getDate_Y(viewDate()), getDate_M(viewDate()), 1)[_getDay]())

        // february
        if (getDate_M(viewDate()) == 1) {
            daysPerMonth = 28
            if (getDate_Y(viewDate()) % 4 == 0) daysPerMonth = 29
        }

        // april, june, september, november
        else if ([3, 5, 8, 10][_includes](getDate_M(viewDate()))) daysPerMonth = 30

        setDaysPerMonth(daysPerMonth)
    }

    function gotoSelectedDate(): void {
        setViewDate(value())
        updateDateView()
    }

    function next(): void {
        const newDate = new Date(viewDate())
        if (dateOption() == DatePickerOption[_day]) newDate[_setMonth](getDate_M(newDate) + 1)
        else if (dateOption() == DatePickerOption[_month]) newDate[_setFullYear](getDate_Y(newDate) + 1)
        else if (dateOption() == DatePickerOption[_year]) newDate[_setFullYear](getDate_Y(newDate) + 16)

        setViewDate(newDate)
        updateDateView()
    }

    function previous(): void {
        const newDate = new Date(viewDate())
        if (dateOption() == DatePickerOption[_day]) newDate[_setMonth](getDate_M(newDate) - 1)
        else if (dateOption() == DatePickerOption[_month]) newDate[_setFullYear](getDate_Y(newDate) - 1)
        else if (dateOption() == DatePickerOption[_year]) newDate[_setFullYear](getDate_Y(newDate) - 16)

        setViewDate(newDate)
        updateDateView()
    }

    createEffect(() => {
        const date = props[_date]

        setViewDate(date)
        setValue(date)
    })

    const DaysDate: VoidComponent = () => {
        return (<div style={{display: 'contents'}}>
            <div class="date-picker-days-name">
                <For each={getWeekdayNames(props[_locales])}>{d => <p>{d[_substring](0, 2)}</p>}</For>
            </div>
            <div class="date-picker-days">
                <For each={Array(startDay())[_fill](0)}>{_v => <div/>}</For>
                <For each={Array(daysPerMonth())[_fill](0)}>{(_v, i) => {
                    const date = createMemo(() => new Date(getDate_Y(viewDate()), getDate_M(viewDate()), i() + 1))
                    return (<SquareButton
                        onClick={() => {
                            setValue(date())
                            if (props[_onSelectDate]) props[_onSelectDate](date())

                            closeModal(datePicker_ref)
                        }}
                        disabled={isOutDate_YMD(date(), props[_firstDate], props[_lastDate])}
                        variant={isSameDate_YMD(date(), value())
                            ? ButtonVariant[_filled]
                            : isSameDate_YMD(date(), dateNow)
                                ? ButtonVariant[_outlined]
                                : undefined
                        }>
                        { i() + 1 }
                    </SquareButton>)
                }}</For>
            </div>
        </div>)
    }

    const MonthsDate: VoidComponent = () => {
        return (<div class="date-picker-month">
            <For each={getMonthNames(props[_locales])}>{(m, i) => {
                const date = createMemo(() => new Date(getDate_Y(viewDate()), i()))
                return (<Button
                    onClick={() => {
                        setViewDate(date())
                        setDateOption(DatePickerOption[_day])
                        updateDateView()
                    }}
                    disabled={isOutDate_YM(date(), props[_firstDate], props[_lastDate])}
                    variant={isSameDate_YM(date(), value())
                        ? ButtonVariant[_filled]
                        : isSameDate_YM(date(), dateNow)
                            ? ButtonVariant[_outlined]
                            : undefined
                    }>{m}</Button>)
            }}</For>
        </div>)
    }

    const YearsDate: VoidComponent = () => {
        return (<div class="date-picker-year">
            <For each={Array(16)[_fill](0)}>{(_, i) => {
                const date = createMemo(() => new Date(getDate_Y(viewDate()) + i(), 0))
                return (<Button
                    onClick={() => {
                        setViewDate(date())
                        setDateOption(DatePickerOption[_month])
                        updateDateView()
                    }}
                    disabled={isOutDate_Y(date(), props[_firstDate], props[_lastDate])}
                    variant={isSameDate_Y(date(), value())
                        ? ButtonVariant[_filled]
                        : isSameDate_Y(date(), dateNow)
                            ? ButtonVariant[_outlined]
                            : undefined
                    }>
                    {getDate_Y(viewDate()) + i()}
                </Button>)
            }}</For>
        </div>)
    }

    return (<Modal
        ref={r => {
            datePicker_ref = r
            if (props[_ref]) props[_ref](r)
        }}
        classList={{
            'date-picker': true,
            ...props[_classList]
        }}
        onClose={(ev) => {
            setDateOption(DatePickerOption[_day])
            if (props[_onClose]) props[_onClose](ev)
        }}
        {...other}>
        <div class="date-picker-header">
            <Button
                onClick={() => setDateOption(d => {
                    if (d == DatePickerOption[_month]) return DatePickerOption[_year]
                    return DatePickerOption[_month]
                })}>
                <Switch>
                    <Match when={dateOption() == DatePickerOption[_day]}>
                        {getMonthText(viewDate(), props[_locales]) + ' ' + getDate_Y(viewDate())}
                    </Match>
                    <Match when={dateOption() == DatePickerOption[_month]}>
                        {getDate_Y(viewDate())}
                    </Match>
                    <Match when={dateOption() == DatePickerOption[_year]}>
                        {getDate_Y(viewDate()) + '-' + (getDate_Y(viewDate()) + 15)}
                    </Match>
                </Switch>
            </Button>
            <Show when={
                (
                    (dateOption() == DatePickerOption[_day] && !isSameDate_YM(viewDate(), value()))
                    || (dateOption() == DatePickerOption[_month] && !isSameDate_Y(viewDate(), value()))
                    || (dateOption() == DatePickerOption[_year] && isOutDate_Y(value(), viewDate(), new Date(getDate_Y(viewDate()) + 15, 2, 3)))
                )
                && isInDate_YM(value(), props[_firstDate], props[_lastDate])}>
                <Show
                    when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_calendarToday] != undefined}
                    fallback={<SquareButton onClick={() => gotoSelectedDate()}><CalendarTodayIcon /></SquareButton>}>
                    <IconButton code={appData![_iconCode]![_calendarToday]!} onClick={() => gotoSelectedDate()}/>
                </Show>
            </Show>
            <Show
                when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_chevronLeft] != undefined}
                fallback={<SquareButton onClick={() => previous()}><ChevronLeftIcon/></SquareButton>}>
                <IconButton code={appData![_iconCode]![_chevronLeft]!} onClick={() => previous()}/>
            </Show>
            <Show
                when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_chevronRight] != undefined}
                fallback={<SquareButton onClick={() => next()}><ChevronRightIcon/></SquareButton>}>
                <IconButton code={appData![_iconCode]![_chevronRight]!} onClick={() => next()}/>
            </Show>
        </div>
        <Transition
            onEnter={(el, done) => {el[_animate](
                { opacity: [0, 1], transform: ['translateY(-12px)', 'none'] },
                { duration: 300, easing: AnimationEffectTiming[_spring] }
            )[_finished][_then](done)}}
            onExit={(el, done) => {el[_animate]({}, { duration: 0 })[_finished][_then](done)}}>
            <Switch>
                <Match when={dateOption() == DatePickerOption[_day]}><DaysDate/></Match>
                <Match when={dateOption() == DatePickerOption[_month]}><MonthsDate/></Match>
                <Match when={dateOption() == DatePickerOption[_year]}><YearsDate/></Match>
            </Switch>
        </Transition>
        {props[_children]}
    </Modal>)
}

export {
    DatePicker,
    openModal as openDatePicker,
    closeModal as closeDatePicker,
    focusModal as focusDatePicker,
    repositionModal as repositionDatePicker,
    DatePickerPosition
}
export type {
    DatePickerProps
}
export default DatePicker