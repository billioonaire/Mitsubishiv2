/// <reference types="react-scripts" />

declare module '*.png' {
    const src: string;
    export default src;
}

declare module '*.gif' {
    const src: string;
    export default src;
  }

  declare module '*.ttf' {
    const src: string;
    export default src;
  }

interface Window {
    ethereum: any;
}
