import React from 'react';
import ReactDOMServer from 'react-dom/server';
import he from 'he';

import format from 'xml-formatter';

type Props = {
  xml: JSX.Element | null;
};

const CodeView: React.FC<Props> = ({ xml }: Props) => {
  const code = xml
    ? format(
        he.encode(ReactDOMServer.renderToStaticMarkup(xml), {
          allowUnsafeSymbols: true,
        }),
        {
          collapseContent: true,
          indentation: '  ',
          lineSeparator: '\n',
        }
      )
    : '';
  return (
    <pre>
      <code>{code}</code>
    </pre>
  );
};

export default CodeView;
