import { createEffect, createMemo, createSignal, Match, mergeProps, Show, splitProps, Switch, type JSX, type ParentComponent } from "solid-js"

import type { ComponentEvent } from "@/types/event"
import { _check, _compact, _disabled, _children, _value, _onValueChanged, _variant, _class, _onClick, _desktopCompact, _focused, _disableScale, _iconCode, _checkBoxUnchecked, _radio, _radioButtonUnchecked, _checkBoxChecked, _radioButtonChecked, _accent } from "@/constants/string"
import { toggleAttribute } from "@/utils/attributes"
import { isVarHasValue } from "@/utils/data"
import { CSSInlineStyleColors } from "@/enums/colors"

import Icon, { CheckBoxCheckedIcon, CheckBoxUncheckedIcon, RadioButtonCheckedIcon, RadioButtonUnheckedIcon } from "@/components/Icon"
import { SquareButton } from "@/components/Button"
import { useAppDataContext } from "@/components/AppData"
import './index.scss'

enum CheckBoxVariant {
    radio,
    check
}

type CheckBoxProps = Omit<JSX.HTMLAttributes<HTMLDivElement>, 'onClick'> & {
    value?: boolean
    compact?: boolean
    desktopCompact?: boolean
    onValueChanged?: (isSelected: boolean) => unknown
    onClick?: (ev: ComponentEvent<MouseEvent, HTMLDivElement>) => unknown
    disabled?: boolean
    variant?: CheckBoxVariant
    focused?: boolean
    disableScale?: boolean
}

const CheckBox: ParentComponent<CheckBoxProps> = ($props) => {
    const $$props = mergeProps({ variant: CheckBoxVariant[_check] }, $props)
    const [props, other] = splitProps($$props, [
        _compact, _disabled, _children, _value,
        _onValueChanged, _variant, _class,
        _onClick, _desktopCompact, _focused,
        _disableScale
    ])
    const getIconColor = createMemo<string>(() => props[_disabled]? "rgba(var(--color-on-surface), var(--opacity-inv4))" : CSSInlineStyleColors[_accent])
    const [isSelected, setIsSelected] = createSignal<boolean>(false)
    const appData = useAppDataContext()
    let isSelectedLocal = false
    let isInitialize: boolean = true

    function changeValue(): void {
        setIsSelected(v => !v)
        isSelectedLocal = isSelected()
        if (props[_onValueChanged]) props[_onValueChanged](isSelected())
    }

    createEffect(() => {
        const value = props[_value]
        const onValueChanged = props[_onValueChanged]
        if (
            !isInitialize
            && isVarHasValue(value)
            && value != isSelectedLocal
            && onValueChanged
        ){
            onValueChanged(value!)
        }
        setIsSelected(v => value ?? v)
        isInitialize = false
    })

    return (<div
        data-selected={toggleAttribute(isSelected())}
        data-disabled={toggleAttribute(props[_disabled])}
        class={"checkbox" + (props[_class] != undefined? ` ${props[_class]}` : '')}
        onClick={ev => {
            if (!props[_disabled]) changeValue()
            if (props[_onClick]) props[_onClick](ev)
        }}
        {...other}>
        <SquareButton
            disabled={props[_disabled]}
            compact={props[_compact]}
            desktopCompact={props[_desktopCompact]}
            disableScale={props[_disableScale]}
            focused={props[_focused]}
            classList={{"checkbox-icon": true}}>
            <Show
                when={isSelected()}
                fallback={<Switch>
                    <Match when={props[_variant] == CheckBoxVariant[_check]}>
                        <Show
                            when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_checkBoxUnchecked] != undefined}
                            fallback={<CheckBoxUncheckedIcon color={getIconColor()}/>}>
                            <Icon code={appData![_iconCode]![_checkBoxUnchecked]!}/>
                        </Show>
                    </Match>
                    <Match when={props[_variant] == CheckBoxVariant[_radio]}>
                        <Show
                            when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_radioButtonUnchecked] != undefined}
                            fallback={<RadioButtonUnheckedIcon color={getIconColor()}/>}>
                            <Icon code={appData![_iconCode]![_radioButtonUnchecked]!}/>
                        </Show>
                    </Match>
                </Switch>}>
                <Switch>
                    <Match when={props[_variant] == CheckBoxVariant[_check]}>
                        <Show
                            when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_checkBoxChecked] != undefined}
                            fallback={<CheckBoxCheckedIcon color={getIconColor()} filled/>}>
                            <Icon code={appData![_iconCode]![_checkBoxChecked]!}/>
                        </Show>
                    </Match>
                    <Match when={props[_variant] == CheckBoxVariant[_radio]}>
                        <Show
                            when={appData != undefined && appData[_iconCode] != undefined && appData[_iconCode][_radioButtonChecked] != undefined}
                            fallback={<RadioButtonCheckedIcon color={getIconColor()}/>}>
                            <Icon code={appData![_iconCode]![_radioButtonChecked]!}/>
                        </Show>
                    </Match>
                </Switch>
            </Show>
        </SquareButton>
        {props[_children]}
    </div>)
}

export {
    CheckBox,
    CheckBoxVariant
}
export type {
    CheckBoxProps
}
export default CheckBox