let previousDrivers:
  Record<string, string> = {};

export async function getTimingData() {

  const leaderboard = [
    {
      position: 1,
      car: "#911",
      manufacturer: "Porsche",
      driver: "Preining",
      gap: "Leader",
      status: "PIT",
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

  const events: {
    time: string;
    message: string;
  }[] = [];

  leaderboard.forEach((car) => {
    const previousDriver =
      previousDrivers[car.car];

    if (
      previousDriver &&
      previousDriver !== car.driver
    ) {
      events.unshift({
        time: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        message:
          `Driver swap ${car.car}: ${previousDriver} → ${car.driver}`,
      });
    }

    previousDrivers[car.car] =
      car.driver;

    if (car.status === "PIT") {
      events.unshift({
        time: new Date()
          .toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        message:
          `${car.car} pit stop`,
      });
    }
  });

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

  return {
    updated:
      new Date().toISOString(),
    leaderboard,
    events,
    trackConditions,
  };
}