import type { WebContainer } from '@webcontainer/api';
import { FitAddon } from '@xterm/addon-fit';
import { Terminal as XTerminal } from '@xterm/xterm';
import '@xterm/xterm/css/xterm.css';
import React from 'react';
import useResizeObserver from 'use-resize-observer';

export default function Terminal({
  webContainer,
}: {
  webContainer: WebContainer | null;
}) {
  const [terminal, setTerminal] = React.useState<XTerminal | null>(null);
  const terminalRef = React.useRef<HTMLDivElement>(null);
  const fitAddonRef = React.useRef<FitAddon | null>(null);

  const { ref } = useResizeObserver<HTMLDivElement>({
    onResize: () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    },
  });

  // theme detection
  const isLight = React.useMemo(() => {
    if (typeof window === 'undefined') return false;
    return new URLSearchParams(window.location.search).get('light') === 'true';
  }, []);

  React.useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new XTerminal({
      convertEol: true,
      scrollback: 1000,
      theme: {
        background: isLight ? '#ffffff' : '#111827',
        foreground: isLight ? '#374151' : '#f9fafb',
      },
    });
    const fitAddon = new FitAddon();
    fitAddonRef.current = fitAddon;

    terminal.loadAddon(fitAddon);
    terminal.open(terminalRef.current);
    setTerminal(terminal);

    fitAddon.fit();

    return () => {
      terminal.dispose();
      setTerminal(null);
    };
  }, [terminalRef, isLight]);

  React.useEffect(() => {
    if (!webContainer || !terminal) return;

    const startShell = async () => {
      const shellProcess = await webContainer.spawn('jsh', {
        terminal: {
          cols: terminal.cols,
          rows: terminal.rows,
        },
      });
      shellProcess.output.pipeTo(
        new WritableStream({
          write(data) {
            terminal.write(data);
          },
        }),
      );

      const input = shellProcess.input.getWriter();
      terminal.onData((data) => {
        input.write(data);
      });

      return shellProcess;
    };

    startShell();
  }, [webContainer, terminal]);

  return (
    <div className={`h-full ${isLight ? 'bg-white' : 'bg-gray-900'}`} ref={ref}>
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
}
