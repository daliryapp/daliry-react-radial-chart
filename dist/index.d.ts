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
};
export default function RadialChart({ value, maxValue, label, okColor, dangerColor, trackColor, cardBg, width, height, animationDuration, scale, textColor, }: StatusGaugeCardProps): React.JSX.Element;
export {};
