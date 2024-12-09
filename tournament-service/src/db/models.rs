#![allow(dead_code)]

use diesel::prelude::*;

#[derive(Queryable)]
#[diesel(table_name = tournaments)]
pub struct Tournament {
    pub id: Option<uuid::Uuid>,
    pub name: String,
    pub description: Option<String>,
    pub organization_id: uuid::Uuid,
    pub start_date: chrono::NaiveDateTime,
    pub registration_open_date: chrono::NaiveDateTime,
    pub registration_close_date: chrono::NaiveDateTime,
    pub max_teams: i32,
    pub current_team_count: i32,
    pub status: String,
}
#[derive(Queryable)]
#[diesel(table_name = prizes)]
pub struct Prize {
    pub id: Option<uuid::Uuid>,
    pub tournament_id: uuid::Uuid,
    pub position: i32,
    pub description: String,
    pub prize_amount: f64,
}
#[derive(Queryable)]
#[diesel(table_name = team_registrations)]
pub struct TeamRegistration {
    pub id: Option<uuid::Uuid>,
    pub tournament_id: uuid::Uuid,
    pub team_name: String,
    pub team_leader_id: uuid::Uuid,
    pub registration_status: String,
    pub registered_at: chrono::NaiveDateTime,
}

#[derive(Queryable)]
#[diesel(table_name = team_players)]
pub struct TeamPlayer {
    pub id: Option<uuid::Uuid>,
    pub team_registration_id: uuid::Uuid,
    pub player_id: uuid::Uuid,
    pub role: String,
}
