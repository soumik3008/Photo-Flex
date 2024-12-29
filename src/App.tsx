import React from 'react';
import TopBar from './components/Navigation/TopBar';
import { ToolsSidebar } from './components/Sidebar/ToolsSidebar';
import { ImageCanvas } from './components/Canvas/ImageCanvas';
import { ChatInterface } from './components/Chat/ChatInterface';
import { useImageEditor } from './hooks/useImageEditor';
import { useAIInstructions } from './hooks/useAIInstructions';

function App() {
  const {
    image,
    handleFileUpload,
    removeImage,
    updateAdjustment,
    setCrop,
    cancelCrop,
    setScale,
    setRotation,
    addText,
    updateText,
    deleteText,
    handleTextDrop,
    exportImage,
    updateFrame,
    updateFrameSettings
  } = useImageEditor();

  const { processInstruction } = useAIInstructions(
    image,
    updateAdjustment,
    addText,
    updateText
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      <TopBar 
        onFileUpload={handleFileUpload}
        onExport={exportImage}
        onRemoveImage={removeImage}
        hasImage={!!image.url}
      />
      <div className="flex-1 flex overflow-hidden">
        <ToolsSidebar 
          image={image}
          onAdjustmentChange={updateAdjustment}
          onScaleChange={setScale}
          onRotationChange={setRotation}
          onCancelCrop={cancelCrop}
          onAddText={addText}
          onUpdateFrame={updateFrame}
          onUpdateFrameSettings={updateFrameSettings}
        />
        <main className="flex-1 p-6 overflow-auto">
          <ImageCanvas 
            image={image}
            onCrop={setCrop}
            onUpdateText={updateText}
            onDeleteText={deleteText}
            onTextDrop={handleTextDrop}
          />
        </main>
      </div>
      <ChatInterface onInstruction={processInstruction} />
    </div>
  );
}

export default App;