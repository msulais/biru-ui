export enum RootAttributes {
    theme = 'data-theme',
    corner = 'data-corner'
}

export enum BodyAttributes {
    modalListener = 'data-modal-listener',
    popoverListener = 'data-popover-listener',
    tooltipListener = 'data-tooltip-listener',
    emojiListener = 'data-emoji-listener',

    /**
     * Disable all element pointer event. Except element that has [data-keep-pointer-event].
     */
    noPointerEvent = 'data-no-pointer-event'
}