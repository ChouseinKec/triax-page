"use client";

import { useState, useEffect, lazy } from "react";

// Initialization
import { init } from "@/src/core/init";

// Styles
import CSS from "./page.module.scss";

// Components
import { TriaxLoadingSpinner } from "./triax-loading-spinner";

// Utilities
import { devLog } from "@/src/shared/utilities/dev";

// Lazy load PageEditor to prevent import cascade
const PageEditor = lazy(() => import("@/src/features/layout/page"));

export default function Home() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    init.run()
      .then((result) => {
        if (result.valid) {
          setIsReady(true);
        } else {
          devLog.error('Initialization error:', result.message || 'Unknown initialization error');
        }
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
      <PageEditor />
    </main>
  );
}


