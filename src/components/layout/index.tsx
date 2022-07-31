import classNames from "classnames";
import { sidebarItems } from "../../utils/constants";
import MainSidebar from "../ui/sidebar/sidebar";
export default function Layout({ children }: { children: React.ReactNode }) {
  const layoutClassNames = classNames(
    "col-12",
    "main-content",
    "py-4 py-md-0 col-md-9",
    "offset-md-3",
    "col-lg-10",
    "offset-lg-2"
  );
  return (
    <div className="row">
      <MainSidebar sideBarItems={sidebarItems} />
      <div className={layoutClassNames} style={{ minHeight: "100vh" }}>
        {children}
      </div>
    </div>
  );
}
