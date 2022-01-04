# Webapplication frontend for a Raspberry Pi 4 weatherstation

# What it does
This application is written in JavaScript / VueJS acts as a full featured weather station running in the web browser.
The main features are display current measurements, peak values (*min*, *max*, *avg*) and a special feature is the possibility to watch long-term data.
The graphical visualization is done with the javascript library d3.

# Preview
![Weatherstation](./src/assets/preview.png)

# Annotations
This application does not run stand alone and depends from this repositories:

[APIServer](https://github.com/wolfbiker1/weatherStationAPIServer)
[SensorDrivers](https://github.com/wolfbiker1/sensorDrivers)