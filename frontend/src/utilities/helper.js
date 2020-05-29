import { process } from "uniqid";

export const setOnloadEvent = () => {
  console.log(`window.performance.timing.domContentLoadedEventEnd- window.performance.timeOrigin;`, window.performance.timing.domContentLoadedEventEnd- window.performance.timeOrigin);
  return window.performance.timing.domContentLoadedEventEnd- window.performance.timeOrigin;
}
