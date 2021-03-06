import * as React from 'react';
import { List } from 'immutable';
import { EditorProps as SlateEditorProps } from 'slate-react';
import { Block, Text, Value, Change, Node } from 'slate';

interface PluginEdiorProps {
  titlePlaceholder?: string | React.ReactNode;
  contentPlaceholder?: string | React.ReactNode;
}

interface Editor {
  props: EditorProps;
}

interface renderPlaceholderProps {
  editor: Editor;
  node: Node;
  parent: Node;
}

// Custom "Merging"
type EditorProps = SlateEditorProps & PluginEdiorProps;

const LAST_CHILD_IS_VOID_INVALID: string = 'last_child_is_void_invalid';
const CHILD_TYPE_INVALID: string = 'child_type_invalid';
const CHILD_UNKNOWN: string = 'child_unknown';
const CHILD_REQUIRED: string = 'child_required';
const CHILD_OBJECT_INVALID: string = 'child_object_invalid';

const placeholderStyle: React.CSSProperties = {
  pointerEvents: 'none',
  display: 'inline-block',
  width: '0',
  maxWidth: '100%',
  whiteSpace: 'nowrap',
  opacity: 0.33
};

export default () => ({
  schema: {
    document: {
      nodes: [
        { match: { type: 'title' }, min: 1, max: 1 },
        { match: { type: 'body' }, min: 1, max: 1 }
      ],
      normalize: (
        change: Change,
        {
          code,
          node,
          child,
          index
        }: { code: string; node: Node; child: Node; index: number }
      ) => {
        switch (code) {
          case CHILD_TYPE_INVALID: {
            if (node.object !== 'text' && node.nodes.size < 3) {
              const type = index === 0 ? 'title' : 'body';
              return change.setNodeByKey(child.key, type);
            }
          }
          case CHILD_UNKNOWN: {
            return change.removeNodeByKey(child.key);
          }
          case CHILD_REQUIRED: {
            const type = index === 0 ? 'title' : 'body';
            const block = Block.create(type);

            return change.insertNodeByKey(node.key, index, block);
          }
        }
      }
    },
    blocks: {
      title: {
        nodes: [{ match: { object: 'text', min: 1 } }],
        normalize: (
          change: Change,
          {
            code,
            node,
            child,
            index
          }: { code: string; node: Node; child: Node; index: number }
        ) => {
          console.log(code);
          if (code === CHILD_OBJECT_INVALID) {
            return change.undo();
          }
        }
      },
      body: {
        nodes: [{ match: { object: 'block', min: 1 } }],
        last: {
          isVoid: false
        },
        normalize: (
          change: Change,
          {
            code,
            node,
            child,
            index
          }: { code: string; node: Node; child: Node; index: number }
        ) => {
          switch (code) {
            case LAST_CHILD_IS_VOID_INVALID: {
              const block = Block.create('paragraph');
              if (
                node.object !== 'text' &&
                node.nodes.size === 1 &&
                child.object === 'text'
              ) {
                return change.replaceNodeByKey(child.key, block);
              }
              return (
                node.object !== 'text' &&
                change.insertNodeByKey(node.key, node.nodes.size, block)
              );
            }
            case CHILD_OBJECT_INVALID:
            case CHILD_REQUIRED: {
              const block = Block.create('paragraph');
              return change.insertNodeByKey(node.key, index, block);
            }
          }
        }
      }
    }
  },
  renderPlaceholder(props: renderPlaceholderProps) {
    const {
      editor: {
        props: { placeholder, titlePlaceholder, contentPlaceholder }
      },
      node,
      parent
    }: { editor: Editor; node: Node; parent: Node } = props;
    if (
      parent.object !== 'document' &&
      (parent.object === 'block' && parent.type !== 'body')
    )
      return;
    if (node.object != 'block') return;
    if (!List.isList(node.nodes) && node.nodes.every(item => Text.isText(item)))
      return;
    if (node.text != '') return;

    if (node.type === 'title' && node.getBlocks().size === 0) {
      return (
        <span contentEditable={false} style={placeholderStyle}>
          {placeholder || titlePlaceholder}
        </span>
      );
    }

    if (
      node.type === 'paragraph' &&
      parent.object !== 'text' &&
      parent.getBlocks().size === 1
    ) {
      return (
        <span contentEditable={false} style={placeholderStyle}>
          {contentPlaceholder}
        </span>
      );
    }
  }
});
