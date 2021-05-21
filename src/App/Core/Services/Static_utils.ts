export class Static_utils {
  public static determineClassName(baseClassName: string, valid: boolean): string {
    return `${baseClassName}${valid? '': ' invalid'}`
  }
}
