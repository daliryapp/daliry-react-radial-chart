import React from "react";
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
    startAngle?: number;
    endAngle?: number;
    gradientColors?: [string, string];
};
export default function DaliryReactRadialChart({ value, maxValue, label, okColor, dangerColor, trackColor, cardBg, width, height, animationDuration, scale, textColor, }: StatusGaugeCardProps): React.JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map