interface Transports {
  Console: (options: {}) => void;
}
declare module 'winston' {
  export const transports: Transports;
}

declare module 'firebase-tools/lib/logger' {
  export const add: (transport: Transports['Console'], config: any) => void;
}

declare module 'firebase-tools/lib/ensureDefaultCredentials' {
  function ensureDefaultCredentials(): void;
  namespace ensureDefaultCredentials {

  }
  export = ensureDefaultCredentials;
}

declare module 'firebase-tools' {
  export const login: (
    options: {
      localhost: boolean;
    }
  ) => void;

  export const auth: {
    upload: (dataFile: string, {}) => void;
    export: (
      dataFile: string,
      options: {
        format: 'json' | 'csv';
      }
    ) => void;
  };

  export const firestore: {
    delete: (
      path: string,
      options: {
        allCollections?: boolean;
        recursive?: boolean;
        shallow?: boolean;
      }
    ) => void;
  };
}
