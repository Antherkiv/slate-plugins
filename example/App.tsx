import * as React from 'react';
import { Value } from 'slate';
import { Editor, RenderNodeProps } from 'slate-react';
import styled from 'react-emotion';
import { Card } from 'reactstrap';

import plugins from './plugins';

const Image = styled('img')`
  display: block;
  max-width: 100%;
  max-height: 20em;
`;

const renderNode = (props: RenderNodeProps) => {
  const { attributes, children, node } = props;

  switch (node.type) {
    case 'image': {
      const src = node.data.get('src');
      return <Image src={src} {...attributes} />;
    }
    case 'title':
      return <h2 {...attributes}>{children}</h2>;
    case 'body':
      return <Card>{children}</Card>;
    case 'paragraph':
      return <p {...attributes}>{children}</p>;
  }
};

export interface ContentEditorProps {
  initialValue?: object;
  readOnly?: boolean;
  onChange: ({ value }: { value: Value }) => void;
}

export interface ContentEditorState {
  value: Value;
}

export default class App extends React.PureComponent<
  ContentEditorProps,
  ContentEditorState
> {
  static defaultProps = {
    initialValue: {
      document: {
        nodes: [
          {
            object: 'block',
            type: 'paragraph'
          }
        ]
      }
    }
  };
  constructor(props: ContentEditorProps) {
    super(props);
    const { initialValue } = props;
    this.onChange = this.onChange.bind(this);
    this.state = {
      value: Value.fromJSON(initialValue)
    };
  }

  onChange({ value }: { value: Value }) {
    const {
      props: { onChange }
    } = this;
    onChange({ value });
    this.setState({ value });
  }

  render() {
    const {
      state: { value },
      props: { readOnly },
      onChange
    } = this;
    return (
      <Editor
        placeholder="Write a title..."
        contentPlaceholder="Write the content..."
        value={value}
        onChange={onChange}
        renderNode={renderNode}
        readOnly={readOnly}
        plugins={plugins}
      />
    );
  }
}
