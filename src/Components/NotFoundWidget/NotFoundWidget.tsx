import { useNavigate } from "react-router-dom";
import { MdHome, MdArrowBack } from "react-icons/md";
import "./NotFoundWidget.css";

type Props = {
  item: string;
  redirect: string;
};

export default function NotFoundWidget({ item, redirect }: Props) {
  const navigate = useNavigate();
  return (
    <div className="nfw__container">
      <div className="nfw__message">
        We're sorry, we are unable to locate that {item}.
      </div>
      <div className="nfw__buttoncontainer">
        <button className="nfw__button" onClick={() => navigate("/")}>
          <span>
            <MdHome /> Home
          </span>
        </button>
        {redirect !== "/" && (
          <button className="nfw__button" onClick={() => navigate(redirect)}>
            <span>
              <MdArrowBack /> Back
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
