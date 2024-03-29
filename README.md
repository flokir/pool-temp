# PoolTemp
A web-based software to track the temperature of any swimming pool or other sensor.

# Features
- [x] Display current temperature of sensor
- [x] Display history of the last 24 hours of a sensor
- [x] Up-to-date measurements can be collected via API
- [x] Responsive to support mobile devices
- [x] Support multiple sensors
- [ ] Api keys to authenticate sensors

# Result
![Image of the webinterface](result.png)
# Software
The software consists of an API (pool-temp-backend) and a webinterface (pool-temp-web).

The specification of the API can be found here [api-spec](pool-temp-backend/api-spec.yaml)
# Hardware
Hardware is yet to be developed, however I am planning to use an ESP-32 in combination with a waterproof ds18b20 sensor to get precise measurements of the water temperature.

# Running the software
To run the software simply run the provided docker compose file with `docker compose run`.

The frontend can now be reached on port `3000`, the backend on port `3001`.
