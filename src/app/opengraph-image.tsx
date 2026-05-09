import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Institute of Open Science Practices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#F7F7F5";
const INK = "#0E1018";
const INK_SOFT = "#4A4D57";
const RULE = "rgba(14,16,24,0.18)";
const ROYAL = "#1D2D8E";

export default async function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: PAPER,
          color: INK,
          padding: "72px 80px",
          borderTop: `4px solid ${INK}`,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* top row: lockup + plate */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            paddingBottom: 18,
            borderBottom: `1px solid ${INK}`,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 150 150">
              <g transform="rotate(30 75 75)">
                <path
                  d="M 120 100 A 55 55 0 1 1 120 50"
                  fill="none"
                  stroke={INK}
                  strokeWidth="9"
                  strokeLinecap="round"
                />
                <path d="M 120 70 L 125 80 L 130 70 Z" fill={ROYAL} />
              </g>
            </svg>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: 36,
                  fontWeight: 500,
                  lineHeight: 1,
                  letterSpacing: "-0.005em",
                }}
              >
                IOSP
              </div>
              <div
                style={{
                  fontFamily: "ui-monospace, Menlo, monospace",
                  fontSize: 11,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: INK_SOFT,
                }}
              >
                Inst. of Open Science Practices
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, Menlo, monospace",
              fontSize: 12,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: INK_SOFT,
              gap: 28,
            }}
          >
            <span>iosp.science</span>
            <span style={{ color: ROYAL }}>Since 2024</span>
          </div>
        </div>

        {/* eyebrow */}
        <div
          style={{
            display: "flex",
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 13,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: ROYAL,
            marginTop: 56,
          }}
        >
          Institute of Open Science Practices
        </div>

        {/* headline */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontFamily: "Georgia, serif",
            fontWeight: 400,
            fontSize: 92,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            color: INK,
            marginTop: 24,
            maxWidth: 980,
          }}
        >
          <span>Build the substrate</span>
          <span style={{ fontStyle: "italic", color: ROYAL }}>
            open science depends on.
          </span>
        </div>

        {/* lede */}
        <div
          style={{
            display: "flex",
            fontFamily: "Georgia, serif",
            fontSize: 24,
            lineHeight: 1.4,
            color: INK_SOFT,
            marginTop: 28,
            maxWidth: 880,
          }}
        >
          An event, a community, and a coordinating institute for the people
          building the infrastructure open science depends on.
        </div>

        {/* spacer */}
        <div style={{ display: "flex", flex: 1 }} />

        {/* foot */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 18,
            borderTop: `1px solid ${RULE}`,
            fontFamily: "ui-monospace, Menlo, monospace",
            fontSize: 12,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: INK_SOFT,
          }}
        >
          <span>iosp.science</span>
          <span>IOSP 2026 · Leiden · Oct 12–15</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
