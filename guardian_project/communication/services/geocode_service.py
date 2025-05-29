import requests

def reverse_geocode(lat: float, lon: float) -> str | None:
    try:
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
    except Exception as e:
        # Podemos logar o erro se necessário
        pass
    return None

def get_current_location() -> dict | None:
    try:
        ip_resp = requests.get("https://api.ipify.org", timeout=5)
        if ip_resp.status_code != 200:
            return None
        
        ip_address = ip_resp.text.strip()

        url = f"https://get.geojs.io/v1/ip/geo/{ip_address}.json"
        geo_resp = requests.get(url, timeout=5)

        if geo_resp.status_code == 200:
            return geo_resp.json()
        else:
            return None
    except requests.RequestException as e:

        return None