import { ChartDataTypeArray, ChartDataType } from '.';

type ButtonProps = {
  extraClasses: string,
  disabled?: boolean,
  onClick: () => void
}
export type ButtonType = React.PropsWithChildren<ButtonProps>;

export type DropdownProps = {
  value: string,
  onChange: (value: valuePropType) => void
}

export type valuePropType = {
  value: string
}

export type ChartType = {
  type: string,
  data: ChartDataTypeArray
}

export type chartMappingType = {
  [key: string]: React.ComponentType<ChartDataType>,
}


export type timeFrameTypes = {
  '30': string,
  '14': string,
  '7': string
};

type TimeFrameButtonProps = {
  timeframe: string,
  onClick: () => void
}
export type TimeframeButtonType = React.PropsWithChildren<TimeFrameButtonProps>;

type TimeframePopoverProps = {
  handleChange: (param: any) => void
}
export type TimeframePopoverType = React.PropsWithChildren<TimeframePopoverProps>;

type ChartTypeButtonRendererProps = {
  chartType: string,
  onClick: () => void
}

export type ChartTypeButtonType = React.PropsWithChildren<ChartTypeButtonRendererProps>;

interface TabEventTarget extends EventTarget {
  id: string
}

export interface TabTypeTypeEvent extends React.MouseEvent<HTMLButtonElement> {
  target: TabEventTarget
}
