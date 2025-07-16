import Keycloack from "keycloak-js";

const keycloakConfig = {
  url: "http://keycloak:8080",
  realm: "React-auth",
  clientId: "react-auth",
};

export const keycloak = new Keycloack(keycloakConfig);