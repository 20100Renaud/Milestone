import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import Controls from "../controls/Controls";
import JourneyList from "../journeys/JourneyList";

function BottomPanelStack({ children, resetKeys = [] }, ref) {
  const [expandedPanel, setExpandedPanel] = useState(null);

  function togglePanel(panel) {
    setExpandedPanel((current) => (current === panel ? null : panel));
  }

  function openPanel(panel) {
    setExpandedPanel(panel);
  }

  function closePanel() {
    setExpandedPanel(null);
  }

  useImperativeHandle(ref, () => ({
    openPanel,
    closePanel,
  }));

  useEffect(() => {
    setExpandedPanel(null);
  }, resetKeys);

  return (
    <div className="flex flex-col">
      {typeof children === "function"
        ? children({
            expandedPanel,
            togglePanel,
            openPanel,
            closePanel,
          })
        : children}
    </div>
  );
}

export default forwardRef(BottomPanelStack);
