import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState, useId } from "react";
function polarToCartesian(cx, cy, r, angle) {
    const rad = ((angle - 90) * Math.PI) / 180;
    return {
        x: cx + r * Math.cos(rad),
        y: cy + r * Math.sin(rad),
    };
}
function describeArc(cx, cy, r, startAngle, endAngle) {
    const delta = endAngle - startAngle;
    const sweepFlag = delta >= 0 ? 1 : 0;
    const absDelta = Math.abs(delta);
    const largeArcFlag = absDelta > 180 ? 1 : 0;
    const start = polarToCartesian(cx, cy, r, startAngle);
    const end = polarToCartesian(cx, cy, r, endAngle);
    return `M ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}
function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
}
function formatValue(value) {
    if (value === 0)
        return "0";
    if (Number.isInteger(value))
        return `${value}%`;
    if (value < 10)
        return `${value.toFixed(2)}%`;
    return `${value.toFixed(1)}%`;
}
function getGradientCoords(direction) {
    switch (direction) {
        case "vertical":
            return { x1: "0%", y1: "0%", x2: "0%", y2: "100%" };
        case "diagonal":
            return { x1: "0%", y1: "0%", x2: "100%", y2: "100%" };
        case "horizontal":
        default:
            return { x1: "0%", y1: "0%", x2: "100%", y2: "0%" };
    }
}
export default function DaliryReactRadialChart({ value = 0, maxValue, label = "success", okColor = "#79D56C", dangerColor = "#FF6077", trackColor = "#2B3038", cardBg = "#1C2027", width = 220, height = 180, animationDuration = 700, scale = 1, textColor = "#D8DCE3", gradientColors, dangerGradientColors, trackGradientColors, gradientDirection = "horizontal", }) {
    const gradientBaseId = useId().replace(/:/g, "");
    const valueGradientId = `${gradientBaseId}-value-gradient`;
    const dangerGradientId = `${gradientBaseId}-danger-gradient`;
    const trackGradientId = `${gradientBaseId}-track-gradient`;
    const [animatedValue, setAnimatedValue] = useState(clamp(value, 0, 100));
    const rafRef = useRef(null);
    useEffect(() => {
        const target = clamp(value, 0, 100);
        const startValue = animatedValue;
        const startTime = performance.now();
        const easeInOutCubic = (t) => t < 0.5
            ? 4 * t * t * t
            : 1 - Math.pow(-2 * t + 2, 3) / 2;
        const tick = (now) => {
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
    const safeMaxValue = typeof maxValue === "number" ? clamp(maxValue, 0, 100) : null;
    const isOverLimit = safeMaxValue !== null && safeAnimatedValue > safeMaxValue;
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
    const maxEndAngle = safeMaxValue !== null
        ? startAngle + (safeMaxValue / 100) * sweep
        : null;
    const innerTrackPath = useMemo(() => describeArc(cx, cy, innerRadius, startAngle, endAngle), [cx, cy, innerRadius]);
    const valuePath = useMemo(() => {
        if (safeAnimatedValue <= 0)
            return "";
        return describeArc(cx, cy, innerRadius, startAngle, valueEndAngle);
    }, [cx, cy, innerRadius, safeAnimatedValue, valueEndAngle]);
    const outerOkPath = useMemo(() => {
        if (safeMaxValue === null || safeMaxValue <= 0)
            return "";
        return describeArc(cx, cy, outerRadius, startAngle, maxEndAngle);
    }, [cx, cy, outerRadius, safeMaxValue, maxEndAngle]);
    const outerDangerPath = useMemo(() => {
        if (safeMaxValue === null || safeMaxValue >= 100)
            return "";
        return describeArc(cx, cy, outerRadius, maxEndAngle, endAngle);
    }, [cx, cy, outerRadius, safeMaxValue, maxEndAngle]);
    const trackGradientCoords = getGradientCoords(gradientDirection);
    const valueStroke = gradientColors
        ? `url(#${valueGradientId})`
        : valueColor;
    const trackStroke = trackGradientColors
        ? `url(#${trackGradientId})`
        : trackColor;
    const outerOkStroke = gradientColors
        ? `url(#${valueGradientId})`
        : okColor;
    const outerDangerStroke = dangerGradientColors
        ? `url(#${dangerGradientId})`
        : dangerColor;
    return (_jsxs("div", { className: "daliry_radial_container", style: {
            width,
            height,
            background: cardBg,
            borderRadius: 18,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "8px 4px 8px",
            boxSizing: "border-box",
        }, children: [_jsxs("svg", { className: "daliry_radial_svg", width: svgWidth, height: svgHeight, viewBox: `0 0 ${svgWidth} ${svgHeight}`, fill: "none", children: [_jsxs("defs", { children: [gradientColors && (_jsxs("linearGradient", { id: valueGradientId, x1: trackGradientCoords.x1, y1: trackGradientCoords.y1, x2: trackGradientCoords.x2, y2: trackGradientCoords.y2, children: [_jsx("stop", { offset: "0%", stopColor: gradientColors[0] }), _jsx("stop", { offset: "100%", stopColor: gradientColors[1] })] })), dangerGradientColors && (_jsxs("linearGradient", { id: dangerGradientId, x1: trackGradientCoords.x1, y1: trackGradientCoords.y1, x2: trackGradientCoords.x2, y2: trackGradientCoords.y2, children: [_jsx("stop", { offset: "0%", stopColor: dangerGradientColors[0] }), _jsx("stop", { offset: "100%", stopColor: dangerGradientColors[1] })] })), trackGradientColors && (_jsxs("linearGradient", { id: trackGradientId, x1: trackGradientCoords.x1, y1: trackGradientCoords.y1, x2: trackGradientCoords.x2, y2: trackGradientCoords.y2, children: [_jsx("stop", { offset: "0%", stopColor: trackGradientColors[0] }), _jsx("stop", { offset: "100%", stopColor: trackGradientColors[1] })] }))] }), safeMaxValue !== null && (_jsxs(_Fragment, { children: [_jsx("path", { d: describeArc(cx, cy, outerRadius, startAngle, endAngle), stroke: trackStroke, strokeWidth: outerStrokeWidth, strokeLinecap: "butt", opacity: "0.35" }), outerOkPath && (_jsx("path", { d: outerOkPath, stroke: outerOkStroke, strokeWidth: outerStrokeWidth, strokeLinecap: "butt" })), outerDangerPath && (_jsx("path", { d: outerDangerPath, stroke: outerDangerStroke, strokeWidth: outerStrokeWidth, strokeLinecap: "butt" }))] })), _jsx("path", { d: innerTrackPath, stroke: trackStroke, strokeWidth: innerStrokeWidth, strokeLinecap: "butt" }), valuePath && (_jsx("path", { d: valuePath, stroke: valueStroke, strokeWidth: innerStrokeWidth, strokeLinecap: "butt" })), _jsx("text", { className: "daliry_radial_text", x: cx, y: 95 * scale, textAnchor: "middle", fill: isOverLimit ? (dangerGradientColors ? `url(#${dangerGradientId})` : dangerColor) : (gradientColors ? `url(#${valueGradientId})` : okColor), fontWeight: "400", fontFamily: "inherit", style: {
                            fontSize: 18 * scale,
                        }, children: formatValue(safeAnimatedValue) })] }), _jsx("div", { className: "daliry_radial_label", style: {
                    color: textColor,
                    fontSize: 12,
                    fontWeight: 400,
                    lineHeight: 1.2,
                    marginTop: -11,
                    flex: 1
                }, children: label })] }));
}
