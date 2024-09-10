import { createMemo, type JSX, Show, splitProps, type VoidComponent } from "solid-js"

import { _children, _filled, _inline, _fromCharCode, _charCodeAt, _code, _color, _onSurface } from "@/constants/string"
import { CSSInlineStyleColors } from "@/enums/colors"
import { toggleAttribute } from '@/utils/attributes'

import './index.scss'

const DEFAULT_ICON_COLOR: CSSInlineStyleColors = CSSInlineStyleColors[_onSurface]

type SVGIconProps = {
    color?: string
    filled?: boolean
}
const CheckBoxCheckedIcon: VoidComponent<SVGIconProps> = (props) => {
    const getColor = createMemo<string>(() => props[_color] || DEFAULT_ICON_COLOR)
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Show
            when={props[_filled]}
            fallback={<path
                d="M6 3C4.34315 3 3 4.34315 3 6V14C3 15.6569 4.34315 17 6 17H14C15.6569 17 17 15.6569 17 14V6C17 4.34315 15.6569 3 14 3H6ZM4 6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V14C16 15.1046 15.1046 16 14 16H6C4.89543 16 4 15.1046 4 14V6ZM13.8536 7.85355C14.0488 7.65829 14.0488 7.34171 13.8536 7.14645C13.6583 6.95118 13.3417 6.95118 13.1464 7.14645L8.5 11.7929L6.85355 10.1464C6.65829 9.95118 6.34171 9.95118 6.14645 10.1464C5.95118 10.3417 5.95118 10.6583 6.14645 10.8536L8.14645 12.8536C8.34171 13.0488 8.65829 13.0488 8.85355 12.8536L13.8536 7.85355Z"
                fill={getColor()}
            />}>
            <path
                d="M6 3C4.34315 3 3 4.34315 3 6V14C3 15.6569 4.34315 17 6 17H14C15.6569 17 17 15.6569 17 14V6C17 4.34315 15.6569 3 14 3H6ZM13.8536 7.85355L8.85355 12.8536C8.65829 13.0488 8.34171 13.0488 8.14645 12.8536L6.14645 10.8536C5.95118 10.6583 5.95118 10.3417 6.14645 10.1464C6.34171 9.95118 6.65829 9.95118 6.85355 10.1464L8.5 11.7929L13.1464 7.14645C13.3417 6.95118 13.6583 6.95118 13.8536 7.14645C14.0488 7.34171 14.0488 7.65829 13.8536 7.85355Z"
                fill={getColor()}
            />
        </Show>
    </svg>)
}

const CheckBoxUncheckedIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6ZM6 4C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H14C15.1046 16 16 15.1046 16 14V6C16 4.89543 15.1046 4 14 4H6Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const RadioButtonCheckedIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const RadioButtonUnheckedIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3ZM2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const ChevronUpDownIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M14.9114 7.21569C15.0464 7.41056 15.0271 7.67999 14.8536 7.85355C14.6583 8.04882 14.3417 8.04882 14.1464 7.85355L10 3.70711L5.85355 7.85355L5.78431 7.91141C5.58944 8.0464 5.32001 8.02712 5.14645 7.85355C4.95118 7.65829 4.95118 7.34171 5.14645 7.14645L9.64645 2.64645L9.71569 2.58859C9.91056 2.4536 10.18 2.47288 10.3536 2.64645L14.8536 7.14645L14.9114 7.21569ZM5.08859 12.7843C4.9536 12.5894 4.97288 12.32 5.14645 12.1464C5.34171 11.9512 5.65829 11.9512 5.85355 12.1464L10 16.2929L14.1464 12.1464L14.2157 12.0886C14.4106 11.9536 14.68 11.9729 14.8536 12.1464C15.0488 12.3417 15.0488 12.6583 14.8536 12.8536L10.3536 17.3536L10.2843 17.4114C10.0894 17.5464 9.82001 17.5271 9.64645 17.3536L5.14645 12.8536L5.08859 12.7843Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const ChevronUpIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M4.14708 12.3534C3.95147 12.1585 3.9509 11.8419 4.14582 11.6463L9.6108 6.16178C9.82574 5.94607 10.1751 5.94607 10.39 6.16178L15.855 11.6463C16.0499 11.8419 16.0493 12.1585 15.8537 12.3534C15.6581 12.5483 15.3415 12.5477 15.1466 12.3521L10.0004 7.18753L4.85418 12.3521C4.65927 12.5477 4.34269 12.5483 4.14708 12.3534Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const ChevronDownIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M15.8537 7.64582C16.0493 7.84073 16.0499 8.15731 15.855 8.35292L10.39 13.8374C10.1751 14.0531 9.82574 14.0531 9.6108 13.8374L4.14582 8.35292C3.9509 8.15731 3.95147 7.84073 4.14708 7.64582C4.34269 7.4509 4.65927 7.45147 4.85418 7.64708L10.0004 12.8117L15.1466 7.64708C15.3415 7.45147 15.6581 7.4509 15.8537 7.64582Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const ChevronLeftIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M12.3534 15.8537C12.1585 16.0493 11.8419 16.0499 11.6463 15.855L6.16178 10.39C5.94607 10.1751 5.94607 9.82574 6.16178 9.6108L11.6463 4.14582C11.8419 3.9509 12.1585 3.95147 12.3534 4.14708C12.5483 4.34269 12.5477 4.65927 12.3521 4.85418L7.18753 10.0004L12.3521 15.1466C12.5477 15.3415 12.5483 15.6581 12.3534 15.8537Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const ChevronRightIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M7.64582 4.14708C7.84073 3.95147 8.15731 3.9509 8.35292 4.14582L13.8374 9.6108C14.0531 9.82574 14.0531 10.1751 13.8374 10.39L8.35292 15.855C8.15731 16.0499 7.84073 16.0493 7.64582 15.8537C7.4509 15.6581 7.45147 15.3415 7.64708 15.1466L12.8117 10.0004L7.64708 4.85418C7.45147 4.65927 7.4509 4.34269 7.64582 4.14708Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const CloseIcon: VoidComponent<SVGIconProps> = (props) => {
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            // TODO: update path
            d="M7.64582 4.14708C7.84073 3.95147 8.15731 3.9509 8.35292 4.14582L13.8374 9.6108C14.0531 9.82574 14.0531 10.1751 13.8374 10.39L8.35292 15.855C8.15731 16.0499 7.84073 16.0493 7.64582 15.8537C7.4509 15.6581 7.45147 15.3415 7.64708 15.1466L12.8117 10.0004L7.64708 4.85418C7.45147 4.65927 7.4509 4.34269 7.64582 4.14708Z"
            fill={props[_color] || DEFAULT_ICON_COLOR}
        />
    </svg>)
}

