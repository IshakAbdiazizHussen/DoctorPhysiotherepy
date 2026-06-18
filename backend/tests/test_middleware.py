from app.core.config import settings


def test_cors_allows_configured_origin_on_health_route(client) -> None:
    allowed_origin = settings.BACKEND_CORS_ORIGINS[0]

    response = client.get(
        "/health",
        headers={"Origin": allowed_origin},
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == allowed_origin
    assert response.headers["access-control-allow-credentials"] == "true"


def test_cors_handles_preflight_for_versioned_auth_route(client) -> None:
    allowed_origin = settings.BACKEND_CORS_ORIGINS[0]

    response = client.options(
        "/api/v1/auth/login",
        headers={
            "Origin": allowed_origin,
            "Access-Control-Request-Method": "POST",
            "Access-Control-Request-Headers": "content-type,authorization",
        },
    )

    assert response.status_code == 200
    assert response.headers["access-control-allow-origin"] == allowed_origin
    assert response.headers["access-control-allow-credentials"] == "true"
    assert "POST" in response.headers["access-control-allow-methods"]
    assert "content-type" in response.headers["access-control-allow-headers"].lower()


def test_cors_does_not_allow_unknown_origin(client) -> None:
    response = client.get(
        "/api/v1/health",
        headers={"Origin": "https://not-allowed.example.com"},
    )

    assert response.status_code == 200
    assert "access-control-allow-origin" not in response.headers
