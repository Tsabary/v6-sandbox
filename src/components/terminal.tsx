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

  React.useEffect(() => {
    if (!terminalRef.current) return;

    const terminal = new XTerminal({ convertEol: true });
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
  }, [terminalRef]);

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
    <div className="h-full border bg-red-100" ref={ref}>
      <div className="h-full w-full" ref={terminalRef} />
    </div>
  );
}
