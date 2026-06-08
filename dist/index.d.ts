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
};
export default function StatusGaugeCard({ value, maxValue, label, okColor, dangerColor, trackColor, cardBg, width, height, animationDuration, scale }: StatusGaugeCardProps): React.JSX.Element;
export {};
