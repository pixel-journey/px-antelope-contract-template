#include <eosio/eosio.hpp>
#include <eosio/singleton.hpp>

using namespace eosio;

// Copy this file. Rename the CONTRACT identifier to a valid C++ name (underscores).
// The repo slug keeps hyphens. The on-chain account is chosen at deploy.
CONTRACT px_template : public contract {
public:
    using contract::contract;

    struct [[eosio::table]] config_row {
        bool paused = false;
    };
    typedef singleton<"config"_n, config_row> config_table;

    [[eosio::action]]
    void setpaused(bool paused) {
        require_auth(get_self());
        config_table cfg(get_self(), get_self().value);
        auto row = cfg.get_or_default();
        row.paused = paused;
        cfg.set(row, get_self());
    }

    // Notify handlers belong on the quest contract, not here.
    // Pattern:
    //   if (from == get_self() || to != get_self()) return;
    //   check(get_first_receiver() == expected_contract, "fake token");
};
