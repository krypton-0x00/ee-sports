CREATE TYPE map_type AS ENUM ('ERANGEL', 'MIRAMAR', 'SANHOK', 'VIKENDI');
CREATE TYPE tournament_status AS ENUM ('DRAFT', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED', 'CANCELLED');
CREATE TYPE team_registration_status AS ENUM ('PENDING', 'APPROVED', 'REJECTED');
CREATE TYPE team_player_role AS ENUM ('LEADER', 'MEMBER');


CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    organization_id UUID NOT NULL,
    game_mode TEXT NOT NULL,
    map_type map_type NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    registration_open_date TIMESTAMPTZ NOT NULL,
    registration_close_date TIMESTAMPTZ NOT NULL,
    max_teams INT NOT NULL,
    current_team_count INT DEFAULT 0,
    status tournament_status NOT NULL DEFAULT 'DRAFT'
);

CREATE TABLE prizes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    position INT NOT NULL,
    description TEXT NOT NULL,
    prize_amount FLOAT NOT NULL
);

CREATE TABLE team_registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id) ON DELETE CASCADE,
    team_name TEXT NOT NULL,
    team_leader_id UUID NOT NULL,
    registration_status team_registration_status NOT NULL DEFAULT 'PENDING',
    registered_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE team_players (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    team_registration_id UUID NOT NULL REFERENCES team_registrations(id) ON DELETE CASCADE,
    player_id UUID NOT NULL,
    role team_player_role NOT NULL DEFAULT 'MEMBER'
);

