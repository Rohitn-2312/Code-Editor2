export interface Language {
    code: string;
    name: string;
  }
  
  export interface File {
    id: string;
    name: string;
    content: string;
    language: Language;
  }
  
  export interface Folder {
    id: string;
    name: string;
    files: File[];
  }