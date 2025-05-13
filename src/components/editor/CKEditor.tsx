
import React from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { useToast } from '@/hooks/use-toast';

interface CKEditorWrapperProps {
  initialValue?: string;
  onChange: (content: string) => void;
}

const CKEditorWrapper: React.FC<CKEditorWrapperProps> = ({ initialValue = '', onChange }) => {
  const { toast } = useToast();

  const handleReady = (editor: any) => {
    console.log('CKEditor5 is ready to use!', editor);
  };

  const editorConfiguration = {
    toolbar: [
      'heading', '|',
      'bold', 'italic', 'link', 'bulletedList', 'numberedList', '|',
      'outdent', 'indent', '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo', 'redo'
    ],
    image: {
      toolbar: [
        'imageStyle:inline',
        'imageStyle:block',
        'imageStyle:side',
        '|',
        'toggleImageCaption',
        'imageTextAlternative'
      ]
    },
  };

  return (
    <div className="ckeditor-container border rounded-md overflow-hidden bg-white">
      <CKEditor
        editor={ClassicEditor}
        config={editorConfiguration}
        data={initialValue}
        onReady={handleReady}
        onChange={(event, editor) => {
          const data = editor.getData();
          onChange(data);
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            toast({
              title: "Editor error",
              description: "The editor will be restarted",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Editor error",
              description: "There was an error initializing the editor",
              variant: "destructive",
            });
            console.error('CKEditor5 error', error);
          }
        }}
      />
    </div>
  );
};

export default CKEditorWrapper;
