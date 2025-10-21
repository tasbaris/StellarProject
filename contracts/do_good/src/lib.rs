#![no_std]
use soroban_sdk::{contract, contractimpl, Address, Env, String, symbol_short, Symbol, Map};

const KEY_TOTAL: Symbol = symbol_short!("tot");
const KEY_LAST: Symbol = symbol_short!("lst");
const KEY_IMPACT: Symbol = symbol_short!("imp");

#[contract]
pub struct DoGood;

fn persistent<E: Copy>(env: &Env) -> soroban_sdk::storage::Persistent {
    env.storage().persistent()
}

#[contractimpl]
impl DoGood {
    pub fn log_action(env: Env, who: Address, description: String) {
        who.require_auth();
        let store = persistent(&env);

        // total actions
        let total: u32 = store.get(&KEY_TOTAL).unwrap_or(0u32);
        store.set(&KEY_TOTAL, &(total + 1));

        // last contributor
        store.set(&KEY_LAST, &who);

        // user impact map<Address, u32> under KEY_IMPACT
        let mut map: Map<Address, u32> = store.get(&KEY_IMPACT).unwrap_or(Map::new(&env));
        let current = map.get(who.clone()).unwrap_or(0u32);
        map.set(who, current + 1);
        store.set(&KEY_IMPACT, &map);

        // store description in events for simplicity
        env.events().publish((symbol_short!("log"),), (description,));
    }

    pub fn get_total_actions(env: Env) -> u32 {
        persistent(&env).get(&KEY_TOTAL).unwrap_or(0u32)
    }

    pub fn get_last_contributor(env: Env) -> Address {
        persistent(&env).get(&KEY_LAST).unwrap_or(Address::generate(&env))
    }

    pub fn get_user_impact(env: Env, who: Address) -> u32 {
        let store = persistent(&env);
        let map: Map<Address, u32> = store.get(&KEY_IMPACT).unwrap_or(Map::new(&env));
        map.get(who).unwrap_or(0u32)
    }
}
