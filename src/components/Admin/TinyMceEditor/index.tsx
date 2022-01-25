/* eslint-disable camelcase */
import { FormInstance } from 'antd'
import React from 'react'

import { Editor } from '@tinymce/tinymce-react'

const editorPluginsConfig = 'advlist autolink lists link media wordcount emoticons preview quickbars'
const editorToolbarConfig = 'undo redo | fontselect formatselect | bold italic underline strikethrough | link ' +
    'media quickimage emoticons | bullist numlist | alignleft aligncenter alignright alignjustify | preview'

interface TinyMceEditorProps {
    textareaName: string
    initialValue?: string
    editorRef?: React.MutableRefObject<unknown>
    form: FormInstance
}

/**
 * TinyMCE Editor with global config for multiple usage
 * @param textareaName name of textarea for form sending
 * @param initialValue default value of editor
 * @param editorRef reference of editor
 * @param form form instance for setting fields value
 * @constructor
 */
const TinyMceEditor: React.FC<TinyMceEditorProps> = ({ textareaName, initialValue, editorRef, form }) => (
    <Editor apiKey={ process.env.REACT_APP_KEY_TINYMCE } textareaName={ textareaName }
        initialValue={ initialValue } toolbar={ editorToolbarConfig } plugins={ editorPluginsConfig }
        onInit={(event, editor) => editorRef ? editorRef.current = editor : null }
        onEditorChange={(value) => form.setFields([{ name: textareaName, value: value }]) }
        init={{
            menubar            : false,
            forced_root_block  : false,
            no_newline_selector: '',
            entity_encoding    : 'raw',
            language           : 'fr_FR'
        }}
    />
)

export default TinyMceEditor