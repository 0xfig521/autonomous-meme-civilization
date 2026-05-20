module autonomous_meme_civilization::civilization;

use std::string::String;
use sui::clock::Clock;
use sui::object::{Self, ID, UID};
use sui::tx_context::{Self, TxContext};

public struct MemeCivilization has key, store {
    id: UID,
    creator: address,
    name: String,
    symbol: String,
    followers: u64,
    influence: u64,
    treasury_score: u64,
    aggression: u8,
    stability: u8,
    level: u64,
    lore_hash: vector<u8>,
    walrus_ref: vector<u8>,
    created_at: u64,
}

public struct CivilizationEvent has key, store {
    id: UID,
    civilization_id: ID,
    event_type: u8,
    event_hash: vector<u8>,
    created_at: u64,
}

public struct Alliance has key, store {
    id: UID,
    civilization_a: ID,
    civilization_b: ID,
    strength: u64,
    created_at: u64,
}

public struct MemeWar has key, store {
    id: UID,
    attacker: ID,
    defender: ID,
    result: u8,
    influence_change: u64,
    attacker_won: bool,
    created_at: u64,
}

public fun create_civilization(
    name: String,
    symbol: String,
    aggression: u8,
    stability: u8,
    lore_hash: vector<u8>,
    walrus_ref: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext,
) : MemeCivilization {
    MemeCivilization {
        id: object::new(ctx),
        creator: tx_context::sender(ctx),
        name,
        symbol,
        followers: 100,
        influence: 50,
        treasury_score: 1000,
        aggression,
        stability,
        level: 1,
        lore_hash,
        walrus_ref,
        created_at: clock.timestamp_ms(),
    }
}

public fun record_event(
    civilization_id: ID,
    event_type: u8,
    event_hash: vector<u8>,
    clock: &Clock,
    ctx: &mut TxContext,
) : CivilizationEvent {
    CivilizationEvent {
        id: object::new(ctx),
        civilization_id,
        event_type,
        event_hash,
        created_at: clock.timestamp_ms(),
    }
}

public fun form_alliance(
    civilization_a: ID,
    civilization_b: ID,
    strength: u64,
    clock: &Clock,
    ctx: &mut TxContext,
) : Alliance {
    Alliance {
        id: object::new(ctx),
        civilization_a,
        civilization_b,
        strength,
        created_at: clock.timestamp_ms(),
    }
}

public fun record_war(
    attacker: ID,
    defender: ID,
    result: u8,
    influence_change: u64,
    attacker_won: bool,
    clock: &Clock,
    ctx: &mut TxContext,
) : MemeWar {
    MemeWar {
        id: object::new(ctx),
        attacker,
        defender,
        result,
        influence_change,
        attacker_won,
        created_at: clock.timestamp_ms(),
    }
}
