import { useResolvedPath, useMatch, Link } from "react-router-dom";
function CustomLink({ children, to, ...props }) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <>
      <Link
        className={`${match ? "bg-blue0" : ""} px-3 py-1 rounded-2xl`}
        to={to}
        {...props}
      >
        {children}
      </Link>
    </>
  );
}

export default CustomLink;
