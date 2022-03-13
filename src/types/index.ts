export type ChartDataType = {
  data: ChartDataItemType[]
};

export type ChartDataTypeArray = ChartDataItemType[]

export type ChartDataItemType = {
  "1. open": string,
  "2. high": string,
  "3. low": string,
  "4. close": string,
  date: string
}

export type valuePropType = {
  value: string
}

type ChartTypePopoverProps = {
  handleChange: (param: any) => void
}
export type ChartTypePopoverType = React.PropsWithChildren<ChartTypePopoverProps>;

interface ChartTypeEventTarget extends EventTarget {
  id: number
}

export interface ChartTypeEvent extends React.MouseEvent<HTMLUListElement> {
  target: ChartTypeEventTarget
}
