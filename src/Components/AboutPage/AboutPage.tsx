import { Link } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() {
  return (
    <div className="aboutpage">
      <h3 className="aboutheader">About the JimCo Retail Site</h3>
      <p>
        The JimCo Retail site is a demonstration application that mimics online
        web site for a fictional retailer. It allows a consumer to search
        products, add products to their cart, and then check out. For ease of
        use, no authentication or authorization is used.
      </p>
      <p>The site is designed to be responsive down to 375 pixels.</p>
      <p>
        The site consists of a front-end web site and a back-end API. The API is
        written in{" "}
        {
          <Link to="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)">
            C#
          </Link>
        }{" "}
        version 10 using{" "}
        {<Link to="https://en.wikipedia.org/wiki/.NET">.NET</Link>} 6. The front
        end is written in{" "}
        {<Link to="https://www.typescriptlang.org/">TypeScript</Link>} +{" "}
        {<Link to="https://reactjs.org/docs/introducing-jsx.html">JSX</Link>}{" "}
        using React version 18 and React-router version 6.3. It is divided up
        into distinct layers (for an overall architecture diagram, click{" "}
        {<Link to="/Architecture">here</Link>}):
      </p>
      <ul className="aboutlist">
        <li className="aboutitem">
          The front end itself, written in TypeScript + JSX compiled to
          JavaScript and HTML and using React.
        </li>
        <li className="aboutitem">
          The API, a .NET 6 Web API project written in C# version 10.
        </li>
        <li className="aboutitem">
          The Data Services layer, a .NET 6 class library written in C# version
          10. This layer is the interface between the API and the Data Access
          layers. It is responsible for translation between entity objects and{" "}
          {
            <Link to="https://en.wikipedia.org/wiki/Data_transfer_object">
              Data Transfer Objects
            </Link>
          }{" "}
          (DTOs) as well as for enforcing business logic.
        </li>
        <li className="aboutitem">
          The Data Services layer, a .NET 6 class library written in C# version
          10. This layer is responsible for getting data into and out of the
          database. It uses Dapper as a minimal ORM.
        </li>
        <li className="aboutitem">
          A{" "}
          {
            <Link to="https://www.microsoft.com/en-us/sql-server/sql-server-2019">
              Microsoft SQL
            </Link>
          }{" "}
          database to store the data.
        </li>
      </ul>
      <p>In addition, there are two other "layers":</p>
      <ul className="aboutlist">
        <li className="aboutitem">
          The Common library, a collection of items used throughout the back
          end. It is a .NET 6 class library written in C# version 10 and
          contains enumerations, attributes, extension methods, and common
          classes.
        </li>
        <li className="aboutitem">
          The Model library which is where the DTO classes and other model
          classes are stored since they are shared by the Data Services and API
          layers. It is a .NET 6 class library written in C# version 10.
        </li>
      </ul>
      <p>
        The following external libraries are used in either the front end or
        back end:
      </p>
      <ul className="aboutlist">
        <li className="aboutitem">
          {<Link to="https://reactjs.org/">React</Link>}, React-router,
          React-icons
        </li>
        <li className="aboutitem">
          {
            <Link to="https://github.com/stefanprodan/AspNetCoreRateLimit">
              ASPNetCoreRateLimit
            </Link>
          }
          , a library used to limit the rate of incoming requests to the API to
          minimize denial-of-service attacks.
        </li>
        <li className="aboutitem">
          {<Link to="https://hashids.org/net/">Hashids.net</Link>}, a library
          used to obfuscate entity key values in the data transfer objects.
        </li>
        <li className="aboutitem">
          {<Link to="https://github.com/DapperLib/Dapper">Dapper</Link>}, a
          minimal{" "}
          {
            <Link to="https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping">
              ORM
            </Link>
          }{" "}
          built over{" "}
          {
            <Link to="https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview">
              ADO.Net
            </Link>
          }
          , used to get entity objects into and out of the database.
        </li>
        <li className="aboutitem">
          {<Link to="https://www.newtonsoft.com/json">Json.NET</Link>}, a{" "}
          {<Link to="https://www.json.org/json-en.html">JSON</Link>} library.
        </li>
      </ul>
      <div className="homebutton">
        <Link to="/">Home</Link>
      </div>
    </div>
  );
}
