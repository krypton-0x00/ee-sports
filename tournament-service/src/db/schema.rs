// @generated automatically by Diesel CLI.

pub mod sql_types {
    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "team_player_role"))]
    pub struct TeamPlayerRole;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "team_registration_status"))]
    pub struct TeamRegistrationStatus;

    #[derive(diesel::query_builder::QueryId, Clone, diesel::sql_types::SqlType)]
    #[diesel(postgres_type(name = "tournament_status"))]
    pub struct TournamentStatus;
}

diesel::table! {
    prizes (id) {
        id -> Uuid,
        tournament_id -> Uuid,
        position -> Int4,
        description -> Text,
        prize_amount -> Float8,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::TeamPlayerRole;

    team_players (id) {
        id -> Uuid,
        team_registration_id -> Uuid,
        player_id -> Uuid,
        role -> TeamPlayerRole,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::TeamRegistrationStatus;

    team_registrations (id) {
        id -> Uuid,
        tournament_id -> Uuid,
        team_name -> Text,
        team_leader_id -> Uuid,
        registration_status -> TeamRegistrationStatus,
        registered_at -> Nullable<Timestamptz>,
    }
}

diesel::table! {
    teamplayers (id) {
        id -> Text,
        teamregistrationid -> Text,
        playerid -> Text,
        role -> Text,
    }
}

diesel::table! {
    teamregistrations (id) {
        id -> Text,
        tournamentid -> Text,
        teamname -> Text,
        teamleaderid -> Text,
        registrationstatus -> Text,
        registeredat -> Timestamp,
    }
}

diesel::table! {
    use diesel::sql_types::*;
    use super::sql_types::TournamentStatus;

    tournaments (id) {
        id -> Uuid,
        name -> Text,
        description -> Nullable<Text>,
        organization_id -> Uuid,
        start_date -> Timestamptz,
        registration_open_date -> Timestamptz,
        registration_close_date -> Timestamptz,
        max_teams -> Int4,
        current_team_count -> Nullable<Int4>,
        status -> TournamentStatus,
    }
}

diesel::joinable!(prizes -> tournaments (tournament_id));
diesel::joinable!(team_players -> team_registrations (team_registration_id));
diesel::joinable!(team_registrations -> tournaments (tournament_id));
diesel::joinable!(teamplayers -> teamregistrations (teamregistrationid));

diesel::allow_tables_to_appear_in_same_query!(
    prizes,
    team_players,
    team_registrations,
    teamplayers,
    teamregistrations,
    tournaments,
);
