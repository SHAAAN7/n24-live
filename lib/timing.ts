import axios from "axios";
import * as cheerio from "cheerio";

export async function getTimingData() {
  try {

    const response =
      await axios.get(
        "https://livetiming.getraceresults.com/nurburgring"
      );

    const $ = cheerio.load(
      response.data
    );

    const leaderboard = [];

    $("table tbody tr").each(
      (
        index,
        element
      ) => {

        const cols =
          $(element)
            .find("td");

        if (
          cols.length > 5
        ) {

          leaderboard.push({
            position:
              $(cols[0])
                .text()
                .trim(),

            car:
              $(cols[1])
                .text()
                .trim(),

            driver:
              $(cols[2])
                .text()
                .trim(),

            gap:
              $(cols[4])
                .text()
                .trim(),

            status:
              "TRACK",

            lastLap:
              $(cols[5])
                .text()
                .trim(),
          });
        }
      }
    );

    return {
      updated:
        new Date()
          .toISOString(),

      leaderboard:
        leaderboard.slice(
          0,
          20
        ),

      events: [],

      trackConditions: [],
    };

  } catch (err) {

    console.error(
      "Timing scrape failed",
      err
    );

    return {
      updated:
        new Date()
          .toISOString(),

      leaderboard: [],

      events: [],

      trackConditions: [],
    };
  }
}