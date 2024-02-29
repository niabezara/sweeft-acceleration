import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div>
      <Link to="/">home</Link>
      <Link to="/History">history</Link>
    </div>
  );
}
