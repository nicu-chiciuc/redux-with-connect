/**
 * Based on https://gist.github.com/gordonbrander/2230317
 */
export function randomId(): string {
  return Math.random().toString(36).substr(2, 9);
}

/**
 * This function can be added in the default case of a switch statement
 * so that the switch is exhaustive (https://stackoverflow.com/a/39419171)
 * When this is added typescript will show an error if one of the possibilities
 * of an enum was not taken into account. See Compose.js setContent() for example
 */
export function unreachable(v: never): never {
  return v;
}
