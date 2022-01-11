import { rest } from "msw"
import { setupServer } from "msw/node"
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Route, Switch } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import BrowserPage from "./containers/BrowsePage"
import HomePage from "./containers/HomePage"
import UploadPage from "./containers/UploadPage"


const Wrapper = ({children}) => {
  return(
    <BrowserRouter>
      <Switch>
        <Route>
          {children}
        </Route>
      </Switch>
    </BrowserRouter>
  )
}


const elementsMockedData = [
  {
    url: "https://archives.thealphaproject.eu/XXX",
    image: null,
    name: "THIS IS FIRST TEST FOLDER",
    thumbnail_path: "https://archives.thealphaproject.eu/XXX",
    parent: "root",
    is_file: false
  },
]

const server = setupServer(
  rest.get("https://archive.thealphaproject.eu/api/elements/", (req, res, ctx) => {
    return res(ctx.json(elementsMockedData))
  }),
  rest.get("https://archive.thealphaproject.eu/api/upload-status/", (req, res, ctx) => {
    return res({upload: "You can upload"})
  }),
  
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())


describe("HomePage", () => {

  it("should display title", () => {
    render(<HomePage/>, {wrapper: Wrapper});

    const title = screen.getByRole("heading", {level: 2})

    expect(title).toBeTruthy()
  })

  it("should display image", () => {
    render(<HomePage/>, {wrapper: Wrapper});

    const image = screen.getByRole("img")

    expect(image).toBeTruthy()
  })

  it("should display 4 buttons", () => {
    render(<HomePage/>, {wrapper: Wrapper});

    const buttons = screen.getAllByRole("button")

    expect(buttons.length).toBe(4)
  })
})


describe("UploadPage", () => {

  it("should display upload input", () => {
    render(<UploadPage/>, {wrapper: Wrapper});

    const input = screen.getByText("Drop files or Click to open explorer (up to 200 images)")

    expect(input).toBeTruthy()

  })

  it("should display preview box", () => {
    render(<UploadPage/>, {wrapper: Wrapper});

    const previews = screen.getByText("Previews (0 images)")

    expect(previews).toBeTruthy()
  })

  it("should display upload and reset button", () => {
    render(<UploadPage/>, {wrapper: Wrapper});

    const buttons = screen.getAllByRole("button")

    expect(buttons.length).toBe(2)
  })
})


describe("BrowsePage", () => {

  it("should display utils buttons", () => {
    render(<BrowserPage/>, {wrapper: Wrapper})

    const buttons = screen.getAllByRole("button")

    expect(buttons.length).toBe(2)
  })

  it("should display test folder in browser", async () => {
    render(<BrowserPage/>, {wrapper: Wrapper})

    await waitFor(() => {
      expect(screen.getByText("THIS IS FIRST TEST FOLDER")).toBeTruthy()
    })
  })
})