import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Content from "./components/Content";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useSearchParams,
} from "react-router-dom";
import AllLeads from "./Pages/AllLeads";

function App() {
  // const [count, setCount] = useState(0)

  const LeadsResolver = () => {
    const [searchParams] = useSearchParams();
    const tabName = searchParams.get("tabName");

    console.log(tabName); // Log the id value to debug what it returns

    if (!tabName) {
      return (
        <>
          <AllLeads />
        </>
      );
    }

    return (
      <>
        <AllLeads tabName={tabName} />
      </>
    );
  };

  return (
    <Router>
      <div className="m-0 p-0 flex">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar />

          <Routes>
            <Route
              path="/home"
              element={
                <>
                  {/* <div className="p-4 m-4">
                    <Filters />
                  </div> */}
                  <Content /> 
                  {/* <Tasks /> */}
                </>
              }
            />
            <Route path="/allleads" element={<LeadsResolver />} />
            <Route path="/*" element={<Navigate to="/home" />} />
          </Routes>
          {/* <Content /> */}
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
