export enum EBreakPoints {
    mobile = 380,
    tablet = 768,
    desktop = 922,
    large = 1200
}

export const MatchMediaQueries = {
    tabletOnly: `(min-width: ${EBreakPoints.tablet}px) and (max-width: ${EBreakPoints.desktop - 1}px)`,
    desktopOnly: `(min-width: ${EBreakPoints.desktop}px) and (max-width: ${EBreakPoints.large - 1}px)`,
    largeOnly: `(min-width: ${EBreakPoints.large}px)`,
    fromMobile: `(min-width: ${EBreakPoints.mobile}px)`,
    fromTablet: `(min-width: ${EBreakPoints.tablet}px)`,
    fromDesktop: `(min-width: ${EBreakPoints.desktop}px)`,
    fromLarge: `(min-width: ${EBreakPoints.large}px)`,
    untilMobile: `(max-width: ${EBreakPoints.mobile - 1}px)`,
    untilTablet: `(max-width: ${EBreakPoints.tablet - 1}px)`,
    untilDesktop: `(max-width: ${EBreakPoints.desktop - 1}px)`,
    untilLarge: `(max-width: ${EBreakPoints.large - 1}px)`
};