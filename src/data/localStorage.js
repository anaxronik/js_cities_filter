export class LocalStorage {
  readCities() {
    return JSON.parse(localStorage.getItem("selectedCities"));
  }
  writeCities(value = []) {
    localStorage.setItem("selectedCities", JSON.stringify(value));
  }
}
