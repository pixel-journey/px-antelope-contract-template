// Layout example for a PxDev Tier B micro-contract.
// cdt-cpp was not run on this file. The tested counter is invariants/ping.ts.
// Account name pxexample is a placeholder. It is not a WAX account.

#include <eosio/eosio.hpp>

using namespace eosio;

CONTRACT pxexample : public contract {
 public:
  using contract::contract;

  ACTION ping(name user) {
    require_auth(user);
    stats_t stats(get_self(), get_self().value);
    auto itr = stats.find(user.value);
    if (itr == stats.end()) {
      stats.emplace(user, [&](auto& row) {
        row.user = user;
        row.pings = 1;
      });
      return;
    }
    check(itr->pings < 0xffffffffu, "ping cap");
    stats.modify(itr, user, [&](auto& row) { row.pings += 1; });
  }

 private:
  TABLE stat {
    name user;
    uint32_t pings;

    uint64_t primary_key() const { return user.value; }
  };

  using stats_t = multi_index<"stats"_n, stat>;
};
