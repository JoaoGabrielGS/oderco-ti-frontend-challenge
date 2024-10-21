import React from "react";

export interface AppPageProps extends React.PropsWithChildren {
  headerContent: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function AppPage(props: AppPageProps) {
  return (
    <div className="flex flex-col h-screen !overflow-hidden">
      <header className="px-8 py-4 border-b-[2px] border-[#d4d4d8]">
        <div className="flex justify-between items-center gap-4">
          {props.headerContent}
        </div>
      </header>
      <div className="flex-1 p-6 !overflow-hidden">
        {props.children}
      </div>
    </div>
  )
}