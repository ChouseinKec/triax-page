"use client";

import { useState, useEffect, lazy } from "react";

// Initialization
import { initStores } from "@/init";

// Styles
import CSS from "./page.module.scss";

// Components
import { TriaxLoadingSpinner } from "./triax-loading-spinner";

// Utilities
import { devLog } from "@/shared/utilities/dev";

// Lazy load Page to prevent import cascade
const Page = lazy(() => import("@/core/layout/page/components/editor"));

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    initStores()
      .then(() => {
        setIsReady(true);
      })
      .catch((error) => {
        devLog.error('Initialization error:', error);
      });
  }, []);

  if (!isReady) {
    return <TriaxLoadingSpinner message="Loading...." />;
  }


  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
  }

  return (
    <main className={CSS.main} onContextMenu={handleRightClick}>
      <Page />
    </main>
  );
}


