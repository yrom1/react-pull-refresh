import React, { useState } from "react";

function PullToRefresh() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshText, setRefreshText] = useState("Pull to refresh");
  const [lastY, setLastY] = useState(null);

  const handleTouchStart = (e) => {
    setLastY(e.touches[0].clientY);
  };

  const handleTouchMove = (e) => {
    const currentY = e.touches[0].clientY;
    const distance = currentY - lastY;
    setLastY(currentY);

    if (distance > 0 && window.scrollY === 0) {
      e.preventDefault();
      setRefreshText("Release to refresh");
    } else {
      setRefreshText("Pull to refresh");
    }
  };

  const handleTouchEnd = (e) => {
    if (window.scrollY === 0 && refreshText === "Release to refresh") {
      setIsRefreshing(true);
      setRefreshText("Refreshing...");
      setTimeout(() => {
        setIsRefreshing(false);
        setRefreshText("Pull to refresh");
      }, 2000);
    } else {
      setRefreshText("Pull to refresh");
    }
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ textAlign: "center", padding: "20px 0" }}
    >
      {isRefreshing ? (
        <div>
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>
            Refreshing...
          </div>
          <div className="spinner"></div>
        </div>
      ) : (
        <div>{refreshText}</div>
      )}
    </div>
  );
}

export default PullToRefresh;
