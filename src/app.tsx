import { useEffect, useReducer, useState } from 'preact/hooks'
import preactLogo from './assets/preact.svg'
import viteLogo from '/vite.svg'
import './app.css'
import { Fragment } from 'preact/jsx-runtime';
import * as types from "./types"
import {PageStore} from "./stores"

export function App() {
  const [pageStoreState, pageStoreDispatch] = useReducer(PageStore.Reducer, PageStore.EmptyState)

  const pages = pageStoreState.pages as types.Page[];

  const createPage = (title: string) => {
    let page = new types.Page();
    page.title = title;
    pageStoreDispatch({ type: PageStore.ActionTypes.ADD_PAGE, payload: page })
  }

  return (
    <div>
      <PageForm createPage={ createPage } />
      <h1>List of pages</h1>
      {pages.map((page) => <PageComponent page={page} />)}
      {pages.length === 0 && <div>No pages</div>}
    </div>
  )
}

interface PageComponentProps {
  page: types.Page;
}

function PageComponent(props: PageComponentProps) {
  const page = props.page;

  return (
    <Fragment>
      <div>ID: { page.id }</div>
      <div>Title: { page.title }</div>
      <div>Proper Title: { page.properTitle() }</div>
      <hr/>
    </Fragment>
  )
}

interface PageFormProps {
  createPage: (title: string) => void;
}

function PageForm(props: PageFormProps) {
  const [title, setTitle] = useState("");

  const submit = (e: Event) => {
    e.preventDefault();
    props.createPage(title);
    setTitle("")
  }

  return (
    <div>
      <h1>Page Form</h1>
      <form onSubmit={submit}>
        <label>
          Title:
          <input type="text" value={title} onInput={(e) => setTitle((e.target as HTMLInputElement).value)} />
        </label>
        <br/>
        <input type="submit" value="Submit" disabled={ title === "" }/>
      </form>
    </div>
  )
}
