import React from "react";

export interface AppPageProps extends React.PropsWithChildren {
  headerContent: React.ReactNode;
  footerContent?: React.ReactNode;
}

export default function AppPage(props: AppPageProps) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-gray-800 text-white p-4 ">
        <div className="flex justify-between items-center">
          {props.headerContent}
        </div>
      </header>
      <div className="flex-1 p-6">
        {props.children}
      </div>
      <footer className="bg-gray-800 text-white p-4 text-center">
        {props.footerContent}
      </footer>
    </div>
  )
}