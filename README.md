# 📊 React Status Gauge – Animated Semicircle Gauge for React Dashboards

**React Status Gauge** is a lightweight and fully customizable **semicircle gauge component** for **React** built with **SVG**.  
It is perfect for **dashboards**, **KPI cards**, **status indicators**, and any React project that needs a clean and animated gauge UI.


<p>
  <img
    src="https://github.com/daliryapp/daliry-react-radial-chart/blob/master/src/assets/images/daliry-radial-chart.PNG?raw=true"
    alt="Daliry React Radial Chart Screenshot"
    width="250"
  />

</p>

---

## 🧠 Why React Status Gauge?

If you're searching for a **React gauge component** with a clean **semicircle / radial gauge** design, **React Status Gauge** is built exactly for that:

- Smooth animated value transitions
- Optional `maxValue` threshold support
- Automatic danger state when `value > maxValue`
- SVG-based and highly customizable
- Great fit for dashboard cards and KPI widgets

---

## ✨ Key Features

- 📈 Animated semicircle gauge for React
- 🎯 Optional `maxValue` threshold indicator
- 🔴 Automatic danger color when value exceeds max
- 🧩 Lightweight and reusable component
- 🎨 Fully customizable colors, size, and scale
- ⚡ Built with SVG for precise rendering

---

## 📦 Installation

Install the package via npm or yarn:
```bash
npm install daliry-react-radial-chart

or

bash
yarn add daliry-react-radial-chart

---

## ✨ Usage

tsx
import DaliryReactRadialChart from "daliry-react-radial-chart";

tsx
<DaliryReactRadialChart
  value={26.2}
  maxValue={30}
  label="sentToPSP"
/>

---

## ⚙️ Example

tsx
import React, { useState } from "react";
import DaliryReactRadialChart from "daliry-react-radial-chart";

export default function Demo() {
  const [value, setValue] = useState(26.2);

  return (
<div
style={{
minHeight: "100vh",
background: "#171B21",
padding: 24,
}}
>
<div style={{ marginBottom: 20 }}>
<button onClick={() => setValue(18)}>18</button>
<button onClick={() => setValue(30)} style={{ marginLeft: 8 }}>
30
</button>
<button onClick={() => setValue(42)} style={{ marginLeft: 8 }}>
42
</button>
<button onClick={() => setValue(72.1)} style={{ marginLeft: 8 }}>
72.1
</button>
</div>

<DaliryReactRadialChart
value={value}
maxValue={30}
label="sentToPSP"
/>
</div>
  );
}

---

## 🎛 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | `0` | Current gauge value |
| `maxValue` | `number` | `undefined` | Optional threshold value |
| `label` | `string` | `"success"` | Label shown below the gauge |
| `okColor` | `string` | `#79D56C` | Main color for normal state |
| `dangerColor` | `string` | `#FF6077` | Color used when `value > maxValue` |
| `trackColor` | `string` | `#2B3038` | Track/background arc color |
| `cardBg` | `string` | `#1C2027` | Card background color |
| `width` | `number` | `220` | Card width |
| `height` | `number` | `180` | Card height |
| `animationDuration` | `number` | `700` | Animation duration in ms |
| `scale` | `number` | `1` | Scales the SVG gauge size |

---

## 🎨 Behavior

- When `value <= maxValue`
  - the main value arc uses `okColor`
  - the center text uses `okColor`

- When `value > maxValue`
  - the main value arc switches to `dangerColor`
  - the center text switches to `dangerColor`

- When `maxValue` is provided
  - an outer semicircle is rendered
  - the safe range is shown before the threshold
  - the danger range is shown after the threshold

---

## 🧪 Notes

- If `maxValue` is not provided, the outer threshold arc is not rendered
- Value changes are animated smoothly using `requestAnimationFrame`
- The component is SVG-based, so it scales cleanly across screen sizes

---

## 🚀 Use Cases

- Dashboard KPI widgets
- Payment success/failure monitoring
- Performance indicators
- Threshold-based status cards
- Admin panel analytics

---

## 📄 License

MIT
