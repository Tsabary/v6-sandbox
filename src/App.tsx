import { WebContainer } from '@webcontainer/api';
import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './components/code-editor';

export default function App() {
  const [webContainer, setWebContainer] = React.useState<WebContainer | null>(
    null,
  );

  React.useEffect(() => {
    const createWebContainer = async () => {
      const webContainer = await WebContainer.boot();
      setWebContainer(webContainer);
    };

    createWebContainer();

    // Ideally, we should clean up the WebContainer instance when the component is unmounted.
    // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
    // https://github.com/stackblitz/webcontainer-core/issues/1125
    // return () => {
    //   instance?.teardown();
    //   setWebContainer(null);
    // };
  }, []);

  return (
    <div className="h-dvh p-2">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              <CodeEditor />
            </Panel>
            <PanelResizeHandle className="h-2 bg-blue-300" />
            <Panel>
              <div className="h-full border bg-red-100">Terminal</div>
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 bg-blue-300" />
        <Panel>
          <div className="h-full border bg-red-100">Preview</div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
