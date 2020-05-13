export const setOnloadEvent = () => {
  return window.performance.timing.domContentLoadedEventEnd- window.performance.timing.navigationStart;
}