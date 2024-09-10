import { createContext, createEffect, ParentComponent, useContext } from 'solid-js'

import { HEXColor, RGBColor } from '@/types/color'
import { _accentColor, _appendChild, _children, _color, _colorAccent, _colorDark, _head, _iconCode, _id, _innerHTML, _onColor, _onColorDark, _style } from '@/constants/string'
import { generateColor, hexToRgb, testHexColor } from '@/utils/color'
import { createElement, getElementById } from '@/utils/element'
import { ElementIds } from '@/enums/ids'
import { getDocument } from '@/constants/window'

import './variables.scss'
import './animations.scss'
import './index.scss'

const AppDataContext = createContext<AppDataProps>()
const useAppDataContext = () => useContext(AppDataContext)

type AppDataProps = {
    iconCode?: {
        checkBoxUnchecked?: number
        checkBoxChecked?: number
        radioButtonUnchecked?: number
        radioButtonChecked?: number
        chevronUpDown?: number
        chevronRight?: number
        chevronLeft?: number
        chevronUp?: number
        chevronDown?: number
        calendarToday?: number
        close?: number
    }
    accentColor?: HEXColor
    areaTextFieldHeightPerLine?: number
}
const AppData: ParentComponent<AppDataProps> = (props) => {
    function rgbToCSSValue(rgb: RGBColor): string {
        return `${rgb.r}, ${rgb.g}, ${rgb.b}`
    }

    createEffect(() => {
        const accentColor = props[_accentColor]
        if (accentColor == undefined) return;

        try {
            testHexColor(accentColor)
        } catch { return }

        let style_colorAccent_ref = getElementById(ElementIds[_colorAccent])
        if (style_colorAccent_ref == null) {
            style_colorAccent_ref = createElement(_style)
            style_colorAccent_ref[_id] = ElementIds[_colorAccent]
            getDocument()[_head][_appendChild](style_colorAccent_ref)
        }

        const colors = generateColor(accentColor)
        style_colorAccent_ref[_innerHTML] = `:root{--color-accent-light: ${rgbToCSSValue(hexToRgb(colors[_color]))};--color-accent-dark: ${rgbToCSSValue(hexToRgb(colors[_colorDark]))};--color-on-accent-light: ${rgbToCSSValue(hexToRgb(colors[_onColor]))};--color-on-accent-dark: ${rgbToCSSValue(hexToRgb(colors[_onColorDark]))}}`;
    })

    return <AppDataContext.Provider value={{
        accentColor: props[_accentColor],
        iconCode: props[_iconCode]
    }}>{ props[_children] }</AppDataContext.Provider>
}

export {
    AppData,
    useAppDataContext
}
export type {
    AppDataProps
}
export default AppData