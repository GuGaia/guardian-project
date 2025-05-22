import requests

def reverse_geocode(lat: float, lon: float) -> str | None:
    url = "https://nominatim.openstreetmap.org/reverse"
    params = {
        "format": "jsonv2",
        "lat": lat,
        "lon": lon,
        "addressdetails": 1
    }
    headers = {
        "User-Agent": "guardian-backend/1.0"
    }
    resp = requests.get(url, params=params, headers=headers, timeout=5)
    if resp.status_code == 200:
        data = resp.json()
        return data.get("display_name")
    return None
