/*eslint no-undef: "off"*/

export async function getText(path: any) {
  return await myShell.getText(path);
}
export async function writeText(path: any) {
  return await myShell.writeText(path);
}
export async function startTimer(number: number) {
  return await myShell.startTimer(number);
}
