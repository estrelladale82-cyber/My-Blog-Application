import { useLocation, useNavigate } from "react-router";

function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleBack() {
    if (location.key !== "default") {
      navigate(-1);
    } else {
      navigate("/");
    }
  }

  return (
    <button type="button" onClick={handleBack} className="back-button">
      ← Back
    </button>
  );
}

export default BackButton;