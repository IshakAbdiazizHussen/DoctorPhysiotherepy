from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_health_routes() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}

    versioned_response = client.get("/api/v1/health")
    assert versioned_response.status_code == 200
    assert versioned_response.json() == {"status": "ok"}
