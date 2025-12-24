import React from 'react';

// Types (same as web)
interface IStatisticsItem {
  number: string;
  label: string;
}
type IStatisticsItems = Array<IStatisticsItem>;

interface IStatisticsProps {
  items: IStatisticsItem[];
  isLoading: boolean;
}

// Loading component
function LoadingTableCustom() {
  return (
    <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
    </div>
  );
}

// Statistics component (same structure as web)
const Statistics = ({ items, isLoading }: IStatisticsProps) => {
  const renderItems = (item: IStatisticsItem, index: number) => {
    return (
      <React.Fragment key={index}>
        <div className="grid grid-cols-1 place-content-center flex-1 gap-1 text-center">
          <span className="text-foreground text-2xl lg:text-2xl leading-none font-semibold">
            {item.number}
          </span>
          <span className="text-muted-foreground text-sm">
            {item.label}
          </span>
        </div>
        {index < items.length - 1 && (
          <span className="border-e border-e-border my-1"></span>
        )}
      </React.Fragment>
    );
  };

  return (
    <div className="bg-card rounded-xl border border-border">
      <div className="p-4">
        {isLoading ? (
          <LoadingTableCustom />
        ) : (
          <div className="flex lg:px-10 py-1.5 gap-2">
            {items.map((item, index) => {
              return renderItems(item, index);
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export {
  Statistics,
  type IStatisticsItem,
  type IStatisticsItems,
  type IStatisticsProps,
};
