import { describe, expect, test } from "bun:test";
import { formatPrice, menuCategories } from "./menu-data";
import { HOURS, vacancies } from "./business-data";

const expectedPrices: Record<string, number[]> = {
  desayuno: [9.50, 11.50, 5, 4],
  tostadas: [9.50, 11.50, 10, 9.50, 10.50, 11.50],
  comida: [10.50, 14.50, 14.50, 9],
  dulce: [5.50, 5.50, 5, 5, 3, 4.50, 3.30, 3],
  caliente: [3, 3.60, 3.40, 3.40, 3.50, 3.80, 4.20, 4.40, 4.90, 4.80, 4, 1, 4.20, 4.20, 3.50],
  frio: [4.80, 5.50, 5, 6, 3.50, 7, 3.80, 7, 3.80, 3.80, 3.80, 3.80],
};

describe("Supplied menu prices", () => {
  for (const category of menuCategories) {
    category.items.filter((item) => item.price !== null).forEach((item, index) => {
      test(`${category.id}: ${item.name} costs ${expectedPrices[category.id][index]}`, () => {
        expect(item.price).toBe(expectedPrices[category.id][index]);
      });
    });
  }
  test("all 50 supplied food and drink items are present", () => {
    expect(menuCategories.map((category) => category.items.length)).toEqual([4, 6, 5, 8, 15, 12]);
  });
  test("coconut yoghurt granola total is 10 euros", () => {
    expect(menuCategories[0].items[0].variants).toEqual([{ name: "Met kokosyoghurt", price: 10 }]);
  });
  test("jamón tostada with manchego total is 12 euros", () => {
    expect(menuCategories[1].items[1].variants).toEqual([{ name: "Met manchego", price: 12 }]);
  });
  test("weekly dish has no invented numeric price", () => {
    const weekly = menuCategories[2].items[4];
    expect(weekly.price).toBeNull();
    expect(weekly.priceLabel).toBe("Vraag aan ons!");
  });
  test("prices use Dutch euro notation", () => {
    expect(formatPrice(9.5)).toBe("€ 9,50");
    expect(formatPrice(3)).toBe("€ 3,00");
  });
  for (const [id, from, until] of [["desayuno", "09:00", "11:30"], ["tostadas", "09:00", "15:00"], ["comida", "12:00", "15:00"]]) {
    test(`${id} serving window ${from} to ${until}`, () => {
      expect(menuCategories.find((category) => category.id === id)?.service).toEqual({ from, until });
    });
  }
  test("water sizes retain their distinct prices", () => {
    expect(menuCategories[5].items.slice(4, 8).map(({ name, price }) => [name, price])).toEqual([
      ["Bruiswater 0,25 L", 3.50], ["Bruiswater 0,75 L", 7], ["Platwater 0,25 L", 3.80], ["Platwater 0,75 L", 7],
    ]);
  });
});

describe("Opening hours and vacancies", () => {
  test("Tuesday opens 08:00 to 16:00", () => expect(HOURS.find(([day]) => day === "Tuesday")?.[1]).toBe("08:00 – 16:00"));
  for (const [day, from] of [["Friday", "08:00"], ["Saturday", "09:00"], ["Sunday", "09:00"]]) {
    test(`${day} retains ${from} opening and closes at 19:00`, () => expect(HOURS.find(([name]) => name === day)?.[1]).toBe(`${from} – 19:00`));
  }
  for (const [day, hours] of [["Monday", "Closed"], ["Wednesday", "08:00 – 16:00"], ["Thursday", "08:00 – 16:00"]]) {
    test(`${day} hours remain unchanged`, () => expect(HOURS.find(([name]) => name === day)?.[1]).toBe(hours));
  }
  test("Head Barista vacancy is removed", () => expect(vacancies.some(({ role }) => role === "HEAD BARISTA")).toBe(false));
  test("Barista vacancy is removed", () => expect(vacancies.some(({ role }) => role === "BARISTA")).toBe(false));
  test("Pastry & Kitchen vacancy is preserved", () => expect(vacancies.map(({ role }) => role)).toEqual(["PASTRY & KITCHEN"]));
});