export type MenuItem = {
  name: string;
  description?: string;
  price: number | null;
  priceLabel?: string;
  variants?: { name: string; price: number }[];
};

export type MenuCategory = {
  id: string;
  name: string;
  subtitle: string;
  service?: { from: string; until: string };
  items: MenuItem[];
};

export const menuCategories: MenuCategory[] = [
  { id: "desayuno", name: "Desayuno", subtitle: "Ontbijt", service: { from: "09:00", until: "11:30" }, items: [
    { name: "Granola casera", description: "Yoghurt, compote van het seizoen en vers fruit.", price: 9.50, variants: [{ name: "Met kokosyoghurt", price: 10 }] },
    { name: "Torrijas de brioche", description: "Wentelteefjes van brioche met kaneelsuiker, opgeklopte citroenboter en seizoensfruit.", price: 11.50 },
    { name: "Croissant jamón y queso", description: "Croissant met ham en kaas.", price: 5 },
    { name: "Croissant mermelada y mantequilla", description: "Croissant met jam en boter.", price: 4 },
  ] },
  { id: "tostadas", name: "Tostadas", subtitle: "Pan & compañía", service: { from: "09:00", until: "15:00" }, items: [
    { name: "Tostada manchego & pimientos de padrón", description: "Tomaat, olijfolie, manchego en pimientos de padrón.", price: 9.50 },
    { name: "Tostada jamón", description: "Tomaat, olijfolie en jamón.", price: 11.50, variants: [{ name: "Met manchego", price: 12 }] },
    { name: "Tostada smashed avocado", description: "Tomaat, olijfolie en smashed avocado.", price: 10 },
    { name: "Tostada tortilla francesa", description: "Tomaat, olijfolie en tortilla francesa.", price: 9.50 },
    { name: "Tostada ansjovis", description: "Tomaat, olijfolie en ansjovis.", price: 10.50 },
    { name: "Bocadillo de sobrasada", description: "Sobrasada, gekarameliseerde ui en warme manchego.", price: 11.50 },
  ] },
  { id: "comida", name: "Comida", subtitle: "Lunch", service: { from: "12:00", until: "15:00" }, items: [
    { name: "Tortilla española", description: "Geserveerd met aioli en een kleine groene salade.", price: 10.50 },
    { name: "Albóndigas", description: "Gehaktballetjes in tomatensaus, geserveerd met pan de cristal.", price: 14.50 },
    { name: "Ensalada de temporada", description: "Salade van het seizoen.", price: 14.50 },
    { name: "Sopa de temporada", description: "Soep van het seizoen, geserveerd met pan de cristal.", price: 9 },
    { name: "Plato de la semana", description: "Wisselend gerecht van de week.", price: null, priceLabel: "Vraag aan ons!" },
  ] },
  { id: "dulce", name: "Dulce", subtitle: "Zoetigheden & gebak", items: [
    { name: "Tarta de Santiago", description: "Amandeltaart.", price: 5.50 },
    { name: "Tarta de queso", description: "Basque cheesecake.", price: 5.50 },
    { name: "Pan de plátano", description: "Bananenbrood.", price: 5 },
    { name: "Tarta de temporada", description: "Wisselende taart van het seizoen.", price: 5 },
    { name: "Croissant", price: 3 },
    { name: "Amandelcroissant", price: 4.50 },
    { name: "Pain au chocolat", price: 3.30 },
    { name: "Bolita", description: "Braziliaans kaasballetje.", price: 3 },
  ] },
  { id: "caliente", name: "Caliente", subtitle: "Warme dranken", items: [
    { name: "Espresso", price: 3 },
    { name: "Dubbele espresso", price: 3.60 },
    { name: "Espresso macchiato", price: 3.40 },
    { name: "Americano", price: 3.40 },
    { name: "Cortado", price: 3.50 },
    { name: "Cappuccino", price: 3.80 },
    { name: "Latte macchiato", price: 4.20 },
    { name: "Flat white", price: 4.40 },
    { name: "Matcha latte", price: 4.90 },
    { name: "Chai latte", price: 4.80 },
    { name: "Hot chocolate", price: 4 },
    { name: "Babyccino", price: 1 },
    { name: "Muntthee", price: 4.20 },
    { name: "Gemberthee", price: 4.20 },
    { name: "Thee infusie", price: 3.50 },
  ] },
  { id: "frio", name: "Frío", subtitle: "Koude dranken", items: [
    { name: "Iced latte", price: 4.80 },
    { name: "Iced matcha", price: 5.50 },
    { name: "Verse jus d'orange", price: 5 },
    { name: "Zumo fresco", price: 6 },
    { name: "Bruiswater 0,25 L", price: 3.50 },
    { name: "Bruiswater 0,75 L", price: 7 },
    { name: "Platwater 0,25 L", price: 3.80 },
    { name: "Platwater 0,75 L", price: 7 },
    { name: "Cola", price: 3.80 },
    { name: "Cola Zero", price: 3.80 },
    { name: "Appelsap", price: 3.80 },
    { name: "Chocomel", price: 3.80 },
  ] },
];

export const formatPrice = (price: number) => `€ ${price.toFixed(2).replace(".", ",")}`;