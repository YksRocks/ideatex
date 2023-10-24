import "./Submit.css";
export default function Submit(props) {
  return props.trigger ? (
    <div className="Submit">
      <div className="Submit-init flex justify-center font-bold">
        <button
          className="close-btn text-black font-black"
          onClick={() => props.setTrigger(false)}
          type="Submit"
        >
          X
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}
