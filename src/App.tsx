import { WebContainer } from '@webcontainer/api';
import React from 'react';
import { Panel, PanelGroup, PanelResizeHandle } from 'react-resizable-panels';
import CodeEditor from './components/code-editor';
import Preview from './components/preview';
import Terminal from './components/terminal';
import { VITE_REACT_TEMPLATE } from './templates/react-vite';

export default function App() {
  const [webContainer, setWebContainer] = React.useState<WebContainer | null>(
    null,
  );

  React.useEffect(() => {
    const createWebContainer = async () => {
      const webContainerInstance = await WebContainer.boot();
      await webContainerInstance.mount(VITE_REACT_TEMPLATE.files);
      setWebContainer(webContainerInstance);

      // // Automatically run npm install and npm run dev
      // const installProcess = await webContainerInstance.spawn('npm', [
      //   'install',
      // ]);
      // await installProcess.exit;

      // await webContainerInstance.spawn('npm', ['run', 'dev']);
    };

    createWebContainer();

    // Ideally, we should clean up the WebContainer instance when the component is unmounted.
    // But there is an issue with the current implementation of WebContainer that prevents it from being torn down.
    // https://github.com/stackblitz/webcontainer-core/issues/1125
    // return () => {
    //   webContainer?.teardown();
    //   setWebContainer(null);
    // };
  }, []);

  return (
    <div className="h-dvh p-2">
      <PanelGroup direction="horizontal">
        <Panel>
          <PanelGroup direction="vertical">
            <Panel>
              <CodeEditor webContainer={webContainer} />
            </Panel>
            <PanelResizeHandle className="h-2 bg-blue-300" />
            <Panel>
              <Terminal webContainer={webContainer} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="w-2 bg-blue-300" />
        <Panel>
          <Preview webContainer={webContainer} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
