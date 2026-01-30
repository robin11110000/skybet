// Simple Flight Betting Contract for Leo Playground
// Based on flightInsurance patterns, simplified for testing

program flight_betting.aleo {

    // Flight outcome (simple enum)
    enum FlightOutcome {
        unresolved,
        ontime,
        delayed,
        cancelled
    }

    // Simple bet record (minimal for Playground)
    record FlightBet {
        owner: address,
        flight_id: field,
        outcome: FlightOutcome,
        amount: u64,
        is_active: bool
    }

    // Create flight market
    transition create_market(
        flight_data: field,
        creator: address
    ) -> FlightBet {
        let flight_id: field = Poseidon::hash_to_field([flight_data]);
        
        return FlightBet {
            owner: creator,
            flight_id: flight_id,
            outcome: FlightOutcome::unresolved,
            amount: 0u64,
            is_active: true
        };
    }

    // Place bet on flight
    transition place_bet(
        market: FlightBet,
        prediction: FlightOutcome,
        bet_amount: u64,
        bettor: address
    ) -> FlightBet {
        // Simple validation
        assert_eq(market.is_active, true);
        assert_eq(market.outcome, FlightOutcome::unresolved);
        
        return FlightBet {
            owner: bettor,
            flight_id: market.flight_id,
            outcome: prediction,
            amount: bet_amount,
            is_active: true
        };
    }

    // Resolve flight outcome
    transition resolve_flight(
        market: FlightBet,
        actual_outcome: FlightOutcome
    ) -> FlightBet {
        assert_eq(market.owner, self.caller);
        
        return FlightBet {
            owner: market.owner,
            flight_id: market.flight_id,
            outcome: actual_outcome,
            amount: market.amount,
            is_active: false
        };
    }

    // Simple constructor
    @noupgrade
    async constructor() {}
}