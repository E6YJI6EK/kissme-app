/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}


declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "*.svg" {
  const content: any;
  export default content;
}