import Link from "next/link";

function Logo(): JSX.Element {
  return (
    <Link href="/">
      <h2 className="fw-bold text-white">NSK Site</h2>
    </Link>
  );
}

export default Logo;
