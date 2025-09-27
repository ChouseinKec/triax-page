"use client";

import CSS from "./page.module.scss";

interface TriaxLoadingSpinnerProps {
    message?: string;
}

export function TriaxLoadingSpinner({ message = "Loading ..." }: TriaxLoadingSpinnerProps) {
    return (
        <div className={CSS.loading}>
            {/* Flying rectangles background */}
            <div className={CSS.flyingRectangles}>
                <div className={`${CSS.rectangle} ${CSS.rect1}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect2}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect3}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect4}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect5}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect6}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect7}`}></div>
                <div className={`${CSS.rectangle} ${CSS.rect8}`}></div>
            </div>

            <div className={CSS.triaxSpinner}>

                {/* Orbital ring and pulsing background elements */}
                <div className={CSS.orbitalRing} />
                <div className={CSS.pulseRing} />
                <div className={CSS.pulseRing} style={{ animationDelay: '1s' }} />
            </div>

            <div className={CSS.loadingText}>
                <h2 className={CSS.triaxTitle}>Triax</h2>
                <p className={CSS.triaxSubtitle}>CSS • HTML • JS</p>
                <p className={CSS.loadingMessage}>{message}</p>
            </div>
        </div>
    );
}