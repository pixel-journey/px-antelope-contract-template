/**
 * WharfKit session sketch. Account names are placeholders chosen at deploy.
 * Requires @wharfkit/session and a WalletPlugin for the chain you target.
 */
import { Session } from "@wharfkit/session";

export async function setPaused(session: Session, contract: string, paused: boolean) {
  return session.transact({
    actions: [
      {
        account: contract,
        name: "setpaused",
        authorization: [session.permissionLevel],
        data: { paused },
      },
    ],
  });
}
