/* eslint-disable react/display-name */
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Terminal from "../Terminal";

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

describe("Terminal Component", () => {
  it("renders terminal with initial greeting logs", () => {
    render(<Terminal />);
    expect(screen.getByText(/Nishant OS/i)).toBeInTheDocument();
    expect(screen.getByText(/Initializing quantum security handshakes/i)).toBeInTheDocument();
    expect(screen.getByText(/Type 'help' to view available system commands/i)).toBeInTheDocument();
  });

  it("submits commands and prints help catalog", () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help'/i);
    
    // Submit "help"
    fireEvent.change(input, { target: { value: "help" } });
    fireEvent.submit(input.closest("form")!);
    
    expect(screen.getByText(/Available Commands:/i)).toBeInTheDocument();
    expect(screen.getByText(/sysinfo - Show system specifications/i)).toBeInTheDocument();
  });

  it("prints system info on sysinfo command", () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help'/i);
    
    // Submit "sysinfo"
    fireEvent.change(input, { target: { value: "sysinfo" } });
    fireEvent.submit(input.closest("form")!);
    
    expect(screen.getByText(/NishantOS v2.0.26/i)).toBeInTheDocument();
    expect(screen.getByText(/SYS_HEALTH:/i)).toBeInTheDocument();
  });

  it("clears terminal console logs on clear command", () => {
    render(<Terminal />);
    const input = screen.getByPlaceholderText(/type 'help'/i);
    
    // Expect initial greeting to be present
    expect(screen.getByText(/Nishant OS/i)).toBeInTheDocument();

    // Submit "clear"
    fireEvent.change(input, { target: { value: "clear" } });
    fireEvent.submit(input.closest("form")!);

    // Greet text should be cleared
    expect(screen.queryByText(/Nishant OS/i)).not.toBeInTheDocument();
  });
});
