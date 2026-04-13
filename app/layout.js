import Sidebar from "@/Components/Sidebar";
import "./globals.css";
import { TaskProvider } from "@/app/context/taskContext";



export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
    >
      <body className="w-full h-screen ">
        <TaskProvider>
          <div>
            {children}
          </div>
        </TaskProvider>
      </body>
    </html>
  );
}
