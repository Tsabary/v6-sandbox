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

      // Automatically run npm install and npm run dev
      const installProcess = await webContainerInstance.spawn('npm', [
        'install',
      ]);
      await installProcess.exit;

      await webContainerInstance.spawn('npm', ['run', 'dev']);
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
    <div className="h-dvh">
      <PanelGroup direction="horizontal">
        <Panel defaultSize={40} minSize={20}>
          <PanelGroup direction="vertical">
            <Panel defaultSize={75} minSize={30}>
              <CodeEditor webContainer={webContainer} />
            </Panel>
            <PanelResizeHandle className="resize-handle" />
            <Panel defaultSize={25} minSize={15}>
              <Terminal webContainer={webContainer} />
            </Panel>
          </PanelGroup>
        </Panel>
        <PanelResizeHandle className="resize-handle" />
        <Panel defaultSize={60} minSize={30}>
          <Preview webContainer={webContainer} />
        </Panel>
      </PanelGroup>
    </div>
  );
}
