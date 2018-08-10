import * as React from 'react';
import { EditorProps as SlateEditorProps } from 'slate-react';
import { Change, Node } from 'slate';
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
declare type EditorProps = SlateEditorProps & PluginEdiorProps;
declare const _default: () => {
    schema: {
        document: {
            nodes: {
                match: {
                    type: string;
                };
                min: number;
                max: number;
            }[];
            normalize: (change: Change, { code, node, child, index }: {
                code: string;
                node: Node;
                child: Node;
                index: number;
            }) => Change;
        };
        blocks: {
            title: {
                nodes: {
                    match: {
                        object: string;
                        min: number;
                    };
                }[];
                normalize: (change: Change, { code, node, child, index }: {
                    code: string;
                    node: Node;
                    child: Node;
                    index: number;
                }) => Change;
            };
            body: {
                nodes: {
                    match: {
                        object: string;
                        min: number;
                    };
                }[];
                last: {
                    isVoid: boolean;
                };
                normalize: (change: Change, { code, node, child, index }: {
                    code: string;
                    node: Node;
                    child: Node;
                    index: number;
                }) => Change;
            };
        };
    };
    renderPlaceholder(props: renderPlaceholderProps): JSX.Element;
};
export default _default;
