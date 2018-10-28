declare function wd(params: wd.Params): wd.Params;

declare namespace wd {
  interface Params {
    name: string;
  }
}

export = wd;
