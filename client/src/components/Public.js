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
          Welcome to XYZ Tech, where we are committed to providing innovative
          technology solutions to meet the needs of businesses and individuals
          alike. Our team of experts is dedicated to creating cutting-edge
          products and services that will help you achieve your goals and stay
          ahead of the curve in today's rapidly evolving digital landscape.
        </p>
        <address className="public_addr">
          XYZ Tech company <br /> <br />
          Bar City, BTCH 12345 <br />
          <a href="tel:+15555555">+27 000-5678</a>
        </address>
        <br />
        <p>Owner : Manish Tamang</p>
      </main>
      <footer>
        <Link to={"/login"}>Employee Login</Link>
      </footer>
    </section>
  );
  return content;
};

export default Public;
