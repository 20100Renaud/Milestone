export function getAccuracyStatus(accuracy) {
  if (accuracy == null) {
    return {
      label: "Waiting for GPS...",
      className: "text-slate-400",
    };
  }

  if (accuracy <= 5) {
    return {
      label: "Excellent",
      className: "text-green-500",
    };
  }

  if (accuracy <= 10) {
    return {
      label: "Good",
      className: "text-green-400",
    };
  }

  if (accuracy <= 20) {
    return {
      label: "Fair",
      className: "text-yellow-400",
    };
  }

  if (accuracy <= 50) {
    return {
      label: "Poor",
      className: "text-orange-400",
    };
  }

  return {
    label: "Very Poor",
    className: "text-red-400",
  };
}
