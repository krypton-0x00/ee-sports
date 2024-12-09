use rocket::{get, launch, routes, Build, Rocket};

mod config;
mod db;
mod routes;
mod services;

#[get("/health")]
fn health() -> &'static str {
    "Ok"
}
async fn initialize_db(rocket: Rocket<Build>) -> Rocket<Build> {
    db::db::connect_db();
    rocket
}

#[launch]
pub fn launch_server() -> _ {
    rocket::build()
        .attach(rocket::fairing::AdHoc::on_ignite(
            "Database Initilization",
            initialize_db,
        ))
        .mount("/", routes![health])
}

#[cfg(test)]
mod tests {
    use super::*;
    use rocket::{http::Status, local::blocking::Client};

    #[test]
    fn test_health_check() {
        let client = Client::tracked(launch_server()).expect("Valid Rocket Client");
        let req = client.get("/health");
        let response = req.dispatch();

        assert_eq!(response.status(), Status::Ok);
        assert_eq!(response.into_string().unwrap(), "Ok");
    }
}
