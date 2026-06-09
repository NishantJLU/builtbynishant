/* eslint-disable react/display-name */
import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Projects from "../Projects";

// Mock framer-motion with standard hooks and elements, filtering out motion props to prevent console warnings
vi.mock("framer-motion", () => {
  const React = require("react");
  const motionValue = (val: any) => ({
    get: () => val,
    set: () => {},
    onChange: () => () => {},
  });

  const filterMotionProps = (props: any) => {
    const {
      layout,
      layoutId,
      initial,
      animate,
      exit,
      transition,
      variants,
      whileHover,
      whileTap,
      whileDrag,
      whileFocus,
      whileInView,
      viewport,
      onViewportEnter,
      onViewportLeave,
      ...cleanProps
    } = props;
    return cleanProps;
  };

  return {
    motion: {
      div: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <div ref={ref} {...filterMotionProps(props)}>{children}</div>
      )),
      button: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <button ref={ref} {...filterMotionProps(props)}>{children}</button>
      )),
      span: React.forwardRef(({ children, ...props }: any, ref: any) => (
        <span ref={ref} {...filterMotionProps(props)}>{children}</span>
      )),
      path: ({ children, ...props }: any) => <path {...filterMotionProps(props)}>{children}</path>,
    },
    AnimatePresence: ({ children }: any) => <>{children}</>,
    useMotionValue: motionValue,
    useSpring: (val: any) => val,
    useTransform: (val: any, transformer: any) => {
      if (Array.isArray(val)) {
        return motionValue(transformer(val.map(v => v.get())));
      }
      return motionValue(typeof transformer === 'function' ? transformer(val.get()) : transformer);
    },
    useScroll: () => ({
      scrollYProgress: motionValue(0),
    }),
  };
});

describe("Projects Component", () => {
  it("renders projects section header", () => {
    render(<Projects />);
    expect(screen.getByText(/Featured Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/\/\/ SELECTED_ENGINES/i)).toBeInTheDocument();
  });

  it("lists all projects defined in the config", () => {
    render(<Projects />);
    expect(screen.getByText("AI-LMS")).toBeInTheDocument();
    expect(screen.getByText("Unity-MCP")).toBeInTheDocument();
    expect(screen.getByText("ai-memory-layer")).toBeInTheDocument();
    expect(screen.getByText("Basic-game")).toBeInTheDocument();
  });
});
