"use client";
import OnboardPanel from "@/components/OnboardPanel";
import { useEffect, useState } from "react";
import axios from "axios";
function TrackMap({
  selectedSector,
  setSelectedSector,
  raceControl,
  trackZones,
}: {
  selectedSector: string;
  setSelectedSector: any;
  raceControl: any[];
  trackZones: any[];
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

      <div className="flex items-center justify-between mb-5">
        <h2 className="text-xl font-semibold">
          Nordschleife Map
        </h2>

        <span className="text-green-400 text-sm">
          LIVE
        </span>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#101010] p-5 overflow-hidden">

       <div className="relative">

  <img
    src="/nords-map.png"
    alt="Nordschleife Map"
    className="w-full rounded-2xl"
  />
  {trackZones.map(
  (zone, index) => {

    const colorMap: any = {
      green: "bg-green-400",
      yellow: "bg-yellow-400",
      blue: "bg-blue-400",
      purple: "bg-purple-400",
    };

    return (
      <button
        key={index}
        onClick={() =>
          setSelectedSector(
            zone.name
          )
        }
        className="absolute"
        style={{
          left: zone.x,
          top: zone.y,
        }}
      >

        <div
          className={`absolute h-6 w-6 rounded-full animate-ping opacity-70 ${
            colorMap[
              zone.color
            ]
          }`}
        />

        <div
          className={`relative h-6 w-6 rounded-full border-2 border-white ${
            colorMap[
              zone.color
            ]
          } flex items-center justify-center`}
        >

          {zone.alert ===
          "CODE60" ? (
            <span className="text-[10px] font-bold text-white">
              60
            </span>
          ) : zone.alert ===
            "YELLOW" ? (
            <span className="text-[10px] font-bold text-black">
              !
            </span>
          ) : null}

        </div>
      </button>
    );
  }
)}

  
  {raceControl.map(
  (alert, index) => {
    let position =
      "left-[50%] top-[50%]";

    if (
      alert.sector ===
      "Brünnchen"
    ) {
      position =
        "left-[88%] top-[34%]";
    }

    if (
      alert.sector ===
      "Karussell"
    ) {
      position =
        "left-[63%] top-[28%]";
    }

    return (
      <div
        key={index}
        className={`absolute ${position}`}
      >
        <div
          className={`h-8 w-8 rounded-full animate-pulse flex items-center justify-center text-xs font-bold border-2 border-white ${
            alert.type ===
            "CODE60"
              ? "bg-red-600"
              : "bg-yellow-400 text-black"
          }`}
        >
          {alert.type ===
          "CODE60"
            ? "60"
            : "!"
          }
        </div>
      </div>
    );
  }
)}

</div>

<div className="mt-5 rounded-2xl border border-white/10 bg-[#101010] p-4">

  <h3 className="text-lg font-semibold text-green-400">
    {selectedSector}
  </h3>

  <div className="mt-3 space-y-2 text-white/70">

    {trackZones
  .filter(
    (
      zone: any
    ) =>
      zone.name ===
      selectedSector
  )
  .map(
    (
      zone: any,
      index: number
    ) => (
      <div
        key={index}
        className="space-y-2"
      >

        <p>
          Weather →{" "}
          {zone.weather}
        </p>

        <p>
          Grip →{" "}
          {zone.weather ===
          "Wet"
            ? "Low"
            : zone.weather ===
              "Damp"
            ? "Medium"
            : "High"}
        </p>

        <p>
          Alert →{" "}
          {zone.alert ||
            "CLEAR"}
        </p>

      </div>
    )
  )}

  </div>
</div>

      <div className="mt-5 rounded-2xl border border-red-500/30 bg-[#101010] p-4">

          <h3 className="text-lg font-semibold text-red-400">
            Race Control
          </h3>

          <div className="mt-3 space-y-2">

            {raceControl.map(
              (
                alert,
                index
              ) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-[#161616] p-3"
                >
                  <span>
                    {alert.sector}
                  </span>

                  <span
                    className={`font-bold ${
                      alert.type ===
                      "CODE60"
                        ? "text-red-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {alert.type}
                  </span>
                </div>
              )
            )}

          </div>
        </div>

      <div className="mt-4 grid grid-cols-2 lg:grid-cols-4 gap-3">

        <div className="rounded-xl bg-[#161616] border border-white/10 p-3">
          🌧 Karussell → Wet
        </div>

        <div className="rounded-xl bg-[#161616] border border-white/10 p-3">
          🌫 Hohe Acht → Fog
        </div>

        <div className="rounded-xl bg-[#161616] border border-white/10 p-3">
          ☀ GP Sector → Dry
        </div>

        <div className="rounded-xl bg-[#161616] border border-white/10 p-3">
          🟨 Sector 4 → Yellow
        </div>

      </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3 text-sm">

        <div className="rounded-2xl border border-white/10 bg-[#101010] p-3 text-center">
          <div className="mb-2 h-3 w-3 rounded-full bg-green-500 mx-auto" />
          Dry
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101010] p-3 text-center">
          <div className="mb-2 h-3 w-3 rounded-full bg-yellow-500 mx-auto" />
          Damp
        </div>

        <div className="rounded-2xl border border-white/10 bg-[#101010] p-3 text-center">
          <div className="mb-2 h-3 w-3 rounded-full bg-purple-500 mx-auto" />
          Fog
        </div>

      </div>

    </div>
  );
}
export default function Home() {
  const [weather, setWeather] = useState({
    airTemp: "--",
    condition: "Loading...",
    wind: "--",
    humidity: "--",
  });

  const [leaderboard, setLeaderboard] =
    useState<any[]>([]);

  const [events, setEvents] =
  useState<any[]>([]);

  const [trackConditions, setTrackConditions] =
  useState<any[]>([]);
  const [selectedSector, setSelectedSector] =
  useState("Karussell");

  const [raceControl, setRaceControl] =
  useState([
    {
      sector: "Brünnchen",
      type: "CODE60",
    },
    {
      sector: "Karussell",
      type: "YELLOW",
    },
  ]);

const trackZones = [
  {
    name: "Flugplatz",
    x: "7%",
    y: "67%",
    weather: "Dry",
    alert: null,
    color: "green",
  },

  {
    name: "Schwedenkreuz",
    x: "4%",
    y: "47%",
    weather: "Damp",
    alert: "YELLOW",
    color: "yellow",
  },

  {
    name: "Adenauer Forst",
    x: "15%",
    y: "20%",
    weather: "Wet",
    alert: null,
    color: "blue",
  },

  {
    name: "Bergwerk",
    x: "54%",
    y: "1%",
    weather: "Fog",
    alert: null,
    color: "purple",
  },

  {
    name: "Karussell",
    x: "77%",
    y: "25%",
    weather: "Wet",
    alert: "YELLOW",
    color: "blue",
  },

  {
    name: "Hohe Acht",
    x: "90%",
    y: "18%",
    weather: "Fog",
    alert: null,
    color: "purple",
  },

  {
    name: "Brünnchen",
    x: "95%",
    y: "35.5%",
    weather: "Damp",
    alert: "CODE60",
    color: "yellow",
  },

  {
    name: "Pflanzgarten",
    x: "89%",
    y: "43%",
    weather: "Dry",
    alert: null,
    color: "green",
  },

  {
    name: "Ex-Mühle",
    x: "35%",
    y: "3%",
    weather: "Dry",
    alert: null,
    color: "green",
  },

  {
    name: "Döttinger Höhe",
    x: "59%",
    y: "62%",
    weather: "Dry",
    alert: null,
    color: "green",
  },
];

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey =
          process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

        const lat = 50.3356;
        const lon = 6.9475;

        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
        );

        const deg =
          res.data.wind.deg || 0;

        const getWindDirection = (
          deg: number
        ) => {
          const directions = [
            "N ↑",
            "NE ↗",
            "E →",
            "SE ↘",
            "S ↓",
            "SW ↙",
            "W ←",
            "NW ↖",
          ];

          return directions[
            Math.round(deg / 45) % 8
          ];
        };

        setWeather({
          airTemp: `${Math.round(
            res.data.main.temp
          )}°C`,
          condition:
            res.data.weather[0].main,
          wind: `${Math.round(
            res.data.wind.speed * 3.6
          )} km/h ${getWindDirection(
            deg
          )}`,
          humidity: `${res.data.main.humidity}%`,
        });
      } catch (err) {
        console.error(
          "Weather fetch failed",
          err
        );
      }
    };

    const fetchTiming = async () => {
      try {
        const res =
          await axios.get(
            "/api/timing"
          );

        setLeaderboard(
          res.data.leaderboard
        );

        setEvents(
          res.data.events || []
        );

        setTrackConditions(
           res.data.trackConditions || []
        );

      } catch (err) {
        console.error(
          "Timing fetch failed",
          err
        );
      }
    };

    fetchWeather();
    fetchTiming();

    const weatherInterval =
      setInterval(
        fetchWeather,
        60000
      );

    const timingInterval =
      setInterval(
        fetchTiming,
        15000
      );

    return () => {
      clearInterval(
        weatherInterval
      );
      clearInterval(
        timingInterval
      );
    };
  }, []);

  return (
    <main className="min-h-screen bg-[#050505] text-white p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mt-4 rounded-2xl border border-white/10 bg-[#0b0b0b] px-5 py-4">

  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        Session
      </p>

      <h3 className="mt-1 text-lg font-bold text-green-400">
        Race
      </h3>
    </div>

    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        Time Remaining
      </p>

      <h3 className="mt-1 text-lg font-bold">
        24:00:00
      </h3>
    </div>

    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        Track State
      </p>

      <h3 className="mt-1 text-lg font-bold text-green-400">
        GREEN
      </h3>
    </div>

    <div>
      <p className="text-xs uppercase tracking-[0.2em] text-white/40">
        Circuit
      </p>

      <h3 className="mt-1 text-lg font-bold">
        Nürburgring 24H
      </h3>
    </div>

  </div>
</div>
        <div className="mb-5 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

          <div className="flex items-center justify-between">

            <div>
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500 animate-pulse" />

                <span className="text-green-400 text-sm uppercase tracking-[0.25em]">
                  Live Race
                </span>
              </div>

              <h1 className="mt-3 text-4xl font-bold">
                Nürburgring 24H
              </h1>

              <p className="text-white/50">
                Live Command Center
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm text-white/40">
                Live Weather
              </p>

              <h2 className="text-2xl font-bold text-green-400">
                {weather.condition}
              </h2>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">

          {/* Leaderboard */}
          <div className="lg:col-span-2 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

            <div className="flex justify-between mb-5">
              <h2 className="text-xl font-semibold">
                Leaderboard
              </h2>

              <span className="text-green-400">
                LIVE
              </span>
            </div>

            <div className="space-y-3">

              {leaderboard.map(
                (car) => (
                  <div
                    key={car.car}
                    className="grid grid-cols-7 rounded-2xl border border-white/10 bg-[#101010] p-4"
                  >
                    <span className="font-bold">
                      P
                      {
                        car.position
                      }
                    </span>

                    <span>
                      {car.car}
                    </span>

                    <span className="text-white/70">
                      {
                        car.manufacturer
                      }
                    </span>

                    <span>
                      {car.driver}
                    </span>

                    <span className="text-right">
                      {car.gap}
                    </span>

                    <span className="text-center text-white/60">
                      {car.lastLap}
                    </span>

                    <span
                      className={`text-right ${
                        car.status ===
                        "PIT"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {
                        car.status
                      }
                    </span>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Weather */}
          <div className="rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

            <h2 className="mb-5 text-xl font-semibold">
              Nürburgring Weather
            </h2>

            <div className="space-y-4">

              <div className="flex justify-between">
                <span className="text-white/50">
                  Air Temp
                </span>

                <span>
                  {weather.airTemp}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Condition
                </span>

                <span>
                  {weather.condition}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Wind
                </span>

                <span>
                  {weather.wind}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/50">
                  Humidity
                </span>

                <span>
                  {weather.humidity}
                </span>
              </div>

            </div>
          </div>
          {/* Live Feed */}
          <div className="mt-5 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Live Race Feed
              </h2>

              <span className="text-green-400 text-sm">
                LIVE
              </span>
            </div>

            <div className="space-y-3">
              {events.map(
                (
                  event,
                  index
                ) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-[#101010] p-3"
                  >
                    <p className="text-sm text-green-400">
                      {event.time}
                    </p>

                    <p className="text-white/80">
                      {event.message}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>  
          {/* Track Conditions */}
            <div className="mt-5 rounded-3xl border border-white/10 bg-[#0b0b0b] p-5">

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">
                  Track Conditions
                </h2>

                <span className="text-blue-400 text-sm">
                  LIVE
                </span>
              </div>

              <div className="space-y-3">

                {trackConditions.map(
                  (
                    sector,
                    index
                  ) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-2xl border border-white/10 bg-[#101010] p-3"
                    >
                      <span className="text-white/80">
                        {sector.sector}
                      </span>

                      <span className="text-white/60">
                        {sector.condition}
                      </span>
                    </div>
                  )
                )}

              </div>
            </div>      
        </div>
      </div>
      <div className="mt-5">
       <div><TrackMap
  selectedSector={
    selectedSector
  }
  setSelectedSector={
    setSelectedSector
  }
  raceControl={
    raceControl
  }
  trackZones={
    trackZones
  }
/>
</div>
      </div>
      <footer className="mt-10 border-t border-white/10 py-6 text-center text-sm text-white/40">

  Built by SHAN7

</footer>
    </main>
  );
}