import React from "react";
type GradientColors = [string, string];
type StatusGaugeCardProps = {
    value?: number;
    maxValue?: number;
    label?: string;
    okColor?: string;
    dangerColor?: string;
    trackColor?: string;
    cardBg?: string;
    width?: number;
    height?: number;
    animationDuration?: number;
    scale?: number;
    textColor?: string;
    gradientColors?: GradientColors;
    dangerGradientColors?: GradientColors;
    trackGradientColors?: GradientColors;
    gradientDirection?: "horizontal" | "vertical" | "diagonal";
    labelStyle?: React.CSSProperties;
    textStyle?: React.CSSProperties;
    svgStyle?: React.CSSProperties;
    containerStyle?: React.CSSProperties;
};
export default function DaliryReactRadialChart({ value, maxValue, label, okColor, dangerColor, trackColor, cardBg, width, height, animationDuration, scale, textColor, gradientColors, dangerGradientColors, trackGradientColors, gradientDirection, labelStyle, textStyle, svgStyle, containerStyle }: StatusGaugeCardProps): React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map