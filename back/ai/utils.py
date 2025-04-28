import random

def get_weather_by_location(location):
    return random.choice(['rainy', 'sunny', 'cloudy'])

def get_country_from_coords(lat, lon):
    if float(lat) > 30:
        return 'Japan'
    return 'Iran'
