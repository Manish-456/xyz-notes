import { Link } from "react-router-dom";

const Public = () => {
  const content = (
    <section className="public">
      <header>
        <h1>
          Welcome to <span className="nowrap">XYZ Tech Company</span>
        </h1>
      </header>
      <main className="public__main">
        <p>
          Located in Beautiful Foo City, XYZ Company provides a trained
          staff ready to meet your tech needs.
        </p>
        <address className="public_addr">
            XYZ Tech company <br />
            555 FOO City <br/>
            Bar City, BTCH 12345 <br/>
            <a href="tel:+15555555">+27 000-5678</a>
        </address>
        <br/>
        <p>Owner : Manish Tamang</p>
      </main>
      <footer>
        <Link to={'/login'}>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
