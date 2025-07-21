"use client";
import React, { ReactNode } from "react";
import { LeftPanel, RightPanel, BottomPanel, ViewPanel } from "./manager";

export function LayoutProvider({ children }: { children: ReactNode }) {
    return (
        <ViewPanel.Provider>
            <LeftPanel.Provider>
                <RightPanel.Provider>
                    <BottomPanel.Provider>
                        {children}
                    </BottomPanel.Provider>
                </RightPanel.Provider>
            </LeftPanel.Provider>
        </ViewPanel.Provider>
    );
}