const CalendarTodayIcon: VoidComponent<SVGIconProps> = (props) => {
    const getColor = createMemo<string>(() => props[_color] || DEFAULT_ICON_COLOR)
    return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <Show
            when={props[_filled]}
            fallback={<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path
                d="M14.5 3C15.8255 3 16.91 4.03154 16.9947 5.33562L17 5.5V14.5C17 15.8255 15.9685 16.91 14.6644 16.9947L14.5 17H5.5C4.17452 17 3.08996 15.9685 3.00532 14.6644L3 14.5V5.5C3 4.17452 4.03154 3.08996 5.33562 3.00532L5.5 3H14.5ZM16 7H4V14.5C4 15.2797 4.59489 15.9204 5.35554 15.9931L5.5 16H14.5C15.2797 16 15.9204 15.4051 15.9931 14.6445L16 14.5V7ZM11.5164 8.23438C12.0503 8.23438 12.4734 8.3763 12.7859 8.66016C13.0984 8.94401 13.2547 9.32812 13.2547 9.8125C13.2547 10.0911 13.1831 10.3392 13.0398 10.5566C12.8966 10.7741 12.7013 10.9453 12.4539 11.0703C12.7508 11.2083 12.9793 11.3971 13.1395 11.6367C13.2996 11.8763 13.3797 12.1471 13.3797 12.4492C13.3797 12.9492 13.2104 13.3457 12.8719 13.6387C12.5333 13.9316 12.0828 14.0781 11.5203 14.0781C10.9552 14.0781 10.5027 13.931 10.1629 13.6367C9.82305 13.3424 9.65312 12.9466 9.65312 12.4492C9.65312 12.1445 9.73385 11.8711 9.89531 11.6289C10.0568 11.3867 10.2833 11.2005 10.575 11.0703C10.3302 10.9453 10.1368 10.7741 9.99492 10.5566C9.85299 10.3392 9.78203 10.0911 9.78203 9.8125C9.78203 9.32812 9.93828 8.94401 10.2508 8.66016C10.5633 8.3763 10.9852 8.23438 11.5164 8.23438ZM8.49609 8.29297V14H7.55078V9.43359L6.15625 9.91016V9.10938L8.375 8.29297H8.49609ZM11.5125 11.4609C11.2365 11.4609 11.0158 11.5469 10.8504 11.7188C10.685 11.8906 10.6023 12.1185 10.6023 12.4023C10.6023 12.681 10.6837 12.9036 10.8465 13.0703C11.0092 13.237 11.2339 13.3203 11.5203 13.3203C11.8068 13.3203 12.0301 13.2396 12.1902 13.0781C12.3504 12.9167 12.4305 12.6914 12.4305 12.4023C12.4305 12.1211 12.3465 11.8939 12.1785 11.7207C12.0105 11.5475 11.7885 11.4609 11.5125 11.4609ZM11.5164 8.99609C11.2742 8.99609 11.0828 9.07227 10.9422 9.22461C10.8016 9.37695 10.7312 9.58464 10.7312 9.84766C10.7312 10.1081 10.8022 10.3151 10.9441 10.4688C11.0861 10.6224 11.2781 10.6992 11.5203 10.6992C11.7625 10.6992 11.9546 10.6224 12.0965 10.4688C12.2384 10.3151 12.3094 10.1081 12.3094 9.84766C12.3094 9.60026 12.2378 9.39648 12.0945 9.23633C11.9513 9.07617 11.7586 8.99609 11.5164 8.99609ZM14.5 4H5.5C4.7203 4 4.07955 4.59489 4.00687 5.35554L4 5.5V6H16V5.5C16 4.7203 15.4051 4.07955 14.6445 4.00687L14.5 4Z"
                fill={getColor()}
            /></svg>}>
            <path
                d="M17 7V14.5C17 15.8255 15.9685 16.91 14.6644 16.9947L14.5 17H5.5C4.17452 17 3.08996 15.9685 3.00532 14.6644L3 14.5V7H17ZM11.5164 8.23438C10.9852 8.23438 10.5633 8.3763 10.2508 8.66016C9.93828 8.94401 9.78203 9.32812 9.78203 9.8125C9.78203 10.0911 9.85299 10.3392 9.99492 10.5566C10.1368 10.7741 10.3302 10.9453 10.575 11.0703C10.2833 11.2005 10.0568 11.3867 9.89531 11.6289C9.73385 11.8711 9.65312 12.1445 9.65312 12.4492C9.65312 12.9466 9.82305 13.3424 10.1629 13.6367C10.5027 13.931 10.9552 14.0781 11.5203 14.0781C12.0828 14.0781 12.5333 13.9316 12.8719 13.6387C13.2104 13.3457 13.3797 12.9492 13.3797 12.4492C13.3797 12.1471 13.2996 11.8763 13.1395 11.6367C12.9793 11.3971 12.7508 11.2083 12.4539 11.0703C12.7013 10.9453 12.8966 10.7741 13.0398 10.5566C13.1831 10.3392 13.2547 10.0911 13.2547 9.8125C13.2547 9.32812 13.0984 8.94401 12.7859 8.66016C12.4734 8.3763 12.0503 8.23438 11.5164 8.23438ZM8.49609 8.29297H8.375L6.15625 9.10938V9.91016L7.55078 9.43359V14H8.49609V8.29297ZM11.5125 11.4609C11.7885 11.4609 12.0105 11.5475 12.1785 11.7207C12.3465 11.8939 12.4305 12.1211 12.4305 12.4023C12.4305 12.6914 12.3504 12.9167 12.1902 13.0781C12.0301 13.2396 11.8068 13.3203 11.5203 13.3203C11.2339 13.3203 11.0092 13.237 10.8465 13.0703C10.6837 12.9036 10.6023 12.681 10.6023 12.4023C10.6023 12.1185 10.685 11.8906 10.8504 11.7188C11.0158 11.5469 11.2365 11.4609 11.5125 11.4609ZM11.5164 8.99609C11.7586 8.99609 11.9513 9.07617 12.0945 9.23633C12.2378 9.39648 12.3094 9.60026 12.3094 9.84766C12.3094 10.1081 12.2384 10.3151 12.0965 10.4688C11.9546 10.6224 11.7625 10.6992 11.5203 10.6992C11.2781 10.6992 11.0861 10.6224 10.9441 10.4688C10.8022 10.3151 10.7312 10.1081 10.7312 9.84766C10.7312 9.58464 10.8016 9.37695 10.9422 9.22461C11.0828 9.07227 11.2742 8.99609 11.5164 8.99609ZM14.5 3C15.8255 3 16.91 4.03154 16.9947 5.33562L17 5.5V6H3V5.5C3 4.17452 4.03154 3.08996 5.33562 3.00532L5.5 3H14.5Z"
                fill={getColor()}
            />
        </Show>
    </svg>)
}

type IconProps = Omit<JSX.HTMLAttributes<HTMLElement>, 'children'> & {
    filled?: boolean
    inline?: boolean
    code: number
}
const Icon: VoidComponent<IconProps> = ($props) => {
    const [props, other] = splitProps($props, [_filled, _inline, _code])

    return (<i
        class='icon'
        data-inline={toggleAttribute(props[_inline])}
        data-filled={toggleAttribute(props[_filled])}
        translate="no"
        {...other}>
        { props[_code] }
    </i>)
}

export {
    Icon,
    CheckBoxCheckedIcon,
    CheckBoxUncheckedIcon,
    RadioButtonCheckedIcon,
    RadioButtonUnheckedIcon,
    ChevronUpDownIcon,
    ChevronUpIcon,
    ChevronDownIcon,
    ChevronLeftIcon,
    ChevronRightIcon,
    CalendarTodayIcon,
    CloseIcon
}
export type {
    SVGIconProps,
    IconProps
}
export default Icon