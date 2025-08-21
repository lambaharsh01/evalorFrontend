
export function getScreenSize(): { width: number; height: number } {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

export function isMdOrLess(): boolean {
  return window.innerWidth < 768;
}

export function isMdOrMore(): boolean {
  return window.innerWidth >= 768;
}
