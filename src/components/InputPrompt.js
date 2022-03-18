function InputPrompt(props) {
    return (
        <div>
            <label>{props.nameProp}: </label>
            <input
              name={props.nameProp}
              value={props.promptProp}
              onChange={props.handlePromptText}
            />
            <input
              type="checkbox"
              name={props.nameProp}
              />
        </div>
    )
};

export default InputPrompt