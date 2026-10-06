import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { Layout } from "./layout/Layout";
import { StoreProvider } from "./store";
import Home from "./pages/Home";
import Incidents from "./pages/Incidents";
import Lna from "./pages/Lna";
import Ppe from "./pages/Ppe";
import Reports from "./pages/Reports";
import Training from "./pages/Training";
import Briefings from "./pages/Briefings";
import Championship from "./pages/Championship";
import Contractors from "./pages/Contractors";
import Trainer from "./pages/Trainer";
import Audits from "./pages/Audits";
import GeneralDocs from "./pages/GeneralDocs";
import Fire from "./pages/Fire";
import Industrial from "./pages/Industrial";
import Inspections from "./pages/Inspections";
import Links from "./pages/Links";
import Territory from "./pages/Territory";
import FineBI from "./pages/FineBI";
import Forum from "./pages/Forum";
import Navigator from "./pages/Navigator";
import Brandbook from "./pages/Brandbook";
import Policy from "./pages/Policy";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <StoreProvider>
      <HashRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/incidents" element={<Incidents />} />
            <Route path="/lna" element={<Lna />} />
            <Route path="/ppe" element={<Ppe />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/training" element={<Training />} />
            <Route path="/briefings" element={<Briefings />} />
            <Route path="/championship" element={<Championship />} />
            <Route path="/contractors" element={<Contractors />} />
            <Route path="/trainer" element={<Trainer />} />
            <Route path="/audits" element={<Audits />} />
            <Route path="/documents" element={<GeneralDocs />} />
            <Route path="/fire" element={<Fire />} />
            <Route path="/industrial" element={<Industrial />} />
            <Route path="/inspections" element={<Inspections />} />
            <Route path="/links" element={<Links />} />
            <Route path="/territory" element={<Territory />} />
            <Route path="/finebi" element={<FineBI />} />
            <Route path="/forum" element={<Forum />} />
            <Route path="/navigator" element={<Navigator />} />
            <Route path="/brandbook" element={<Brandbook />} />
            <Route path="/policy" element={<Policy />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </HashRouter>
    </StoreProvider>
  );
}
