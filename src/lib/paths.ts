import { pathToRegexp } from "path-to-regexp";

export const paths = {
  toRegexp: (path: string): RegExp => {
    try {
      return pathToRegexp(path);
    } catch (e) {
      const errorMessage = `Invalid path: ${path}. Consult the documentation of path-to-regexp here: https://github.com/pillarjs/path-to-regexp`;
      if (e instanceof Error) {
        throw new Error(`${errorMessage} ${e.message}`);
      } else {
        throw new Error(errorMessage);
      }
    }
  },
};
