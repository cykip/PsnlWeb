import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import Wavify from "react-wavify";
import "./style.css";


function WaveLayer({ fill, options, paused, style }) {
    return (
        <Wavify
            fill={fill}
            paused={paused}
            options={options}
            style={style}
        />
    );
}

function App() {
    const [paused, setPaused] = useState(false);
    const [amplitude, setAmplitude] = useState(40);
    const [speed, setSpeed] = useState(0.2);
    const [points, setPoints] = useState(3);
    const [color, setColor] = useState("#1277b0");
    const [showSecond, setShowSecond] = useState(true);
    const [reversed, setReversed] = useState(false);
    const [height, setHeight] = useState(200);

    const containerStyle = {
        fontFamily: "system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial",
        height: "100vh",
        margin: 0,
        display: "flex",
        flexDirection: "column",
    };

    const headerStyle = {
        padding: "18px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.9)",
        zIndex: 20,
    };

    const controlsStyle = {
        display: "flex",
        gap: 12,
        alignItems: "center",
        flexWrap: "wrap",
    };

    const heroStyle = {
        position: "relative",
        flex: 1,
        overflow: "hidden",
        background: "#f6fbff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    };

    const overlayCard = {
        position: "absolute",
        zIndex: 10,
        top: "20%",
        left: "50%",
        transform: "translateX(-50%)",
        background: "rgba(255,255,255,0.85)",
        padding: "28px",
        borderRadius: 12,
        boxShadow: "0 6px 24px rgba(20,30,60,0.12)",
        maxWidth: 720,
        textAlign: "center",
    };

    const waveCommonOptions = {
        height,
        amplitude,
        speed,
        points,
    };

    return (
        <div style={containerStyle}>
            <header style={headerStyle}>
                <strong>Personal Web — Wave Demo</strong>
                <div style={controlsStyle}>
                    <label>
                        Amplitude
                        <input
                            type="range"
                            min="0"
                            max="120"
                            value={amplitude}
                            onChange={(e) => setAmplitude(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        Speed
                        <input
                            type="range"
                            min="0"
                            max="1"
                            step="0.01"
                            value={speed}
                            onChange={(e) => setSpeed(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        Points
                        <input
                            type="range"
                            min="1"
                            max="10"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                        />
                    </label>

                    <label>
                        Height
                        <input
                            type="range"
                            min="40"
                            max="400"
                            value={height}
                            onChange={(e) => setHeight(Number(e.target.value))}
                        />
                    </label>

                    <input
                        type="color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                        title="Wave color"
                        style={{ width: 42, height: 34, padding: 0, border: "none" }}
                    />

                    <button onClick={() => setPaused((p) => !p)}>
                        {paused ? "Play" : "Pause"}
                    </button>

                    <button onClick={() => { setReversed((r) => !r); }}>
                        {reversed ? "Normal" : "Reverse"}
                    </button>

                    <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <input
                            type="checkbox"
                            checked={showSecond}
                            onChange={(e) => setShowSecond(e.target.checked)}
                        />
                        Multi-layer
                    </label>
                </div>
            </header>

            <main style={heroStyle}>
                        {/* SVG defs for gradients used by Wavify fills */}
                        <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
                            <defs>
                                <linearGradient id="waveGradientMain" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#dff8ff" stopOpacity="0.98" />
                                    <stop offset="55%" stopColor="#7ec8ff" stopOpacity="0.92" />
                                    <stop offset="100%" stopColor="#1277b0" stopOpacity="0.9" />
                                </linearGradient>

                                <linearGradient id="waveGradientSoft" x1="0" x2="0" y1="0" y2="1">
                                    <stop offset="0%" stopColor="#7ec8ff" stopOpacity="0.18" />
                                    <stop offset="100%" stopColor="#1277b0" stopOpacity="0.06" />
                                </linearGradient>
                            </defs>
                        </svg>
                {/* Lower wave layer (subtle) */}
                <WaveLayer
                    fill={`url(#waveGradientSoft)`}
                    paused={paused}
                    options={{ ...waveCommonOptions, amplitude: Math.max(8, amplitude * 0.45), speed: Math.max(0.02, speed * 0.6), points: Math.max(2, points + 2) }}
                    style={{ position: "absolute", bottom: 0, left: 0, width: "200%", transform: reversed ? "scaleX(-1)" : "none", zIndex: 2 }}
                />

                {/* Main wave */}
                <WaveLayer
                    fill={`url(#waveGradientMain)`}
                    paused={paused}
                    options={waveCommonOptions}
                    style={{ position: "absolute", bottom: 0, left: 0, width: "200%", transform: reversed ? "scaleX(-1)" : "none", zIndex: 5, opacity: 0.96 }}
                />

                {/* Optional second wave layer for depth */}
                {showSecond && (
                    <WaveLayer
                        fill={`url(#waveGradientSoft)`}
                        paused={paused}
                        options={{ ...waveCommonOptions, amplitude: Math.max(6, amplitude * 0.3), speed: Math.max(0.01, speed * 1.4), points: Math.max(2, points - 1) }}
                        style={{ position: "absolute", bottom: 0, left: 0, width: "200%", transform: reversed ? "scaleX(-1)" : "none", zIndex: 3 }}
                    />
                )}

                <div style={overlayCard}>
                    <h1 style={{ margin: "0 0 8px" }}>Interactive Wave Background</h1>
                    <p style={{ margin: 0, color: "#334155" }}>
                        Use the controls in the header to tweak the animation. This component uses react-wavify
                        but you can easily layer more waves, animate other elements or tie parameters to music or scroll.
                    </p>
                </div>
            </main>
        </div>
    );
}

// Mount to #root (create index.html with a root div when using in a simple setup)
const rootEl = document.getElementById("root");
if (rootEl) {
    createRoot(rootEl).render(<App />);
} else {
    // If no root element exists, export App as default for use in other setups (e.g., Next.js)
    export default App;
}