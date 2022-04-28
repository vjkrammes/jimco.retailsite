import { Link, useNavigate } from "react-router-dom";
import "./AboutPage.css";

export default function AboutPage() {
  const navigate = useNavigate();
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
        <a
          href="https://en.wikipedia.org/wiki/C_Sharp_(programming_language)"
          target="_blank"
          rel="noreferrer">
          C#
        </a>{" "}
        version 10 using{" "}
        <a
          href="https://en.wikipedia.org/wiki/.NET"
          target="_blank"
          rel="noreferrer">
          .NET
        </a>{" "}
        6. The front end is written in{" "}
        <a
          href="https://www.typescriptlang.org/"
          target="_blank"
          rel="noreferrer">
          TypeScript
        </a>{" "}
        +{" "}
        <a
          href="https://reactjs.org/docs/introducing-jsx.html"
          target="_blank"
          rel="noreferrer">
          JSX
        </a>{" "}
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
          <a
            href="https://en.wikipedia.org/wiki/Data_transfer_object"
            target="_blank"
            rel="noreferrer">
            Data Transfer Objects
          </a>{" "}
          (DTOs) as well as for enforcing business logic.
        </li>
        <li className="aboutitem">
          The Data Repository layer, a .NET 6 class library written in C#
          version 10. This layer is responsible for getting data into and out of
          the database. It uses Dapper as a minimal ORM.
        </li>
        <li className="aboutitem">
          A{" "}
          <a
            href="https://www.microsoft.com/en-us/sql-server/sql-server-2019"
            target="_blank"
            rel="noreferrer">
            Microsoft SQL
          </a>{" "}
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
          <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
            React
          </a>
          , React-router, React-icons
        </li>
        <li className="aboutitem">
          <a
            href="https://github.com/stefanprodan/AspNetCoreRateLimit"
            target="_blank"
            rel="noreferrer">
            ASPNetCoreRateLimit
          </a>
          , a library used to limit the rate of incoming requests to the API to
          minimize denial-of-service attacks.
        </li>
        <li className="aboutitem">
          <a href="https://hashids.org/net/" target="_blank" rel="noreferrer">
            Hashids.net
          </a>
          , a library used to obfuscate entity key values in the data transfer
          objects.
        </li>
        <li className="aboutitem">
          <a
            href="https://github.com/DapperLib/Dapper"
            target="_blank"
            rel="noreferrer">
            Dapper
          </a>
          , a minimal{" "}
          <a
            href="https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping"
            target="_blank"
            rel="noreferrer">
            ORM
          </a>{" "}
          built over{" "}
          <a
            href="https://docs.microsoft.com/en-us/dotnet/framework/data/adonet/ado-net-overview"
            target="_blank"
            rel="noreferrer">
            ADO.Net
          </a>
          , used to get entity objects into and out of the database.
        </li>
        <li className="aboutitem">
          <a
            href="https://www.newtonsoft.com/json"
            target="_blank"
            rel="noreferrer">
            Json.NET
          </a>
          , a{" "}
          <a
            href="https://www.json.org/json-en.html"
            target="_blank"
            rel="noreferrer">
            JSON
          </a>{" "}
          library.
        </li>
      </ul>
      <button className="ap__homebutton" onClick={() => navigate("/")}>
        Home
      </button>
    </div>
  );
}
