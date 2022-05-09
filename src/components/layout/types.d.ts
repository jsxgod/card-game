import {
  LayoutProps,
  SpaceProps,
  FlexboxProps,
  GridProps,
} from "styled-system";

export type BoxProps = SpaceProps & LayoutProps;

export type FlexBoxProps = FlexboxProps & BoxProps;

export type GridBoxProps = GridProps & BoxProps;
