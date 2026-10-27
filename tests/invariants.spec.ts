/**
 * Invariants for the template. A green cdt-cpp run is not a pass.
 * These are the checks a later harness (WharfKit + a local node) must execute.
 */
export const invariants = [
  {
    id: "pause-auth",
    expect: "setpaused without the contract authority throws missing authority",
  },
  {
    id: "msig-recovery",
    expect: "an eosio.msig proposal that satisfies the contract active permission can set paused=false",
  },
  {
    id: "no-user-action-name",
    expect: "no action forwards a user-supplied name into an inline action",
  },
];
