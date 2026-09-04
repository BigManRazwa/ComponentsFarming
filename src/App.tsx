import { Sidebar } from './components/layout/Sidebar'
import { AppRoutes } from './routes'

export default function App() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-8 lg:p-12">
        <AppRoutes />
      </main>
    </div>
  )
}
