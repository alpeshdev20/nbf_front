"use client";

//* importing components
import { Viewer, Worker, DocumentLoadEvent } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

import type {
  ToolbarProps,
  ToolbarSlot,
  TransformToolbarSlot,
} from "@react-pdf-viewer/toolbar";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useEffect, useState } from "react";
import { isResourceRead } from "@/services/UsersStats";

//* interface
interface PdfReaderInterface {
  resource: string;
  resourceId: string;
  updateUserReadingStats: (pageNumber: string) => void;
  updateUserAndBookStats: (time: string) => void;
}

const PdfReader: React.FC<PdfReaderInterface> = ({ resource, updateUserReadingStats, resourceId, updateUserAndBookStats }) => {


  //* Use Effect for setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      updateUserAndBookStats("5000");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //* Gettting user Read Stats
  const { isRead, isSuccess } = isResourceRead(resourceId ?? "");

  const transform: TransformToolbarSlot = (slot: ToolbarSlot) => ({
    ...slot,
    SwitchSelectionMode: () => <></>,
    Download: () => <></>,
    DownloadMenuItem: () => <></>,
    Search: () => <></>,
    Open: () => <></>,
    Print: () => <></>,
    ShowSearchPopover: () => <></>,
  });

  const renderToolbar = (
    Toolbar: (props: ToolbarProps) => React.ReactElement
  ) => <Toolbar>{renderDefaultToolbar(transform)}</Toolbar>;

  const defaultLayoutPluginInstance = defaultLayoutPlugin({
    sidebarTabs: (defaultTabs) => [defaultTabs[0]],

    renderToolbar,
  });


  const [page, setPage] = useState<number>(0);


  const handleDocumentLoad = (e: DocumentLoadEvent) => {
    if (isSuccess) {
      setPage(parseInt(isRead.page_number));
    }
  }

  const { renderDefaultToolbar } =
    defaultLayoutPluginInstance.toolbarPluginInstance;

  return (
    <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
      <Viewer
        fileUrl={resource}
        plugins={[defaultLayoutPluginInstance]}
        defaultScale={1}
        initialPage={page}
        onDocumentLoad={handleDocumentLoad}
        onPageChange={({ currentPage }) => updateUserReadingStats(currentPage.toString())}
      />
    </Worker>
  );
};

export default PdfReader;
