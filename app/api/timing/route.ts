import { NextResponse } from "next/server";

export async function GET() {
  try {
    const leaderboard = [
      {
        position: 1,
        car: "#911",
        manufacturer: "Porsche",
        driver: "Estre",
        gap: "Leader",
        status: "TRACK",
        lastLap: "8:12.4",
      },
      {
        position: 2,
        car: "#98",
        manufacturer: "AMG",
        driver: "Engel",
        gap: "+7.2",
        status: "PIT",
        lastLap: "8:14.9",
      },
      {
        position: 3,
        car: "#1",
        manufacturer: "BMW",
        driver: "Vanthoor",
        gap: "+12.8",
        status: "TRACK",
        lastLap: "8:15.2",
      },
    ];

    const events = [
      {
        time: "18:14",
        message: "#98 pit stop",
      },
      {
        time: "18:12",
        message:
          "Yellow flag sector 4",
      },
      {
        time: "18:09",
        message:
          "Driver swap #911",
      },
      {
        time: "18:02",
        message:
          "Rain near Hohe Acht",
      },
    ];

    const trackConditions = [
  {
    sector: "GP Section",
    condition: "Dry ☀️",
  },
  {
    sector: "Hatzenbach",
    condition: "Damp 🌦",
  },
  {
    sector: "Karussell",
    condition: "Wet 🌧",
  },
  {
    sector: "Hohe Acht",
    condition: "Fog 🌫",
  },
  {
    sector: "Brünnchen",
    condition: "Cloudy ☁️",
  },
  {
    sector: "Döttinger Höhe",
    condition: "Dry ☀️",
  },
];

return NextResponse.json({
  updated:
    new Date().toISOString(),
  leaderboard,
  events,
  trackConditions,
});
  } catch (error) {
    return NextResponse.json(
      {
        error:
          "Timing fetch failed",
      },
      { status: 500 }
    );
  }
}