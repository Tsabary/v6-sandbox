import type { WebContainer } from '@webcontainer/api';
import React from 'react';

export default function Preview({
  webContainer,
}: {
  webContainer: WebContainer | null;
}) {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);

  React.useEffect(() => {
    if (!webContainer || !iframeRef.current) return;

    webContainer.on('server-ready', (_, url) => {
      iframeRef.current!.src = url;
    });
  }, [webContainer]);

  return (
    <iframe
      ref={iframeRef}
      className="h-full w-full border-0"
      src="loading.html"
    />
  );
}
