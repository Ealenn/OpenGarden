export class Calendar {
  items: CalendarItem[];
}

export class CalendarItem {
  plant: string;
  variety: string;
  sowingPeriod: number[];
  growingOnPeriod: number[];
  harvestPeriod: number[];
}
