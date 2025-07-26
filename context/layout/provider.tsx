"use client";
import React, { ReactNode } from "react";
import { BlocksPanel, InspectorPanel, BottomPanel, ViewPanel, TopBar, LeftBar } from "./manager";

export function LayoutProvider({ children }: { children: ReactNode }) {
    return (
        <ViewPanel.Provider>
            <BlocksPanel.Provider>
                <InspectorPanel.Provider>
                    <BottomPanel.Provider>
                        <LeftBar.Provider>
                            <TopBar.Provider>
                                {children}
                            </TopBar.Provider>
                        </LeftBar.Provider>
                    </BottomPanel.Provider>
                </InspectorPanel.Provider>
            </BlocksPanel.Provider>
        </ViewPanel.Provider>
    );
}