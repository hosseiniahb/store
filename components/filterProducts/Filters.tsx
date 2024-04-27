import AvailableItemsFilter from "./AvailableItemsFilter";
import BrandFilter from "./BrandFilter";
import PriceFilter from "./PriceFilter";
import ProductTypesFilter from "./ProductTypesFilter";
import ResetFilters from "./ResetFilters";

export default function Filters() {
  return (
    <div className="w-full h-full flex flex-col p-3">
      <div className="w-full flex items-center justify-between">
        <h3 className="text-xl font-semibold">Filters</h3>
        <ResetFilters />
      </div>
      <div className="w-full flex items-center justify-start md:flex-col md:items-start gap-3 mt-6">
        <PriceFilter />
        <BrandFilter />
        <ProductTypesFilter />
        <AvailableItemsFilter />
      </div>
    </div>
  );
}
