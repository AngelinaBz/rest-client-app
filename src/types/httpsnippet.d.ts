declare module 'httpsnippet' {
  export default class HTTPSnippet {
    constructor(harRequest: unknown);
    convert(target: string, client?: string): string | null;
  }
}
