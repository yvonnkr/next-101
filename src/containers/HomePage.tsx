import Link from "next/link";

const HomePage = () => {
  return (
    <div>
      <h1> Hello from HomePage</h1>
      <Link href="/people">
        <a>PEOPLE</a>
      </Link>
      <hr />
      <Link href="/vehicles">
        <a>VEHICLES</a>
      </Link>
      <hr />
      <Link href="/login">
        <a>LOGIN</a>
      </Link>
      <hr />
      <Link href="/signup">
        <a>SIGNUP</a>
      </Link>
    </div>
  );
};

export default HomePage;
