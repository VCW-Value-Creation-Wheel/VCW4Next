ARG KC_VERSION=20.0.2

FROM quay.io/keycloak/keycloak:${KC_VERSION} as builder

# Enable health and metrics support
ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
# Configure a database vendor
ENV KC_DB=postgres

WORKDIR /opt/keycloak

COPY themes/. themes/
# COPY ./realms/ /tmp/import
# COPY ./providers/ /opt/keycloak/providers/

ENTRYPOINT [ "/opt/keycloak/bin/kc.sh","start", "--spi-theme-static-max-age=-1", "--spi-theme-cache-themes=false", "--spi-theme-cache-templates=false"]