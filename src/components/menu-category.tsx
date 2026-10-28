import { formatPrice, type MenuCategory as Category, type MenuItem } from "@/lib/menu-data";

function MenuRow({ item, compact }: { item: MenuItem; compact: boolean }) {
  return (
    <li className={compact ? "menu-row menu-row-compact" : "menu-row"}>
      <div className="menu-item-heading">
        <h3 className="menu-item-name">{item.name}</h3>
        <span className={`menu-price ${item.price === null ? "menu-price-request" : ""}`}>
          {item.price === null ? item.priceLabel : formatPrice(item.price)}
        </span>
      </div>
      {item.description && <p className="menu-description">{item.description}</p>}
      {item.variants?.map((variant) => (
        <div key={variant.name} className="menu-variant">
          <span>{variant.name}</span><span className="menu-price">{formatPrice(variant.price)}</span>
        </div>
      ))}
    </li>
  );
}

export function MenuCategory({ category, compact = false, number }: { category: Category; compact?: boolean; number: number }) {
  return (
    <section id={category.id} className="menu-category" aria-labelledby={`${category.id}-title`}>
      <div className="menu-category-title">
        <span className="menu-category-number" aria-hidden="true">{String(number).padStart(2, "0")}</span>
        <div>
          <h2 id={`${category.id}-title`}>{category.name}</h2>
          <p className="menu-category-subtitle">{category.subtitle}</p>
          {category.service && <p className="menu-service">Geserveerd van {category.service.from} tot {category.service.until}</p>}
        </div>
      </div>
      <ul className="menu-items">
        {category.items.map((item) => <MenuRow key={item.name} item={item} compact={compact} />)}
      </ul>
    </section>
  );
}