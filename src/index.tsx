import React, { useEffect, useMemo, useRef, useState } from "react";

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

function polarToCartesian(cx: number, cy: number, r: number, angle: number): { x: number; y: number } {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
    const start = polarToCartesian(cx, cy, r, endAngle);
    const end = polarToCartesian(cx, cy, r, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y}`;
}

function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max);
}

function formatValue(value: number): string {
    if (value === 0) return "0";
    if (Number.isInteger(value)) return `${value}%`;
    if (value < 10) return `${value.toFixed(2)}%`;
    return `${value.toFixed(1)}%`;
}

export default function DaliryReactRadialChart({
                                            value = 0,
                                            maxValue,
                                            label = "success",
                                            okColor = "#79D56C",
                                            dangerColor = "#FF6077",
                                            trackColor = "#2B3038",
                                            cardBg = "#1C2027",
                                            width = 220,
                                            height = 180,
                                            animationDuration = 700,
                                            scale = 1
                                        }: StatusGaugeCardProps) {
    const [animatedValue, setAnimatedValue] = useState<number>(clamp(value, 0, 100));
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        const target = clamp(value, 0, 100);
        const startValue = animatedValue;
        const startTime = performance.now();

        const easeInOutCubic = (t: number): number =>
            t < 0.5
                ? 4 * t * t * t
                : 1 - Math.pow(-2 * t + 2, 3) / 2;

        const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = clamp(elapsed / animationDuration, 0, 1);
            const eased = easeInOutCubic(progress);
            const nextValue = startValue + (target - startValue) * eased;

            setAnimatedValue(nextValue);

            if (progress < 1) {
                rafRef.current = requestAnimationFrame(tick);
            }
        };

        if (rafRef.current !== null) {
            cancelAnimationFrame(rafRef.current);
        }
        rafRef.current = requestAnimationFrame(tick);

        return () => {
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [value, animationDuration]);

    const safeAnimatedValue = clamp(animatedValue, 0, 100);
    const safeMaxValue =
        typeof maxValue === "number" ? clamp(maxValue, 0, 100) : null;

    const isOverLimit =
        safeMaxValue !== null && safeAnimatedValue > safeMaxValue;

    const valueColor = isOverLimit ? dangerColor : okColor;

    const svgWidth = (width - 24) * scale;
    const svgHeight = 120 * scale;

    const cx = svgWidth / 2;
    const cy = 92 * scale;

    const outerRadius = 72 * scale;
    const outerStrokeWidth = 3 * scale;

    const innerRadius = 62 * scale;
    const innerStrokeWidth = 14 * scale;

    const startAngle = -100;
    const endAngle = 100;
    const sweep = endAngle - startAngle;

    const valueEndAngle = startAngle + (safeAnimatedValue / 100) * sweep;

    const maxEndAngle =
        safeMaxValue !== null
            ? startAngle + (safeMaxValue / 100) * sweep
            : null;

    const innerTrackPath = useMemo(
        () => describeArc(cx, cy, innerRadius, startAngle, endAngle),
        [cx, cy, innerRadius]
    );

    const valuePath = useMemo(() => {
        if (safeAnimatedValue <= 0) return "";
        return describeArc(cx, cy, innerRadius, startAngle, valueEndAngle);
    }, [cx, cy, innerRadius, safeAnimatedValue, valueEndAngle]);

    const outerOkPath = useMemo(() => {
        if (safeMaxValue === null || safeMaxValue <= 0) return "";
        return describeArc(cx, cy, outerRadius, startAngle, maxEndAngle as number);
    }, [cx, cy, outerRadius, safeMaxValue, maxEndAngle]);

    const outerDangerPath = useMemo(() => {
        if (safeMaxValue === null || safeMaxValue >= 100) return "";
        return describeArc(cx, cy, outerRadius, maxEndAngle as number, endAngle);
    }, [cx, cy, outerRadius, safeMaxValue, maxEndAngle]);

    return (
        <div
            style={{
                width,
                height,
                background: cardBg,
                borderRadius: 18,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "16px 12px 14px",
                boxSizing: "border-box",
            }}
        >
            <svg
                width={svgWidth}
                height={svgHeight}
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                fill="none"
            >
                {safeMaxValue !== null && (
                    <>
                        <path
                            d={describeArc(cx, cy, outerRadius, startAngle, endAngle)}
                            stroke={trackColor}
                            strokeWidth={outerStrokeWidth}
                            strokeLinecap="butt"
                            opacity="0.35"
                        />

                        {outerOkPath && (
                            <path
                                d={outerOkPath}
                                stroke={okColor}
                                strokeWidth={outerStrokeWidth}
                                strokeLinecap="butt"
                            />
                        )}

                        {outerDangerPath && (
                            <path
                                d={outerDangerPath}
                                stroke={dangerColor}
                                strokeWidth={outerStrokeWidth}
                                strokeLinecap="butt"
                            />
                        )}
                    </>
                )}

                <path
                    d={innerTrackPath}
                    stroke={trackColor}
                    strokeWidth={innerStrokeWidth}
                    strokeLinecap="butt"
                />

                {valuePath && (
                    <path
                        d={valuePath}
                        stroke={valueColor}
                        strokeWidth={innerStrokeWidth}
                        strokeLinecap="butt"
                    />
                )}

                <text
                    x={cx}
                    y={95 * scale}
                    textAnchor="middle"
                    fill={valueColor}
                    fontWeight="400"
                    fontFamily="inherit"
                    style={{
                        fontSize: 18 * scale
                    }}
                >
                    {formatValue(safeAnimatedValue)}
                </text>
            </svg>

            <div
                style={{
                    color: "#D8DCE3",
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    marginTop: -4,
                }}
            >
                {label}
            </div>
        </div>
    );
}
