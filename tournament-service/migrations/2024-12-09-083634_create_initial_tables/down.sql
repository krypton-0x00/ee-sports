-- This file should undo anything in `up.sql`

DROP TABLE IF EXISTS team_players;
DROP TABLE IF EXISTS team_registrations;
DROP TABLE IF EXISTS prizes;
DROP TABLE IF EXISTS tournaments;

DROP TYPE IF EXISTS map_type;
DROP TYPE IF EXISTS tournament_status;
DROP TYPE IF EXISTS team_registration_status;
DROP TYPE IF EXISTS team_player_role;
