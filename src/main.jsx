import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import './styles.css'
import reportWebVitals from './reportWebVitals.js'

import App from './App.jsx'
import { ProviderX } from './components/ui/provider.jsx'
import Syllabus from './files/Syllabus.jsx'
import LinksComponent from './files/links.jsx'
import ClassSubject from './files/classSubject.jsx'
import ChapterSelect from './files/chapter.jsx'
import ChapterRender from './files/chapterRender.jsx'
import UserProvider from './files/context.jsx'
import ChapterProvider from './files/context.jsx'

const rootRoute = createRootRoute({
  component: () => (
    <>
      <ProviderX>
        <ChapterProvider>
          <LinksComponent />
          <Outlet />
          <TanStackRouterDevtools />
        </ChapterProvider>
      </ProviderX>
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: App,
})

const syllabusRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/syllabus',
  component: Syllabus,
})

export const classSubjectRoute = createRoute({
  getParentRoute: () => syllabusRoute,
  path: '/',
  component: ClassSubject,
  validateSearch: (search) => {
    return {
      classId: search.classId ?? '',
      subjectId: search.subjectId ?? '',
    }
  },
})

export const chapterRoute = createRoute({
  getParentRoute: () => classSubjectRoute,
  path: '/{-$chapterId}',
  component: ChapterSelect,
})

export const chapterRenderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/chapter/$chapterId',
  component: ChapterRender,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  syllabusRoute.addChildren([
    classSubjectRoute.addChildren([
      chapterRoute,
    ]),
  ]),
  chapterRenderRoute,
])

const router = createRouter({
  routeTree,
  context: {},
  defaultPreload: 'intent',
  scrollRestoration: true,
  defaultStructuralSharing: true,
  defaultPreloadStaleTime: 0,
})

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

reportWebVitals()
