export function shouldHandleNotify(
  firstReceiver: string,
  contract: string,
  from: string
): boolean {
  if (firstReceiver !== contract) return false;
  if (from === contract) return false;
  return true;
}
