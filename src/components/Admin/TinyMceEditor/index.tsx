/* eslint-disable camelcase */
import { FormInstance } from 'antd';
import React from 'react';

import { Editor } from '@tinymce/tinymce-react';

const pluginsConfig = 'advlist autolink lists link media wordcount emoticons preview quickbars image';
const editorToolbarConfig = 'undo redo | styles | removeformat bold italic | link media image emoticons | preview';
const quickActionsConfig = 'bold italic | quicklink | alignleft aligncenter alignright alignjustify';

interface TinyMceEditorProps {
  textareaName: string;
  initialValue?: string;
  editorRef?: React.MutableRefObject<unknown>;
  form?: FormInstance;
  onChange?: (value: string) => void;
  minHeight?: number;
}

/**
 * TinyMCE Editor with global config for multiple usage
 * @param textareaName name of textarea for form sending
 * @param initialValue default value of editor
 * @param editorRef reference of editor
 * @param form form instance for setting fields value
 * @param onChange callback for value change if no form provided
 * @param minHeight minimum height of editor
 * @constructor
 */
const TinyMceEditor: React.FC<TinyMceEditorProps> = ({
  textareaName,
  initialValue,
  editorRef,
  form,
  onChange,
  minHeight = 500,
}) => (
  <Editor
    apiKey={import.meta.env.VITE_KEY_TINYMCE}
    textareaName={textareaName}
    initialValue={initialValue}
    onInit={(_, editor) => (editorRef ? (editorRef.current = editor) : null)}
    onEditorChange={(value) =>
      form ? form.setFields([{ name: textareaName, value: value }]) : onChange && onChange(value)
    }
    init={{
      menubar: 'edit insert format tools',
      plugins: pluginsConfig,
      toolbar: editorToolbarConfig,
      quickbars_selection_toolbar: quickActionsConfig,
      forced_root_block: 'div',
      no_newline_selector: '',
      entity_encoding: 'raw',
      language: 'fr_FR',
      height: minHeight,
      width: '90%',
      automatic_uploads: true,
      images_upload_url: import.meta.env.VITE_API_URL + '/text/upload-image',
    }}
  />
);

export default TinyMceEditor;
