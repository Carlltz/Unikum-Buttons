//import moment from "../skola24/moment.js";
class api24 {
  /* static {
    if ("function" === typeof importScripts) {
      importScripts("moment.js");
    }
  } */
  static #Xscope;
  static async #fetchInclude(...args) {
    return await fetch(args[0], {
      ...args[1],
      credentials: "include",
      headers: {
        ...args[1]?.headers,
        "Content-Type": "application/json",
        ...(this.#Xscope ? { "X-Scope": this.#Xscope } : undefined),
      },
    });
  }
  static async #getUnitGuid(unitId) {
    const unitsResponse = await (
      await this.#fetchInclude("https://web.skola24.se/api/services/skola24/get/timetable/viewer/units", {
        method: "POST",
        body: JSON.stringify({
          getTimetableViewerUnitsRequest: {
            hostName: "katrineholm.skola24.se",
          },
        }),
      })
    ).json();
    const units = unitsResponse?.data?.getTimetableViewerUnitsResponse?.units;
    if (Array.isArray(units)) {
      for (const unit of units) {
        if (unit.unitId === unitId) return unit.unitGuid;
      }
    }
  }
  static async #getRenderKey() {
    const keyResponse = await (
      await this.#fetchInclude("https://web.skola24.se/api/get/timetable/render/key", {
        method: "POST",
        body: "null",
      })
    ).json();
    return keyResponse.data.key;
  }
  static async #getSelection24(signature) {
    const selectionResponse = await (
      await this.#fetchInclude("https://web.skola24.se/api/encrypt/signature", {
        method: "POST",
        body: JSON.stringify({ signature }),
      })
    ).json();
    return selectionResponse.data.signature;
  }
  static #getWeakYear() {
    // return [year,weakNumber]
    const day = moment();
    return [
      parseInt(day.isoWeekYear().toString()),
      parseInt(day.isoWeek() < 10 ? "0" + day.isoWeek() : day.isoWeek().toString()),
    ];
  }
  static async getCurrentLessons24({ skola = "DU/KTC", id = "na19", current = true } = {}) {
    const skola24 = await this.#fetchInclude(
      "https://web.skola24.se/timetable/timetable-viewer/katrineholm.skola24.se/DU/KTC/"
    );
    this.#Xscope = (await skola24.text()).match(/(?<=scope=").*(?=")/)[0];
    const [year, week] = this.#getWeakYear();
    const lessons = await (
      await this.#fetchInclude("https://web.skola24.se/api/render/timetable", {
        body: JSON.stringify({
          renderKey: await this.#getRenderKey(),
          host: "katrineholm.skola24.se",
          unitGuid: await this.#getUnitGuid(skola),
          startDate: null,
          endDate: null,
          scheduleDay: 0,
          blackAndWhite: false,
          width: 1223,
          height: 550,
          selectionType: 4,
          selection: await this.#getSelection24(id),
          showHeader: false,
          periodText: "",
          week,
          year,
          privateFreeTextMode: false,
          privateSelectionMode: null,
          customerKey: "",
        }),
        method: "POST",
      })
    ).json();
    let currentLessons = [];
    if (current) {
      for (const lesson of lessons.data.lessonInfo) {
        if (
          lesson.dayOfWeekNumber == moment().isoWeekday() &&
          moment().isBetween(moment(lesson.timeStart, "hh:mm:ss"), moment(lesson.timeEnd, "hh:mm:ss"))
        ) {
          currentLessons.push(lesson.texts);
        }
      }
      return currentLessons;
    }
    return lessons.data.lessonInfo;
  }
}
//api24.getCurrentLessons24().then(console.log);
export default api24;
