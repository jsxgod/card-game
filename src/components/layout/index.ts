import { BoxProps, FlexBoxProps, GridBoxProps } from "./types";
import styled from "styled-components";
import { flexbox, grid, layout, space } from "styled-system";

export const Box = styled.div<BoxProps>`
  ${space};
  ${layout};
`;

export const FlexBox = styled.div<FlexBoxProps>`
  display: flex;
  ${flexbox};
  ${space};
  ${layout};
`;

export const GridBox = styled.div<GridBoxProps>`
  display: grid;
  ${grid};
  ${space};
  ${layout};
`;

export const GridContentWrapper = styled.div<FlexBoxProps>`
  display: flex;
  width: 100%;
  height: 100%;
  ${space};
  ${layout};
  ${flexbox};
`;

export const MainWrapper = styled(Box)`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  padding: 0 ${({ theme }) => theme.sizes.pagePadding};
  ${space};
  ${layout};
`;

export const Wrapper = styled.div<BoxProps>`
  width: 100%;
  height: 100%;
  ${space};
  ${layout};
`;
