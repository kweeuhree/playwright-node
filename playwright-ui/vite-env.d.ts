/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_LOCALHOST: string;
  VITE_NODE_ENV: string;
  VITE_ON_RENDER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
